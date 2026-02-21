#!/usr/bin/env python3
"""Send email via SMTP credentials stored in config/email_smtp.json."""

from __future__ import annotations

import argparse
import json
import pathlib
import smtplib
import ssl
from email.message import EmailMessage

BASE_DIR = pathlib.Path(__file__).resolve().parents[1]
CONFIG_PATH = BASE_DIR / "config" / "email_smtp.json"


def load_config() -> dict:
    try:
        with CONFIG_PATH.open("r", encoding="utf-8") as fh:
            return json.load(fh)
    except FileNotFoundError as exc:
        raise SystemExit(f"Config file not found: {CONFIG_PATH}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid JSON in {CONFIG_PATH}: {exc}") from exc


def build_message(
    sender: str,
    recipient: str,
    subject: str,
    body: str,
    sender_name: str | None = None,
    html_body: str | None = None,
) -> EmailMessage:
    msg = EmailMessage()
    msg["From"] = f"{sender_name} <{sender}>" if sender_name else sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.set_content(body)

    if html_body:
        msg.add_alternative(html_body, subtype="html")
    return msg


def send_email(to_addr: str, subject: str, body: str, html_body: str | None = None):
    cfg = load_config()
    smtp_server = cfg.get("smtp_server")
    port = cfg.get("port", 587)
    username = cfg.get("username")
    password = cfg.get("password")
    from_name = cfg.get("from_name")

    if not all([smtp_server, username, password]):
        raise SystemExit("SMTP configuration is incomplete. Check config/email_smtp.json")

    message = build_message(
        sender=username,
        recipient=to_addr,
        subject=subject,
        body=body,
        sender_name=from_name,
        html_body=html_body,
    )

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(smtp_server, port) as server:
            if cfg.get("use_starttls", True):
                server.starttls(context=context)
            server.login(username, password)
            server.send_message(message)
    except smtplib.SMTPException as exc:
        raise SystemExit(f"Failed to send email: {exc}") from exc


def main():
    parser = argparse.ArgumentParser(description="Send an email using stored SMTP credentials")
    parser.add_argument("--to", required=True, help="Recipient email address")
    parser.add_argument("--subject", required=True, help="Email subject")
    parser.add_argument("--body", required=True, help="Plain-text email body")
    parser.add_argument("--html-file", help="Optional path to an HTML body template")
    args = parser.parse_args()

    html_body = None
    if args.html_file:
        html_path = pathlib.Path(args.html_file)
        if not html_path.exists():
            raise SystemExit(f"HTML file not found: {html_path}")
        html_body = html_path.read_text(encoding="utf-8")

    send_email(to_addr=args.to, subject=args.subject, body=args.body, html_body=html_body)
    print(f"Email sent to {args.to}")


if __name__ == "__main__":
    main()
