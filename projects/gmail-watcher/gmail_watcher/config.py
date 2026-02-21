"""Configuration helpers for Gmail watcher."""

from __future__ import annotations

import json
import pathlib
from dataclasses import dataclass

BASE_DIR = pathlib.Path(__file__).resolve().parents[1]
CONFIG_PATH = BASE_DIR / "config" / "email_credentials.json"
STATE_DIR = BASE_DIR / "state"
STATE_DIR.mkdir(exist_ok=True)
STATE_FILE = STATE_DIR / "last_uid.json"


@dataclass
class ImapConfig:
    server: str
    port: int
    username: str
    password: str


@dataclass
class SmtpConfig:
    server: str
    port: int
    use_starttls: bool
    username: str
    password: str
    from_name: str | None = None


@dataclass
class Credentials:
    imap: ImapConfig
    smtp: SmtpConfig


def load_credentials() -> Credentials:
    try:
        raw = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RuntimeError(f"Missing credentials file: {CONFIG_PATH}") from exc

    try:
        imap_cfg = raw["imap"]
        smtp_cfg = raw["smtp"]
    except KeyError as exc:
        raise RuntimeError("Credentials JSON must contain 'imap' and 'smtp' sections") from exc

    imap = ImapConfig(
        server=imap_cfg.get("server", "imap.gmail.com"),
        port=int(imap_cfg.get("port", 993)),
        username=imap_cfg["username"],
        password=imap_cfg["password"],
    )
    smtp = SmtpConfig(
        server=smtp_cfg.get("server", "smtp.gmail.com"),
        port=int(smtp_cfg.get("port", 587)),
        use_starttls=bool(smtp_cfg.get("use_starttls", True)),
        username=smtp_cfg["username"],
        password=smtp_cfg["password"],
        from_name=smtp_cfg.get("from_name"),
    )
    return Credentials(imap=imap, smtp=smtp)


def load_last_uid() -> int | None:
    if not STATE_FILE.exists():
        return None
    try:
        data = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        return int(data.get("last_uid")) if data.get("last_uid") else None
    except (json.JSONDecodeError, ValueError):
        return None


def save_last_uid(uid: int) -> None:
    STATE_FILE.write_text(json.dumps({"last_uid": uid}), encoding="utf-8")
