import os
import time
import json
import uuid
import requests
import psycopg2

BASE = os.getenv("BASE_URL", "http://localhost:8000")
EMAIL = "adam@joblynk.ai"
PASSWORD = "Joblynk@123$"
DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:AIzaSyC69gwKzgTO9@127.0.0.1:5432/agent_memory_hub")

JD = """Senior Python Backend Engineer\nBuild FastAPI services, PostgreSQL, and telephony workflows. Own incident debugging and production reliability."""
RESUME_TEXT = """Jordan Candidate\njordan.qa+e2e@joblynk.ai\n+1 (773) 555-0119\nhttps://www.linkedin.com/in/jordan-candidate\n
5 years Python, FastAPI, Twilio webhooks, PostgreSQL, and Linux operations."""


def wait_ready(sess, sid, timeout=20):
    t0 = time.time()
    while time.time() - t0 < timeout:
        r = sess.get(f"{BASE}/interview/status/{sid}")
        if r.status_code == 200:
            j = r.json()
            if j.get("ready"):
                return j
        time.sleep(0.5)
    raise RuntimeError("session did not become ready")


def db_fetchall(sql, params=()):
    with psycopg2.connect(DB_URL) as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchall()


def main():
    out = {"steps": [], "artifacts": {}}
    s = requests.Session()

    # login
    r = s.post(f"{BASE}/login", data={"email": EMAIL, "password": PASSWORD}, allow_redirects=False)
    ok = r.status_code in (302, 303) and "joblynk_session" in s.cookies.get_dict()
    out["steps"].append({"step": "login", "ok": ok, "status": r.status_code})

    # resume upload
    files = {"resume_file": ("jordan_resume.txt", RESUME_TEXT, "text/plain")}
    r = s.post(f"{BASE}/resume/upload", files=files)
    j = r.json()
    upload_id = j.get("resume_upload", {}).get("upload_id")
    candidate_id = j.get("candidate", {}).get("candidate_id")
    out["steps"].append({"step": "resume_upload", "ok": r.status_code == 200 and bool(upload_id), "upload_id": upload_id, "candidate_id": candidate_id})

    # interview init
    payload = {
        "job_description": JD,
        "resume": j.get("resume_text", ""),
        "job_title": "Senior Python Backend Engineer",
        "resume_upload_id": upload_id,
    }
    r = s.post(f"{BASE}/interview/init", json=payload)
    ij = r.json()
    sid = ij.get("session_id")
    out["steps"].append({"step": "interview_init", "ok": r.status_code == 200 and bool(sid), "session_id": sid})

    status = wait_ready(s, sid)
    out["steps"].append({"step": "interview_ready", "ok": status.get("ready") is True, "status": status.get("status")})

    # start trigger
    r = s.post(f"{BASE}/interview/start/{sid}")
    out["steps"].append({"step": "start_trigger", "ok": r.status_code == 200 and r.json().get("start_triggered")})

    # human answer outbound simulation
    call_sid_h = "CA" + uuid.uuid4().hex[:16].upper()
    r1 = s.post(f"{BASE}/twilio/status?session_id={sid}", data={"CallSid": call_sid_h, "CallStatus": "initiated", "From": "+17735550000", "To": "+17735550119"})
    r2 = s.post(f"{BASE}/twilio/status?session_id={sid}", data={"CallSid": call_sid_h, "CallStatus": "answered", "From": "+17735550000", "To": "+17735550119"})
    welcome = s.post(f"{BASE}/twilio/voice?session_id={sid}", data={"CallSid": call_sid_h, "From": "+17735550119", "AnsweredBy": "human"})
    p1 = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"CallSid": call_sid_h, "SpeechResult": "yes"})
    p2 = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"CallSid": call_sid_h, "SpeechResult": "I built webhook processors and improved reliability by 40 percent."})

    # move to post-questions quickly (simulate enough turns)
    for _ in range(5):
        s.post(f"{BASE}/twilio/process?session_id={sid}", data={"CallSid": call_sid_h, "SpeechResult": "Handled incidents and built automation scripts."})

    # enter candidate question phase then trigger manager handoff path (no OPENAI key => handoff)
    s.post(f"{BASE}/twilio/process?session_id={sid}", data={"CallSid": call_sid_h, "SpeechResult": "yes"})
    hand = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"CallSid": call_sid_h, "SpeechResult": "Can you guarantee compensation details and legal policy exceptions?"})

    out["steps"].append({
        "step": "webhook_human_path",
        "ok": all(x.status_code == 200 for x in [r1, r2, welcome, p1, p2, hand]),
        "welcome_has_gather": "<Gather" in welcome.text,
        "handoff_contains_phrase": "connect" in hand.text.lower() or "manager" in hand.text.lower(),
    })

    # complete status
    s.post(f"{BASE}/twilio/status?session_id={sid}", data={"CallSid": call_sid_h, "CallStatus": "completed", "From": "+17735550000", "To": "+17735550119"})

    # voicemail/no-answer path on second session
    payload2 = {"job_description": JD, "resume": RESUME_TEXT, "job_title": "Senior Python Backend Engineer"}
    r = s.post(f"{BASE}/interview/init", json=payload2)
    sid2 = r.json().get("session_id")
    wait_ready(s, sid2)
    s.post(f"{BASE}/interview/start/{sid2}")

    call_sid_vm = "CA" + uuid.uuid4().hex[:16].upper()
    vm_welcome = s.post(f"{BASE}/twilio/voice?session_id={sid2}", data={"CallSid": call_sid_vm, "From": "+17735550119", "AnsweredBy": "machine_start"})
    st_no = s.post(f"{BASE}/twilio/status?session_id={sid2}", data={"CallSid": call_sid_vm, "CallStatus": "no-answer", "From": "+17735550000", "To": "+17735550119"})
    out["steps"].append({
        "step": "voicemail_no_answer_path",
        "ok": vm_welcome.status_code == 200 and st_no.status_code == 200,
        "has_play": "<Play>" in vm_welcome.text,
        "hangup": "<Hangup" in vm_welcome.text,
    })

    # callback identification/resume flow (no session_id)
    cb_sid = "CA" + uuid.uuid4().hex[:16].upper()
    cb = s.post(f"{BASE}/twilio/voice", data={"CallSid": cb_sid, "From": "+17735550119", "AnsweredBy": "human"})
    # resolve callback session from DB
    row = db_fetchall("select last_session_id from public.screening_candidates where email=%s", ("jordan.qa+e2e@joblynk.ai",))
    callback_sid = row[0][0] if row and row[0][0] else sid2
    cb2 = s.post(f"{BASE}/twilio/process?session_id={callback_sid}", data={"CallSid": cb_sid, "SpeechResult": "yes"})
    out["steps"].append({
        "step": "callback_resume_flow",
        "ok": cb.status_code == 200 and cb2.status_code == 200,
        "gather_has_session": f"session_id={callback_sid}" in cb.text,
        "response_has_audio": "<Play>" in cb2.text,
        "callback_session": callback_sid,
    })

    # candidate-by-job tiles endpoint
    rows = db_fetchall("select job_id from public.screening_sessions where session_id=%s", (sid,))
    job_id = rows[0][0] if rows else ""
    cand_tiles = s.get(f"{BASE}/interview/candidates", params={"job_id": job_id} if job_id else None)
    cand_json = cand_tiles.json() if cand_tiles.status_code == 200 else {}
    has_candidate = any((x.get("candidate_id") == candidate_id) for x in cand_json.get("candidates", [])) if candidate_id else False
    out["steps"].append({"step": "candidate_by_job_tiles", "ok": cand_tiles.status_code == 200 and has_candidate, "job_id": job_id, "tiles_count": len(cand_json.get("candidates", []))})

    # candidate profile grouped logs by job id
    prof = s.get(f"{BASE}/candidates/{candidate_id}", params={"job_id": job_id})
    out["steps"].append({
        "step": "candidate_profile_grouped_logs",
        "ok": prof.status_code == 200 and (f"Job ID: {job_id}" in prof.text if job_id else "Job ID:" in prof.text),
        "contains_activity_timeline": "Activity Log" in prof.text or "Activity" in prof.text,
    })

    # DB evidence snippets
    out["artifacts"]["candidate_row"] = db_fetchall(
        "select candidate_id,email,status,last_session_id,coalesce(to_char(callback_received_at,'YYYY-MM-DD HH24:MI:SS'),'') from public.screening_candidates where email=%s",
        ("jordan.qa+e2e@joblynk.ai",),
    )
    out["artifacts"]["calls"] = db_fetchall(
        "select call_sid,session_id,call_status,coalesce(provider_used,''),coalesce(provider_reason,'') from public.screening_calls where candidate_id=%s order by updated_at desc limit 10",
        (candidate_id,),
    )
    out["artifacts"]["activity"] = db_fetchall(
        "select event_type,coalesce(details,''),coalesce(session_id,'') from public.screening_candidate_activity where candidate_id=%s order by created_at desc limit 12",
        (candidate_id,),
    )

    print(json.dumps(out, indent=2, default=str))


if __name__ == "__main__":
    main()
