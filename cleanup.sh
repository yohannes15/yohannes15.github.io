#!/bin/bash

# Optional cleanup after successful GitHub migration
# Run this ONLY after confirming portfolio builds correctly with GitHub API

set -e

echo "🧹 Portfolio Cleanup"
echo "===================="
echo ""
echo "⚠️  WARNING: This will delete old manual project files."
echo "⚠️  Only run this after confirming GitHub automation works!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "Cleaning up..."

# Remove old project markdown files (optional - keep for manual overrides)
if [ -d "src/content/projects" ]; then
  echo "📁 Removing src/content/projects/ (old markdown files)"
  rm -rf src/content/projects/
fi

# Remove old thumbnail storage
if [ -d "public/projects" ]; then
  echo "📁 Removing public/projects/ (old thumbnails)"
  rm -rf public/projects/
fi

# Remove content collection config (optional)
if [ -f "src/content/config.ts" ]; then
  echo "📄 Removing src/content/config.ts (old schema)"
  rm src/content/config.ts
fi

# Remove empty content directory
if [ -d "src/content" ] && [ -z "$(ls -A src/content)" ]; then
  echo "📁 Removing empty src/content/"
  rmdir src/content/
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Test build: npm run build"
echo "2. Preview: npm run preview"
echo "3. If good, commit: git add -A && git commit -m 'Clean up legacy project files'"
echo "4. Deploy: git push"
