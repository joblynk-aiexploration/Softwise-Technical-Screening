#!/usr/bin/env python3
"""CLI to initialize the Notion worklog database."""

from __future__ import annotations

import argparse

from notion_worklog import ensure_database, load_credentials, save_database_id


def main():
    parser = argparse.ArgumentParser(description="Initialize Notion worklog database")
    parser.add_argument("--title", default="Adam Worklog", help="Database title")
    args = parser.parse_args()

    cfg = load_credentials()
    database_id = ensure_database(cfg, title=args.title)
    save_database_id(database_id)
    print(f"Database ready: {database_id}")


if __name__ == "__main__":
    main()
