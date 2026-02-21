#!/bin/bash
# JobLynk AI Exploration - Disaster Recovery Script
echo "Initiating System Recovery..."

# 1. Restore DB Access
export PGPASSWORD='AIzaSyC69gwKzgTO9'
psql -h 127.0.0.1 -U postgres -d agent_memory -c "SELECT 'DB Connection: OK' as Status;"

# 2. Re-verify Workspace Permissions
chmod -R 775 /root/.openclaw/workspace/corp

# 3. Check for the Master Directive
if [ -f "/root/.openclaw/workspace/SYSTEM_PROMPT.md" ]; then
    echo "Corporate Memory: INTACT"
else
    echo "WARNING: Corporate Memory Missing. Restoring from Database..."
    # (Logic to pull mission from DB would go here)
fi
