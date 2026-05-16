#!/bin/bash

# Push all project repos with portfolio thumbnails
# Run from portfolio repo directory

set -e

echo "🚀 Pushing Portfolio Thumbnails to GitHub"
echo "=========================================="
echo ""

REPOS=(
  "chess-engine"
  "AddisMap"
  "livelogsentinel"
  "fp-in-scala-red-book"
  "advent_of_code"
  "DeveloperMatchMaker"
)

REPOS_DIR="$HOME/development"

for repo in "${REPOS[@]}"; do
  repo_path="$REPOS_DIR/$repo"
  
  if [ ! -d "$repo_path" ]; then
    echo "⚠️  $repo not found at $repo_path - skipping"
    continue
  fi
  
  echo "📦 Pushing $repo..."
  cd "$repo_path"
  
  # Check if there are commits to push
  if git log origin/$(git branch --show-current)..HEAD 2>/dev/null | grep -q "Add portfolio thumbnail"; then
    git push
    echo "   ✓ Pushed"
  else
    echo "   ℹ️  No new commits to push"
  fi
  
  echo ""
done

echo "✅ All repos pushed!"
echo ""
echo "Next: Add topics to repos on GitHub (see TOPICS.md)"
