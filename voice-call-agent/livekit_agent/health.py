"""Health checks for LiveKit provider readiness."""

from __future__ import annotations

import requests

from .config import LiveKitConfig


def check_livekit_health(timeout_seconds: int = 5) -> dict:
    """Return provider health without mutating application state.

    This function is safe to call from API health endpoints and startup checks.
    """

    cfg = LiveKitConfig.from_env()
    missing = cfg.missing_required()
    if missing:
        return {
            "ok": False,
            "provider": "livekit",
            "reason": "missing_env",
            "missing": missing,
        }

    # Lightweight URL reachability test; full auth checks happen during runtime.
    probe_url = cfg.url
    if probe_url.startswith("wss://"):
        probe_url = "https://" + probe_url[len("wss://"):]
    elif probe_url.startswith("ws://"):
        probe_url = "http://" + probe_url[len("ws://"):]

    try:
        resp = requests.get(probe_url, timeout=timeout_seconds)
        reachable = resp.status_code < 500
    except Exception as exc:  # pragma: no cover - network dependent
        return {
            "ok": False,
            "provider": "livekit",
            "reason": "unreachable",
            "error": str(exc),
            "probe_url": probe_url,
        }

    return {
        "ok": bool(reachable),
        "provider": "livekit",
        "reason": "ready" if reachable else "unhealthy",
        "url": cfg.url,
    }
