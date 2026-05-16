#!/bin/bash

# Complete deployment script for portfolio automation
# Pushes all repos and provides final instructions

set -e

echo "🚀 Portfolio Automation Deployment"
echo "==================================="
echo ""

# Step 1: Push project repos
echo "Step 1/3: Pushing thumbnail commits to project repos..."
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
PUSHED=0
SKIPPED=0

for repo in "${REPOS[@]}"; do
  repo_path="$REPOS_DIR/$repo"
  
  if [ ! -d "$repo_path" ]; then
    echo "⚠️  $repo not found - skipping"
    ((SKIPPED++))
    continue
  fi
  
  echo "📦 $repo..."
  cd "$repo_path"
  
  # Push if there are commits
  if git push 2>&1 | grep -q "up-to-date"; then
    echo "   ✓ Already up-to-date"
  else
    echo "   ✓ Pushed"
    ((PUSHED++))
  fi
done

echo ""
echo "✅ Project repos: $PUSHED pushed, $SKIPPED skipped"
echo ""

# Step 2: Push portfolio repo
echo "Step 2/3: Pushing portfolio site..."
cd "$HOME/development/yohannes15.github.io"
if git push; then
  echo "   ✓ Portfolio site pushed"
else
  echo "   ⚠️  Failed to push portfolio site"
  exit 1
fi

echo ""
echo "✅ All code pushed to GitHub!"
echo ""

# Step 3: Topics instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3/3: Add Topics on GitHub (Manual Step)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For each repo below, add topics via GitHub web UI:"
echo ""
echo "1. chess-engine"
echo "   → https://github.com/yohannes15/chess-engine"
echo "   → Topics: portfolio, learning"
echo ""
echo "2. AddisMap"
echo "   → https://github.com/yohannes15/AddisMap"
echo "   → Topics: portfolio, demo"
echo ""
echo "3. log-sentinel"
echo "   → https://github.com/yohannes15/log-sentinel"
echo "   → Topics: portfolio, learning"
echo ""
echo "4. fp-in-scala-red-book"
echo "   → https://github.com/yohannes15/fp-in-scala-red-book"
echo "   → Topics: portfolio, learning"
echo ""
echo "5. advent-of-code"
echo "   → https://github.com/yohannes15/advent-of-code"
echo "   → Topics: portfolio, learning"
echo ""
echo "6. DeveloperMatchMaker"
echo "   → https://github.com/yohannes15/DeveloperMatchMaker"
echo "   → Topics: portfolio, demo"
echo "   → Homepage: http://devconnect.pythonanywhere.com/login"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "After adding topics, GitHub Actions will rebuild your portfolio"
echo "and projects will appear automatically!"
echo ""
echo "📝 See TOPICS.md for detailed instructions"
echo "🎯 Portfolio URL: https://yohannes15.github.io/"
