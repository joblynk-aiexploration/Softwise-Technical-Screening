#!/bin/bash
# 1. Sync new emails
mbsync adam-inbox

# 2. List the latest 5 emails (Subject and From)
echo "--- LATEST INCOMING EMAILS ---"
find /root/mail/adam/INBOX/new -type f | xargs -I {} grep -E "^(Subject|From):" {} | head -n 10
