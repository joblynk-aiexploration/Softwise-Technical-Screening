"""LiveKit voice orchestration layer.

This module composes LLM/STT/TTS clients while keeping each provider concern
separated. If any step fails, callers should fallback to legacy flow.
"""

from __future__ import annotations

from dataclasses import dataclass

from .config import LiveKitConfig
from .llm_client import LiveKitLLMClient
from .stt_client import LiveKitSTTClient
from .tts_client import LiveKitTTSClient


@dataclass
class LiveKitVoiceOrchestrator:
    """Coordinates text and audio handling for LiveKit mode."""

    llm: LiveKitLLMClient
    stt: LiveKitSTTClient
    tts: LiveKitTTSClient

    @classmethod
    def from_env(cls) -> "LiveKitVoiceOrchestrator":
        cfg = LiveKitConfig.from_env()
        if not cfg.is_ready():
            raise ValueError(f"LiveKit not configured: missing {', '.join(cfg.missing_required())}")

        return cls(
            llm=LiveKitLLMClient(cfg.url, cfg.llm_api_key),
            stt=LiveKitSTTClient(cfg.url, cfg.stt_api_key),
            tts=LiveKitTTSClient(cfg.url, cfg.tts_api_key),
        )

    def generate_text_reply(self, prompt: str, context: dict | None = None) -> str:
        return self.llm.respond(prompt=prompt, context=context or {})

    def transcribe_audio(self, audio_url: str) -> str:
        return self.stt.transcribe_url(audio_url=audio_url)

    def synthesize_audio(self, text: str) -> str:
        return self.tts.synthesize(text=text)
