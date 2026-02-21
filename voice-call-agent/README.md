# Softwise Technical Screening (Voice Call Agent)

This project powers the Softwise technical screening workflow with Twilio calling, AI-driven interview logic, resume/JD intake, and recruiter UI tools.

## Features
- Outbound call trigger (`/call/start`)
- Speech + DTMF capture in call flow
- AI-assisted response/question generation
- ElevenLabs TTS integration
- Recruiter UI (`/ui`) with job + resume workflow
- Candidate assessment summary and fit recommendation

## 1) Setup
```bash
cd /root/.openclaw/workspace/voice-call-agent
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` with your credentials.

## 2) Run service
```bash
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 3) Expose publicly (Twilio needs public URL)
Use your domain or tunnel:
```bash
ngrok http 8000
```
Set `PUBLIC_BASE_URL` to that HTTPS URL.

## 4) Start a call
```bash
curl -X POST http://localhost:8000/call/start \
  -d "to=+17732739855"
```

## Notes
- If `OPENAI_API_KEY` is not set, fallback responses are used where applicable.
- Twilio webhook endpoints include:
  - `/twiml/welcome`
  - `/twiml/process`
  - `/twilio/status`
- Runtime/generated assets are not committed (`audio/`, `uploads/`, etc.).
