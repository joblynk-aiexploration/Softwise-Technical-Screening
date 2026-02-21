# Gmail Watcher

Senior-level Gmail monitoring and response pipeline for Joblynk. This service authenticates to Gmail via IMAP/SMTP app passwords, polls for new mail, summarizes activity, and can reply using vetted templates.

## Features

- Secure credential loading from `config/email_credentials.json` (kept out of git)
- IMAP polling with stateful tracking of the latest processed UID
- Plaintext + HTML mail sending with corporate signature
- CLI entry points so OpenClaw or Cron can invoke checks/sends
- Modular code to extend into automated routing or ticketing hooks

## Project Structure

```
config/
  email_credentials.example.json  # copy -> email_credentials.json with real secrets
scripts/
  send_email.py                   # SMTP sender (plaintext + HTML)
  check_inbox.py                  # IMAP poller and summarizer
state/
  last_uid.json                   # auto-created to store last processed UID
```  

- `gmail_watcher/imap_client.py` encapsulates mailbox operations.  
- `gmail_watcher/templates.py` exposes reusable HTML blocks and signatures.  
- `gmail_watcher/notifier.py` is a placeholder for wiring summaries into OpenClaw or other channels.

## Setup

1. **Python 3.11+** is required. (Use the system interpreter in OpenClaw.)
2. Install dependencies (standard library only today). If future optional deps are added, list them in `requirements.txt`.
3. Copy the credential template:
   ```bash
   cp config/email_credentials.example.json config/email_credentials.json
   ```
4. Populate the file with your Gmail username and app passwords for both SMTP and IMAP (they can be the same app password, but keep both keys for clarity).
5. Run a dry check:
   ```bash
   python3 scripts/check_inbox.py --max 5
   ```
6. Send a test:
   ```bash
   python3 scripts/send_email.py \
     --to someone@example.com \
     --subject "Test" \
     --text "Plaintext" \
     --html templates/email_intro.html
   ```

## Cron / Automation

Hook `scripts/check_inbox.py` into a cron entry (e.g., every 2 minutes) or call it from OpenClaw heartbeat jobs. The script writes structured JSON summaries to stdout so downstream processes can parse them easily.

## Security

- Secrets never touch git (ignored by `.gitignore`).
- IMAP + SMTP both require Google app passwords with 2FA enabled.
- Future hardening TODOs at the bottom of `SKILL.md` track encryption/backups.

## Next Steps

- Implement Notion logging + WhatsApp notifications in `gmail_watcher/notifier.py`.
- Add automated response templates with approval workflows.
- Containerize for deployment if needed.
