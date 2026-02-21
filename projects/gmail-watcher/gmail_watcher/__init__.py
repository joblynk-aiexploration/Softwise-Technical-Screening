"""Core Gmail watcher utilities."""

from .config import load_credentials  # noqa: F401
from .imap_client import GmailWatcher  # noqa: F401
from .templates import render_intro_email  # noqa: F401
