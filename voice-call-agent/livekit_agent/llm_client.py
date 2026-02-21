"""LiveKit LLM client wrapper.

Kept separate from STT and TTS by design to preserve provider isolation.
"""

from __future__ import annotations

import os
import requests


class LiveKitLLMClient:
    """LLM-only API client for text response generation."""

    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        # Endpoint can be adjusted without code changes.
        self.endpoint = os.getenv("LIVEKIT_LLM_ENDPOINT", "/v1/llm/respond")

    def respond(self, prompt: str, context: dict | None = None) -> str:
        payload = {"prompt": prompt, "context": context or {}}
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        r = requests.post(f"{self.base_url}{self.endpoint}", json=payload, headers=headers, timeout=20)
        r.raise_for_status()
        data = r.json() if r.content else {}
        return (data.get("text") or "").strip()
