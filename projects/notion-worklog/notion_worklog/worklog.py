"""High-level helpers to manage the worklog database and entries."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from .config import NotionConfig, normalize_id
from .notion_client import NotionClient


def ensure_database(cfg: NotionConfig, title: str = "Worklog") -> str:
    client = NotionClient(cfg.api_key)
    payload = {
        "parent": {"type": "page_id", "page_id": cfg.parent_page_id},
        "title": [{"type": "text", "text": {"content": title}}],
        "properties": {
            "Task": {"title": {}},
            "Date": {"date": {}},
            "Status": {
                "select": {
                    "options": [
                        {"name": "Planned", "color": "blue"},
                        {"name": "In Progress", "color": "yellow"},
                        {"name": "Done", "color": "green"},
                    ]
                }
            },
            "Details": {"rich_text": {}},
        },
    }
    response = client.create_database(payload)
    database_id = response.get("id")
    if not database_id:
        raise RuntimeError("Failed to create Notion database: missing id")
    return normalize_id(database_id)


def create_log_entry(
    cfg: NotionConfig,
    database_id: str,
    task: str,
    status: str,
    details: str,
    date_str: Optional[str] = None,
):
    client = NotionClient(cfg.api_key)
    date_value = date_str or datetime.now(timezone.utc).date().isoformat()
    payload = {
        "parent": {"database_id": database_id},
        "properties": {
            "Task": {"title": [{"type": "text", "text": {"content": task}}]},
            "Status": {"select": {"name": status}},
            "Date": {"date": {"start": date_value}},
            "Details": {"rich_text": [{"type": "text", "text": {"content": details}}]},
        },
    }
    client.create_page(payload)
