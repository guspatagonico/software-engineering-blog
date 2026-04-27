#!/bin/bash
# Agent Browser debugging helper script
# Usage: .opencode/scripts/debug-browser.sh [post-slug] [section-hash]
# Example: .opencode/scripts/debug-browser.sh harness-agentic-control model

set -e

AGENT_PROFILE="${HOME}/.agent-browser/profiles/debugging"
REMOTE_DEBUG_PORT=9333
POST="${1:-harness-agentic-control}"
SECTION="${2:-model}"

# Ensure profile directory exists
mkdir -p "$AGENT_PROFILE"

echo "🚀 Starting agent-browser with isolated Chrome..."
echo "   Profile: $AGENT_PROFILE"
echo "   Debug port: $REMOTE_DEBUG_PORT"
echo "   Opening: http://localhost:4321/software-engineering/blog/$POST#$SECTION"
echo ""

# Launch agent-browser with isolated Chrome in remote debug mode
agent-browser \
  --profile "$AGENT_PROFILE" \
  --args "--remote-debugging-port=$REMOTE_DEBUG_PORT" \
  open "http://localhost:4321/software-engineering/blog/$POST#$SECTION"

echo ""
echo "✅ Chrome debugging instance:"
echo "   Remote debug port: $REMOTE_DEBUG_PORT"
echo "   Connect via: chrome://inspect (in your personal Chrome)"
echo "   Or use VS Code DevTools on localhost:$REMOTE_DEBUG_PORT"
