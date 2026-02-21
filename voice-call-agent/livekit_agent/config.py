"""Configuration loader for LiveKit integration.

All secrets are read from environment variables. Never hardcode credentials.
"""

from __future__ import annotations

import os
from dataclasses import dataclass


def _normalize_livekit_url(url: str) -> str:
    u = (url or "").strip()
    # requests/httpx clients need http(s), not ws(s)
    if u.startswith("wss://"):
        return "https://" + u[len("wss://"):]
    if u.startswith("ws://"):
        return "http://" + u[len("ws://"):]
    return u


@dataclass(frozen=True)
class LiveKitConfig:
    """Typed container for LiveKit runtime configuration."""

    api_key: str
    api_secret: str
    url: str
    # Single LiveKit key for Inference-based STT/LLM/TTS.
    # Optional provider plugin keys remain supported via env.
    llm_api_key: str
    stt_api_key: str
    tts_api_key: str

    @classmethod
    def from_env(cls) -> "LiveKitConfig":
        api_key = os.getenv("LIVEKIT_API_KEY", "").strip()
        return cls(
            api_key=api_key,
            api_secret=os.getenv("LIVEKIT_API_SECRET", "").strip(),
            url=_normalize_livekit_url(os.getenv("LIVEKIT_URL", "").strip()),
            # LiveKit Inference uses LIVEKIT_API_KEY for STT/LLM/TTS.
            # Optional plugin keys can override per provider when needed.
            llm_api_key=(os.getenv("OPENAI_API_KEY", "").strip() or api_key),
            stt_api_key=(os.getenv("DEEPGRAM_API_KEY", "").strip() or api_key),
            tts_api_key=(os.getenv("ELEVENLABS_API_KEY", "").strip() or api_key),
        )

    def missing_required(self) -> list[str]:
        missing = []
        if not self.api_key:
            missing.append("LIVEKIT_API_KEY")
        if not self.api_secret:
            missing.append("LIVEKIT_API_SECRET")
        if not self.url:
            missing.append("LIVEKIT_URL")
        # No distinct LiveKit-issued STT/LLM/TTS keys are required for Inference mode.
        return missing

    def is_ready(self) -> bool:
        return not self.missing_required()
