# LiveKit Voice Integration (Option 1)

This folder contains **LiveKit-only** integration code for real-time voice capabilities.
It is intentionally isolated from the legacy voice pipeline.

## Principles

- LiveKit mode is optional and can be disabled.
- Legacy mode remains untouched and available as fallback.
- LLM, STT, and TTS are implemented as separate clients.
- Credentials are read from `.env` only.

## Required env vars

- `VOICE_PROVIDER=auto|livekit|legacy`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_URL`

For LiveKit Inference mode, no separate LiveKit STT/LLM/TTS keys are needed.
`LIVEKIT_API_KEY` is sufficient.

Optional external provider plugin keys (only if you use those plugins):
- `OPENAI_API_KEY` (OpenAI LLM/realtime)
- `DEEPGRAM_API_KEY` (Deepgram STT)
- `ELEVENLABS_API_KEY` (ElevenLabs TTS)

Optional endpoint overrides:

- `LIVEKIT_LLM_ENDPOINT` (default `/v1/llm/respond`)
- `LIVEKIT_STT_ENDPOINT` (default `/v1/stt/transcribe`)
- `LIVEKIT_TTS_ENDPOINT` (default `/v1/tts/synthesize`)

## Runtime behavior

- `legacy`: Always use existing pipeline.
- `livekit`: Always use LiveKit path (errors will be surfaced).
- `auto`: Try LiveKit; on any error, fallback to legacy path.

## Cloud deployment (no manual local deploy required)

This repo now includes GitHub Actions workflow:

- `.github/workflows/livekit-cloud-deploy.yml`

Set these GitHub repository secrets:

- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_AGENT_NAME` (optional; defaults in script)

Then trigger **Deploy LiveKit Agent to Cloud** from Actions (or push to `main` with changes under `livekit_agent/`).
