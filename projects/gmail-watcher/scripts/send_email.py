#!/usr/bin/env python3
"""Send email via Gmail SMTP using stored credentials."""

from __future__ import annotations

import argparse
import pathlib
import ssl
from email.message import EmailMessage
import smtplib

from gmail_watcher.config import load_credentials

BASE_DIR = pathlib.Path(__file__).resolve().parents[1]
DEFAULT_HTML = BASE_DIR / "templates" / "email_intro.html"


def build_message(subject: str, to_addr: str, body: str, html_body: str | None = None) -> EmailMessage:
    creds = load_credentials().smtp
    msg = EmailMessage()
    sender = creds.username
    msg["From"] = f"{creds.from_name} <{sender}>" if creds.from_name else sender
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg.set_content(body)
    if html_body:
        msg.add_alternative(html_body, subtype="html")
    return msg


def send_email(subject: str, to_addr: str, body: str, html_body: str | None = None) -> None:
    creds = load_credentials().smtp
    message = build_message(subject, to_addr, body, html_body)
    context = ssl.create_default_context()
    with smtplib.SMTP(creds.server, creds.port) as server:
        if creds.use_starttls:
            server.starttls(context=context)
        server.login(creds.username, creds.password)
        server.send_message(message)


def main():
    parser = argparse.ArgumentParser(description="Send email via Gmail SMTP")
    parser.add_argument("--to", required=True, help="Recipient address")
    parser.add_argument("--subject", required=True, help="Email subject")
    parser.add_argument("--text", required=True, help="Plaintext body")
    parser.add_argument("--html", help="Path to HTML body file")
    args = parser.parse_args()

    html_body = None
    if args.html:
        html_path = pathlib.Path(args.html)
        html_body = html_path.read_text(encoding="utf-8")
    elif DEFAULT_HTML.exists():
        html_body = DEFAULT_HTML.read_text(encoding="utf-8")

    send_email(args.subject, args.to, args.text, html_body)
    print(f"Email sent to {args.to}")


if __name__ == "__main__":
    main()
