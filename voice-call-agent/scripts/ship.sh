#!/usr/bin/env bash
set -euo pipefail

MSG=${1:-"chore: automated update"}
BRANCH=${2:-main}
REMOTE=${3:-softwise}

cd "$(dirname "$0")/.."

git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MSG"
if [ -n "${GITHUB_TOKEN:-}" ]; then
  REPO_URL=$(git remote get-url "$REMOTE")
  AUTH_URL=${REPO_URL/https:\/\//https://x-access-token:${GITHUB_TOKEN}@}
  git push "$AUTH_URL" "$BRANCH"
else
  git push "$REMOTE" "$BRANCH"
fi

echo "Shipped: $MSG"
