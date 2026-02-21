#!/bin/bash
# JobLynk AI Exploration - Database Snapshot
export PGPASSWORD='AIzaSyC69gwKzgTO9'
FILENAME="/root/.openclaw/workspace/corp/shared/assets/db_backup_$(date +%F).sql"
pg_dump -h 127.0.0.1 -U postgres agent_memory > $FILENAME
echo "Backup created: $FILENAME"
