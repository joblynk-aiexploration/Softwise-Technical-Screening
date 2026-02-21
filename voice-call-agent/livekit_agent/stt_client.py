"""LiveKit STT client wrapper (speech-to-text only)."""

from __future__ import annotations

import os
import requests


class LiveKitSTTClient:
    """STT-only API client for transcribing candidate audio."""

    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.endpoint = os.getenv("LIVEKIT_STT_ENDPOINT", "/v1/stt/transcribe")

    def transcribe_url(self, audio_url: str) -> str:
        payload = {"audio_url": audio_url}
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        r = requests.post(f"{self.base_url}{self.endpoint}", json=payload, headers=headers, timeout=30)
        r.raise_for_status()
        data = r.json() if r.content else {}
        return (data.get("text") or "").strip()
