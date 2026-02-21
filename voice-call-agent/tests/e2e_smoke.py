#!/usr/bin/env python3
import time
import requests

BASE = "http://127.0.0.1:8000"


def ok(cond, msg):
    if not cond:
        raise AssertionError(msg)


def main():
    s = requests.Session()

    # 1) UI loads
    r = s.get(f"{BASE}/ui", timeout=15)
    ok(r.status_code == 200, f"/ui status {r.status_code}")
    ok("Script Preview" in r.text, "Script Preview missing in UI")

    # 2) Resume upload works
    files = {"resume_file": ("candidate.txt", b"John Smith\nSenior Python Engineer\nDjango FastAPI AWS", "text/plain")}
    r = s.post(f"{BASE}/resume/upload", files=files, timeout=20)
    ok(r.status_code == 200, f"/resume/upload status {r.status_code}")
    up = r.json()
    upload_id = up["resume_upload"]["upload_id"]
    resume_text = up.get("resume_text", "")

    # 3) Dynamic questions + regenerate variation
    payload = {
        "job_description": "Need a fullstack engineer with Python, Django, React, APIs, and cloud deployment skills.",
        "resume_upload_id": upload_id,
        "resume_text": resume_text,
        "previous_questions": [],
    }
    r1 = s.post(f"{BASE}/candidate/questions", json=payload, timeout=30)
    ok(r1.status_code == 200, f"/candidate/questions status {r1.status_code}")
    q1 = r1.json().get("questions", [])
    ok(len(q1) == 4, f"expected 4 questions, got {len(q1)}")

    payload["previous_questions"] = q1
    r2 = s.post(f"{BASE}/candidate/questions", json=payload, timeout=30)
    ok(r2.status_code == 200, f"/candidate/questions regenerate status {r2.status_code}")
    q2 = r2.json().get("questions", [])
    ok(len(q2) == 4, f"expected 4 regenerated questions, got {len(q2)}")
    overlap = len(set([x.strip().lower() for x in q1]) & set([x.strip().lower() for x in q2]))
    ok(overlap < 5, "regenerate returned identical question set")

    # 4) Summary save
    answers = [f"Sample answer {i+1}" for i in range(len(q1))]
    r = s.post(
        f"{BASE}/candidate/summary",
        json={
            "resume_upload_id": upload_id,
            "job_description": payload["job_description"],
            "questions": q1,
            "answers": answers,
        },
        timeout=20,
    )
    ok(r.status_code == 200, f"/candidate/summary status {r.status_code}")
    ok(r.json().get("summary"), "summary missing")

    # 5) Interview init/start/call-flow simulation
    r = s.post(
        f"{BASE}/interview/init",
        json={
            "job_description": payload["job_description"],
            "resume": resume_text,
            "job_title": "Fullstack Engineer",
            "resume_upload_id": upload_id,
        },
        timeout=20,
    )
    ok(r.status_code == 200, f"/interview/init status {r.status_code}")
    sid = r.json()["session_id"]

    ready = False
    for _ in range(25):
        st = s.get(f"{BASE}/interview/status/{sid}", timeout=10).json()
        if st.get("ready"):
            ready = True
            break
        time.sleep(0.4)
    ok(ready, "interview did not become ready")

    r = s.post(f"{BASE}/interview/start/{sid}", timeout=15)
    ok(r.status_code == 200, f"/interview/start status {r.status_code}")

    # Twilio voice intro
    r = s.post(f"{BASE}/twilio/voice?session_id={sid}", timeout=20)
    ok(r.status_code == 200 and "<Response>" in r.text, "twilio voice failed")

    # consent yes + one answer per generated question
    r = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"SpeechResult": "yes", "CallSid": "TESTCALL1"}, timeout=20)
    ok(r.status_code == 200, "twilio consent failed")
    for i in range(len(q1)):
        r = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"SpeechResult": f"answer {i+1}", "CallSid": "TESTCALL1"}, timeout=20)
        ok(r.status_code == 200, f"twilio q{i+1} failed")

    # after wrap-up prompt, candidate says no additional questions and call should hang up
    r = s.post(f"{BASE}/twilio/process?session_id={sid}", data={"SpeechResult": "no", "CallSid": "TESTCALL1"}, timeout=20)
    ok(r.status_code == 200, "twilio post-questions close failed")
    ok("<Hangup/>" in r.text or "<Hangup />" in r.text, "final call response did not hang up")

    jobs = s.get(f"{BASE}/interview/jobs", timeout=15).json().get("jobs", [])
    sess = next((x for x in jobs if x.get("session_id") == sid), None)
    ok(sess is not None, "session missing from /interview/jobs")
    ok(sess.get("recommendation"), "recommendation not generated")

    # 6) TTS preview endpoint
    r = s.post(f"{BASE}/script/preview-tts", data={"text": "Hello this is a preview."}, timeout=30)
    ok(r.status_code == 200 and r.json().get("audio_url"), "script preview tts failed")

    print("E2E_SMOKE_OK")


if __name__ == "__main__":
    main()
