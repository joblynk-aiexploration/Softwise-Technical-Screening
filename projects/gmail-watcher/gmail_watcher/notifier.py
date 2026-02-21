"""Placeholder notifier hooks."""

from __future__ import annotations

import json
from typing import Iterable

from .imap_client import MailSummary


def summarize_to_stdout(messages: Iterable[MailSummary]) -> None:
    payload = [msg.__dict__ for msg in messages]
    print(json.dumps({"messages": payload}, indent=2))
