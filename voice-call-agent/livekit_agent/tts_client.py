"""LiveKit TTS client wrapper (text-to-speech only)."""

from __future__ import annotations

import os
import requests


class LiveKitTTSClient:
    """TTS-only API client for synthesizing voice responses."""

    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.endpoint = os.getenv("LIVEKIT_TTS_ENDPOINT", "/v1/tts/synthesize")

    def synthesize(self, text: str) -> str:
        payload = {"text": text}
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        r = requests.post(f"{self.base_url}{self.endpoint}", json=payload, headers=headers, timeout=20)
        r.raise_for_status()
        data = r.json() if r.content else {}
        # Expected to return a playable media URL.
        return (data.get("audio_url") or "").strip()
