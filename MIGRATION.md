# GitHub-Based Portfolio Migration

## Overview

Your portfolio is now **fully automated** via GitHub! No more manual markdown files.

## How It Works

1. **Tag repos** with the `portfolio` topic on GitHub
2. **Add thumbnail** to each repo: `.github/portfolio-thumb.png`
3. **Push to portfolio site** → GitHub Actions builds with fresh data

## Current State

✓ Build system configured  
✓ GitHub API integration complete  
⚠ Need to tag repos and add images (see below)

## Migration Steps

### 1. Add `portfolio` topic to your repos

For each project you want on the portfolio:

1. Go to the repo on GitHub (e.g., `yohannes15/chess-engine`)
2. Click the gear icon ⚙️ next to "About" (top right)
3. Add topics: `portfolio`, plus category topics like:
   - `learning` → becomes "Learning" tag
   - `demo` → becomes "Demo" tag
   - `tool` → becomes "Tool" tag
   - `archived` → becomes "Archived" tag

**Recommended topic combos:**
- `chess-engine`: `portfolio`, `learning`
- `addismap`: `portfolio`, `demo`
- `devconnect`: `portfolio`, `demo`
- `log-sentinel`: `portfolio`, `learning`
- `red-book`: `portfolio`, `learning`
- `advent-of-code`: `portfolio`, `learning`

### 2. Upload thumbnail images to each repo

Each repo needs `.github/portfolio-thumb.png` (or `.jpg`, `.svg`).

**Option A: Upload via GitHub web UI**
1. Navigate to repo root on GitHub
2. Click "Add file" → "Create new file"
3. Name it `.github/portfolio-thumb.png`
4. Upload the image from `public/projects/{repo-name}/`
5. Commit directly to `master`

**Option B: Upload via git (for multiple repos)**

For each project:

```bash
# Navigate to the repo
cd ~/path/to/chess-engine

# Create .github directory if needed
mkdir -p .github

# Copy the thumbnail (adjust path as needed)
cp ~/development/yohannes15.github.io/public/projects/chess-engine/chess-engine-thumb.png .github/portfolio-thumb.png

# Commit and push
git add .github/portfolio-thumb.png
git commit -m "Add portfolio thumbnail"
git push
```

**Current image locations** (source material):
- `chess-engine`: `public/projects/chess-engine/chess-engine-thumb.png`
- `addismap`: `public/projects/addismap/top_image.gif`
- `devconnect`: `public/projects/devconnect/visualize.gif`
- `log-sentinel`: `public/projects/log-sentinel/thumb.png`
- `red-book`: `public/projects/red-book/thumb.png`
- `advent-of-code`: `public/projects/advent-of-code/thumb.png`

### 3. Set homepage URLs (optional, for demo links)

For repos with live demos:

1. Go to repo settings → scroll to "Website"
2. Add the demo URL (e.g., `https://addismap.vercel.app`)
3. This becomes the "Live Demo" button automatically

### 4. Extended descriptions (optional)

By default, uses GitHub repo description. For richer content:

**Option 1**: Add to README.md (recommended, lives with code)

```markdown
## Portfolio

This is the extended description that appears on the portfolio detail page.
You can use **markdown** formatting here.

- Multiple paragraphs
- Lists
- Code blocks
- Whatever you want
```

**Option 2**: Use HTML comments (invisible in README)

```markdown
<!-- portfolio-start -->
Extended portfolio description goes here.
Can span multiple lines and use markdown.
<!-- portfolio-end -->
```

**Option 3**: Manual override (only if needed)

Keep markdown file in `src/content/projects/{repo-name}.md` - this takes precedence over GitHub content.

### 5. Test locally

```bash
cd ~/development/yohannes15.github.io
npm run build
npm run preview
```

Visit `http://localhost:4321` to preview.

### 6. Deploy

```bash
git add -A
git commit -m "Migrate to GitHub-based portfolio automation"
git push origin master
```

GitHub Actions will build and deploy automatically.

## Scoring & Ordering

Projects are automatically sorted by **score**:

- **60%** stars/popularity
- **40%** recency (updated in last 12 months = max points)

Higher score = appears first.

## Activity Tags

Automatically added based on `updated_at`:
- **Active**: Updated within last 6 months
- **Stale**: Not updated in 6+ months

**Exception**: Learning projects don't get activity tags (they're timeless practice).

## Configuration

Edit `src/config/projects.ts` to customize:
- Required topic name (currently `portfolio`)
- Topic → tag mappings
- Score weights
- Stale threshold
- Excluded repos

## What You Can Delete (After Migration)

Once all repos are tagged and thumbnailed:

```bash
rm -rf src/content/projects/  # Old markdown files (optional, keep for overrides)
rm -rf public/projects/        # Old thumbnail storage
rm src/lib/github.ts          # Old manual activity enrichment
```

## Troubleshooting

**Build fails with "Missing .github/portfolio-thumb"**
→ Add the image to that repo, or remove the `portfolio` topic

**Project not showing up**
→ Check the repo has the `portfolio` topic (case-sensitive)

**Wrong project order**
→ Check star count and last updated date (drives scoring)

**Want to exclude a repo**
→ Add to `excludedRepos` in `src/config/projects.ts`

## Rate Limits

- Without token: 60 requests/hour
- With `GITHUB_TOKEN` env var: 5000 requests/hour

For local dev, add to `.env`:
```
GITHUB_TOKEN=ghp_your_token_here
```

(Not needed for GitHub Actions - it provides a token automatically)
