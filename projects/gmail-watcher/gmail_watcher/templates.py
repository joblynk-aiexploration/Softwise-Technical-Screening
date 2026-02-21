"""Reusable HTML templates for outbound email."""

from __future__ import annotations

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = BASE_DIR / "templates"


def ensure_template_dir():
    TEMPLATE_DIR.mkdir(exist_ok=True)


def render_intro_email(recipient_name: str = "there") -> str:
    ensure_template_dir()
    template_path = TEMPLATE_DIR / "email_intro.html"
    if template_path.exists():
        return template_path.read_text(encoding="utf-8")
    # Fallback minimal template
    return f"""
    <html><body>
    <p>Hi {recipient_name},</p>
    <p>This is a placeholder email. Update templates/email_intro.html for a richer version.</p>
    </body></html>
    """
