#!/bin/bash
echo "--- JOBLYNK SYSTEM HEALTH: $(date) ---"
# Check DB Utility
if [ -f "/root/.openclaw/workspace/corp/eng/db_query.sh" ]; then
    echo "[OK] DB Utility: Found"
else
    echo "[FAIL] DB Utility: MISSING"
fi
# Check Directory Access
[ -w "/root/.openclaw/workspace/corp/eng" ] && echo "[OK] Engineering Workspace: Writeable" || echo "[FAIL] Engineering: Locked"
[ -w "/root/.openclaw/workspace/corp/product" ] && echo "[OK] Product Workspace: Writeable" || echo "[FAIL] Product: Locked"
[ -w "/root/.openclaw/workspace/corp/ops" ] && echo "[OK] Operations Workspace: Writeable" || echo "[FAIL] Ops: Locked"
echo "---------------------------------------"
