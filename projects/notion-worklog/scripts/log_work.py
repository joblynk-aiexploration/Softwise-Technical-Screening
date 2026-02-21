#!/usr/bin/env python3
"""CLI to log a work entry into Notion."""

from __future__ import annotations

import argparse

from notion_worklog import create_log_entry, load_credentials
from notion_worklog.config import save_database_id, normalize_id


def main():
    parser = argparse.ArgumentParser(description="Log work entry to Notion")
    parser.add_argument("--task", required=True, help="Task title")
    parser.add_argument("--status", default="In Progress", help="Status select value")
    parser.add_argument("--details", default="", help="Detailed notes")
    parser.add_argument("--date", help="ISO date (YYYY-MM-DD)")
    parser.add_argument("--database-id", help="Override database id")

    args = parser.parse_args()
    cfg = load_credentials()
    database_id = args.database_id or cfg.database_id
    if not database_id:
        raise RuntimeError("No database_id found. Run scripts/init_database.py first or pass --database-id.")

    database_id = normalize_id(database_id)
    create_log_entry(cfg, database_id, args.task, args.status, args.details, args.date)
    print("Entry logged.")


if __name__ == "__main__":
    main()
