# Notion Worklog

Enterprise-grade Notion integration for Joblynk. This service connects to the Notion API with a workspace key, creates (or reuses) a structured worklog database under a specified parent page, and appends entries for every task Adam completes.

## Features

- Secure credential loading from `config/notion_credentials.json`
- Idempotent database initialization (`scripts/init_database.py`)
- Structured logging CLI (`scripts/log_work.py`) with title/date/status/details fields
- Minimal dependency stack (standard library only) for easy deployment inside OpenClaw

## Structure

```
config/
  notion_credentials.example.json   # copy -> notion_credentials.json with real secret + page
notion_worklog/
  __init__.py
  config.py                         # credential/state helpers
  notion_client.py                  # lightweight HTTPS client for Notion API
  worklog.py                        # high-level helpers for database + entry creation
scripts/
  init_database.py                  # ensure database exists under parent page
  log_work.py                       # append an entry
state handled via config/notion_state.json
```

## Setup

1. Ensure Python 3.11+ is available (OpenClaw default).
2. Copy the credential template:
   ```bash
   cp config/notion_credentials.example.json config/notion_credentials.json
   ```
3. Fill in:
   - `api_key`: your Notion integration secret (starts with `ntn_`)
   - `parent_page_id`: 32-char page ID (with or without hyphens)
4. Initialize the database:
   ```bash
   PYTHONPATH=. python3 scripts/init_database.py --title "Adam Worklog"
   ```
   This will create a Notion database with columns: Task (title), Date, Status, Details.
5. Log work:
   ```bash
   PYTHONPATH=. python3 scripts/log_work.py \
     --task "Built Gmail watcher repo" \
     --status "Done" \
     --details "Repo: gmail-watcher, includes IMAP/SMTP scripts"
   ```

## Security

- Secrets stored only in ignored config files.
- HTTPS requests authenticated with the provided Notion integration key.
- No third-party dependencies; requests are made via `urllib` to keep the footprint minimal.

## Roadmap

- Add automatic attachment support (upload transcripts/artifacts).
- Support querying existing entries for reporting.
- Wire into Gmail watcher notifier for automatic logging.
