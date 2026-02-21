"""Lightweight Notion API client using urllib."""

from __future__ import annotations

import json
import urllib.error
import urllib.request
from typing import Any, Dict

NOTION_VERSION = "2022-06-28"
API_BASE = "https://api.notion.com/v1"


class NotionClient:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def request(self, method: str, path: str, payload: Dict[str, Any] | None = None) -> Dict[str, Any]:
        url = f"{API_BASE}{path}"
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, method=method.upper())
        req.add_header("Authorization", f"Bearer {self.api_key}")
        req.add_header("Content-Type", "application/json")
        req.add_header("Notion-Version", NOTION_VERSION)

        try:
            with urllib.request.urlopen(req) as resp:
                body = resp.read()
                if not body:
                    return {}
                return json.loads(body)
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"Notion API error {exc.code}: {detail}") from exc

    def create_database(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self.request("POST", "/databases", payload)

    def create_page(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self.request("POST", "/pages", payload)
