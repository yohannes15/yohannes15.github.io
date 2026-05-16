# GitHub Automation Implementation Summary

## ✅ What's Been Implemented

### 1. Configuration System (`src/config/projects.ts`)
- Centralized config for GitHub API integration
- Customizable topic filtering (`portfolio` by default)
- Topic → tag mappings (`learning` → "Learning", etc.)
- Score calculation weights (60% stars, 40% recency)
- Stale threshold (6 months)
- Repository exclusion list

### 2. GitHub API Integration (`src/lib/github-projects.ts`)
- Fetches all user repos at build time
- Filters by `portfolio` topic
- **Strict image validation**: Build fails if `.github/portfolio-thumb.{png,jpg,svg}` missing
- Parses README for extended content:
  - Looks for `## Portfolio` section
  - Or HTML comments: `<!-- portfolio-start -->...<!-- portfolio-end -->`
  - Falls back to repo description
- Automatic scoring (stars + recency)
- Automatic activity tagging (Active/Stale)
- Homepage URL → demo link mapping

### 3. Updated Pages
- `src/pages/index.astro`: Uses GitHub data
- `src/pages/projects/index.astro`: Uses GitHub data
- `src/pages/projects/[slug].astro`: Renders GitHub-sourced markdown

### 4. Markdown Rendering
- Installed `marked` package for markdown → HTML conversion
- Extended descriptions from README rendered properly

### 5. Documentation
- `MIGRATION.md`: Complete migration guide
- `migrate-thumbnails.sh`: Automated script to copy images to repos
- Updated `README.md`: New GitHub-based workflow
- Updated `.cursor/rules/AGENTS.md`: Current state reflects automation

## 🎯 What You Need to Do Next

### Step 1: Add `portfolio` topic to repos

Visit each repo on GitHub and add topics:

**chess-engine**:
- Topics: `portfolio`, `learning`

**addismap**:
- Topics: `portfolio`, `demo`

**devconnect**:
- Topics: `portfolio`, `demo`

**log-sentinel**:
- Topics: `portfolio`, `learning`

**red-book**:
- Topics: `portfolio`, `learning`

**advent-of-code**:
- Topics: `portfolio`, `learning`

### Step 2: Upload thumbnails to each repo

**Option A: Use the migration script**

```bash
cd ~/development/yohannes15.github.io
./migrate-thumbnails.sh
```

This will:
- Copy images from `public/projects/` to each repo's `.github/`
- Commit them
- Prompt to push each one

**Option B: Manual upload via GitHub web UI**

For each repo:
1. Go to repo on GitHub
2. Click "Add file" → "Upload files"
3. Upload the thumbnail to `.github/portfolio-thumb.{png,jpg,svg}`
4. Commit directly to master

**Current image locations**:
- `chess-engine`: `public/projects/chess-engine/chess-engine-thumb.png`
- `addismap`: `public/projects/addismap/top_image.gif` → rename to `portfolio-thumb.gif`
- `devconnect`: `public/projects/devconnect/visualize.gif` → rename to `portfolio-thumb.gif`
- `log-sentinel`: `public/projects/log-sentinel/thumb.png` → rename to `portfolio-thumb.png`
- `red-book`: `public/projects/red-book/thumb.png` → rename to `portfolio-thumb.png`
- `advent-of-code`: `public/projects/advent-of-code/thumb.png` → rename to `portfolio-thumb.png`

### Step 3: Add homepage URLs (for demo links)

For repos with live demos:

**addismap**: Add demo URL to repo settings → Website field

**devconnect**: Add demo URL to repo settings → Website field

### Step 4: Test locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4321` to verify everything loads.

### Step 5: Deploy

```bash
git add -A
git commit -m "Implement GitHub API automation for portfolio projects"
git push origin master
```

## 🔧 How It Works

### Build Flow

1. Astro build starts
2. Pages call `getPortfolioProjects('yohannes15')`
3. Fetches all repos from GitHub API
4. Filters for `portfolio` topic
5. For each matching repo:
   - Checks for `.github/portfolio-thumb.{png,jpg,svg}` (fails if missing)
   - Fetches README, looks for `## Portfolio` section or HTML comments
   - Calculates score based on stars + recency
   - Maps topics to tags
   - Determines Active/Stale status
6. Sorts by score (highest first)
7. Returns project data to pages
8. Pages render projects

### Scoring Example

**chess-engine**:
- Stars: 2
- Last updated: 1 month ago
- Score: `(2 * 0.6) + ((12 - 1) * 0.4)` = `1.2 + 4.4` = **5.6**

**addismap**:
- Stars: 0
- Last updated: 8 months ago (stale)
- Score: `(0 * 0.6) + ((12 - 8) * 0.4)` = `0 + 1.6` = **1.6**

Higher score = appears first in portfolio.

### Activity Tags

- **Active**: Updated within 6 months
- **Stale**: Updated 6+ months ago
- **Learning projects**: Don't get activity tags (timeless)

### Extended Descriptions

**Priority**:
1. Manual override: `src/content/projects/{repo-name}.md` (if exists)
2. README section: `## Portfolio` heading
3. HTML comments: `<!-- portfolio-start -->...<!-- portfolio-end -->`
4. GitHub description

## 📊 Current Build Output

```
[Portfolio] Fetching repos from GitHub...
[Portfolio] Found 0 repos with 'portfolio' topic
[Portfolio] ✓ Successfully processed 0 projects
```

After adding topics, you'll see:

```
[Portfolio] Fetching repos from GitHub...
[Portfolio] Found 6 repos with 'portfolio' topic
[Portfolio] Processing chess-engine...
[Portfolio] ✓ chess-engine (found thumbnail)
[Portfolio] Processing addismap...
[Portfolio] ✓ addismap (found thumbnail)
...
[Portfolio] ✓ Successfully processed 6 projects
```

## 🧹 Optional Cleanup (After Successful Migration)

Once everything works with GitHub automation:

```bash
./cleanup.sh
```

This removes:
- `src/content/projects/` - old markdown files
- `public/projects/` - old thumbnail storage
- `src/content/config.ts` - old content collection schema

**Note**: Keep `src/content/projects/` if you want the ability to manually override specific projects.

## 🎨 Benefits

1. **Single source of truth**: GitHub repos drive portfolio
2. **Zero manual sync**: Update repo → reflects on portfolio
3. **Automatic ordering**: Stars + recency = smart sorting
4. **Fresh activity tags**: Active/Stale based on real data
5. **Content co-location**: Extend descriptions via README
6. **Strict validation**: Won't deploy broken projects
7. **Future-proof**: Add/remove projects via topics only

## 🚀 Future Enhancements (Optional)

- Add `GITHUB_TOKEN` env var for higher rate limits (5000/hr vs 60/hr)
- Customize score weights in `src/config/projects.ts`
- Add more topic mappings for additional tags
- Adjust stale threshold (currently 6 months)
- Cache GitHub API responses during dev (currently caches for build only)

## ❓ Questions?

See `MIGRATION.md` for detailed troubleshooting and advanced configuration.
