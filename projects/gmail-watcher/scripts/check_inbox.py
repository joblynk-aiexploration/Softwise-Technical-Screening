#!/usr/bin/env python3
"""Poll Gmail inbox via IMAP and emit JSON summaries."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone

from gmail_watcher.config import load_credentials, load_last_uid, save_last_uid
from gmail_watcher.imap_client import GmailWatcher
from gmail_watcher.notifier import summarize_to_stdout


def poll(max_items: int) -> None:
    creds = load_credentials()
    last_uid = load_last_uid()

    with GmailWatcher(creds.imap) as watcher:
        messages = watcher.fetch_unseen(since_uid=last_uid, limit=max_items)

    if not messages:
        print(json.dumps({"messages": [], "checked_at": timestamp()}))
        return

    summarize_to_stdout(messages)
    save_last_uid(messages[-1].uid)


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def main():
    parser = argparse.ArgumentParser(description="Check Gmail inbox for new mail")
    parser.add_argument("--max", type=int, default=10, help="Maximum messages to fetch")
    args = parser.parse_args()
    poll(args.max)


if __name__ == "__main__":
    main()
