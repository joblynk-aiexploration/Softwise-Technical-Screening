"""Configuration loader for Notion worklog."""

from __future__ import annotations

import json
import pathlib
from dataclasses import dataclass

BASE_DIR = pathlib.Path(__file__).resolve().parents[1]
CONFIG_PATH = BASE_DIR / "config" / "notion_credentials.json"


@dataclass
class NotionConfig:
    api_key: str
    parent_page_id: str
    database_id: str | None = None


def normalize_id(raw_id: str) -> str:
    cleaned = raw_id.replace("-", "").strip()
    return f"{cleaned[0:8]}-{cleaned[8:12]}-{cleaned[12:16]}-{cleaned[16:20]}-{cleaned[20:32]}"


def load_credentials() -> NotionConfig:
    try:
        data = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RuntimeError(f"Missing Notion credential file: {CONFIG_PATH}") from exc

    parent_id = data.get("parent_page_id")
    if not parent_id:
        raise RuntimeError("parent_page_id must be defined in Notion credentials")

    parent_id = normalize_id(parent_id)
    database_id = data.get("database_id")
    if database_id:
        database_id = normalize_id(database_id)

    return NotionConfig(
        api_key=data["api_key"],
        parent_page_id=parent_id,
        database_id=database_id,
    )


def save_database_id(database_id: str) -> None:
    data = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    data["database_id"] = database_id
    CONFIG_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")
