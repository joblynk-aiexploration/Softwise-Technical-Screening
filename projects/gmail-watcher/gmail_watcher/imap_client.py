"""IMAP client for polling Gmail."""

from __future__ import annotations

import email
import imaplib
from dataclasses import dataclass
from email.message import Message
from typing import List

from .config import ImapConfig


@dataclass
class MailSummary:
    uid: int
    subject: str
    sender: str
    date: str
    snippet: str


class GmailWatcher:
    """Thin wrapper around imaplib for Gmail polling."""

    def __init__(self, config: ImapConfig):
        self.config = config
        self._client: imaplib.IMAP4_SSL | None = None

    def __enter__(self):
        self._client = imaplib.IMAP4_SSL(self.config.server, self.config.port)
        self._client.login(self.config.username, self.config.password)
        self._client.select("INBOX")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._client is not None:
            try:
                self._client.logout()
            finally:
                self._client = None

    def fetch_unseen(self, since_uid: int | None = None, limit: int = 20) -> List[MailSummary]:
        if self._client is None:
            raise RuntimeError("Client not connected; use context manager")

        search_query = "(UNSEEN)"
        if since_uid:
            search_query = f"(UID {since_uid + 1}:* UNSEEN)"

        status, data = self._client.uid("SEARCH", None, search_query)
        if status != "OK":
            return []

        uids = data[0].split()
        if not uids:
            return []

        summaries: List[MailSummary] = []
        for raw_uid in uids[-limit:]:
            uid = int(raw_uid)
            status, msg_data = self._client.uid("FETCH", raw_uid, "(RFC822)")
            if status != "OK" or not msg_data or msg_data[0] is None:
                continue
            msg = email.message_from_bytes(msg_data[0][1])
            summaries.append(self._summarize(uid, msg))
        return summaries

    @staticmethod
    def _summarize(uid: int, msg: Message) -> MailSummary:
        subject = msg.get("Subject", "(no subject)")
        sender = msg.get("From", "(unknown)")
        date = msg.get("Date", "")
        snippet = GmailWatcher._extract_snippet(msg)
        return MailSummary(uid=uid, subject=subject, sender=sender, date=date, snippet=snippet)

    @staticmethod
    def _extract_snippet(msg: Message, max_len: int = 160) -> str:
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain" and part.get_content_disposition() is None:
                    payload = part.get_payload(decode=True) or b""
                    text = payload.decode(part.get_content_charset() or "utf-8", errors="ignore")
                    return text.strip().replace("\n", " ")[:max_len]
        else:
            payload = msg.get_payload(decode=True) or b""
            text = payload.decode(msg.get_content_charset() or "utf-8", errors="ignore")
            return text.strip().replace("\n", " ")[:max_len]
        return ""
