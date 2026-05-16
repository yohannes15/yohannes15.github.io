#!/bin/bash

# Quick migration helper to add portfolio thumbnails to repos
# Usage: ./migrate-thumbnails.sh

set -e

PORTFOLIO_REPO="$HOME/development/yohannes15.github.io"
PROJECTS_DIR="$HOME/development"

echo "🚀 Portfolio Thumbnail Migration"
echo "================================"
echo ""

# Project mappings: repo_name:source_image_name
declare -A PROJECTS=(
  ["chess-engine"]="chess-engine-thumb.png"
  ["addismap"]="top_image.gif"
  ["devconnect"]="visualize.gif"
  ["log-sentinel"]="thumb.png"
  ["red-book"]="thumb.png"
  ["advent-of-code"]="thumb.png"
)

for repo in "${!PROJECTS[@]}"; do
  image="${PROJECTS[$repo]}"
  repo_path="$PROJECTS_DIR/$repo"
  source_image="$PORTFOLIO_REPO/public/projects/$repo/$image"
  
  echo "📦 Processing $repo..."
  
  # Check if repo exists
  if [ ! -d "$repo_path" ]; then
    echo "   ⚠️  Repo not found at $repo_path - skipping"
    continue
  fi
  
  # Check if source image exists
  if [ ! -f "$source_image" ]; then
    echo "   ⚠️  Source image not found: $source_image - skipping"
    continue
  fi
  
  # Navigate to repo
  cd "$repo_path"
  
  # Create .github directory
  mkdir -p .github
  
  # Determine file extension
  ext="${image##*.}"
  
  # Copy thumbnail
  cp "$source_image" ".github/portfolio-thumb.$ext"
  
  # Check if already committed
  if git status --porcelain | grep -q ".github/portfolio-thumb"; then
    echo "   ✓ Copied thumbnail (.github/portfolio-thumb.$ext)"
    
    # Stage and commit
    git add ".github/portfolio-thumb.$ext"
    git commit -m "Add portfolio thumbnail"
    
    echo "   ✓ Committed"
    
    # Ask to push
    read -p "   Push to GitHub? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push
      echo "   ✓ Pushed"
    else
      echo "   ⚠️  Skipped push (run 'git push' manually)"
    fi
  else
    echo "   ℹ️  Thumbnail already exists and committed"
  fi
  
  echo ""
done

echo "✅ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Add 'portfolio' topic to each repo on GitHub"
echo "2. Add category topics: 'learning', 'demo', 'tool', etc."
echo "3. Rebuild portfolio site: cd $PORTFOLIO_REPO && npm run build"
