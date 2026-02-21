#!/usr/bin/env bash
set -euo pipefail

# Enterprise deployment helper for LiveKit Cloud agents.
# Requires `lk` (LiveKit CLI) to be installed and authenticated.

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT_DIR"

if ! command -v lk >/dev/null 2>&1; then
  echo "ERROR: LiveKit CLI (lk) is not installed."
  echo "Install it from LiveKit docs, then re-run this script."
  exit 1
fi

: "${LIVEKIT_URL:?LIVEKIT_URL is required}"
: "${LIVEKIT_API_KEY:?LIVEKIT_API_KEY is required}"
: "${LIVEKIT_API_SECRET:?LIVEKIT_API_SECRET is required}"

# Optional hints for selecting target agent.
APP_NAME="${LIVEKIT_AGENT_NAME:-joblynk-voice-agent}"
APP_ID="${LIVEKIT_AGENT_ID:-}"
if [[ -z "$APP_ID" && "$APP_NAME" == CA_* ]]; then
  APP_ID="$APP_NAME"
fi

# Avoid interactive auth in CI (can require /dev/tty).
if [[ -z "${CI:-}" ]]; then
  lk cloud auth --url "$LIVEKIT_URL" --api-key "$LIVEKIT_API_KEY" --api-secret "$LIVEKIT_API_SECRET"
else
  echo "CI mode: skipping interactive 'lk cloud auth' and using env credentials."
fi

# Deploy command for lk v2.13.x: lk agent deploy [working-dir] [--secrets-file FILE]
if lk agent --help >/dev/null 2>&1; then
  echo "Preparing LiveKit Cloud agent..."

  # Ensure deploy has an agent ID in config to avoid interactive selection in CI.
  if [[ -n "$APP_ID" ]]; then
    echo "Configuring target LiveKit agent id: $APP_ID"
    lk agent config livekit_agent \
      --id "$APP_ID" \
      --url "$LIVEKIT_URL" \
      --api-key "$LIVEKIT_API_KEY" \
      --api-secret "$LIVEKIT_API_SECRET"
  else
    echo "No LIVEKIT_AGENT_ID provided. Falling back to existing livekit.toml (if any)."
  fi

  echo "Deploying LiveKit agent via lk agent deploy (working-dir mode)..."

  # Build a secrets file from current env (do not print values).
  TMP_SECRETS="$(mktemp)"
  trap 'rm -f "$TMP_SECRETS"' EXIT
  {
    echo "LIVEKIT_URL=$LIVEKIT_URL"
    echo "LIVEKIT_API_KEY=$LIVEKIT_API_KEY"
    echo "LIVEKIT_API_SECRET=$LIVEKIT_API_SECRET"
  } > "$TMP_SECRETS"

  # Note: APP_NAME not supported by this CLI's deploy flags; agent metadata is sourced from config in working dir.
  lk agent deploy livekit_agent \
    --secrets-file "$TMP_SECRETS" \
    --ignore-empty-secrets \
    --silent \
    --url "$LIVEKIT_URL" \
    --api-key "$LIVEKIT_API_KEY" \
    --api-secret "$LIVEKIT_API_SECRET"
else
  echo "LiveKit CLI does not expose 'agent' subcommand in this version."
  echo "Please run: lk --help and adjust deployment command accordingly."
  exit 2
fi

echo "Deployment complete: $APP_NAME"
