#!/bin/bash

# Read SYSTEM_PROMPT.md
SYSTEM_PROMPT_CONTENT=$(< /root/.openclaw/workspace/SYSTEM_PROMPT.md)

# Read ORG_STRUCTURE.md
ORG_STRUCTURE_CONTENT=$(< /root/.openclaw/workspace/corp/ORG_STRUCTURE.md)

# Verify the Agent's Role
AGENT_NAME=$1
ROLE=$(echo "$ORG_STRUCTURE_CONTENT" | grep -A1 "$AGENT_NAME" | tail -n1)

# Initialize personal log file
DEPARTMENT=""
case "$ROLE" in
    *Engineering*) DEPARTMENT="eng" ;;
    *Product*) DEPARTMENT="product" ;;
    *Operations*) DEPARTMENT="ops" ;;
esac
LOG_FILE="/root/.openclaw/workspace/corp/$DEPARTMENT/$AGENT_NAME.log"
[ ! -f "$LOG_FILE" ] && touch "$LOG_FILE"

# Output Welcome Briefing
echo "Welcome, $AGENT_NAME! You are now part of an AI Software Development house."
echo "Your role is: $ROLE"
echo "Log initialized at: $LOG_FILE"
