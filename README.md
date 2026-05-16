# yohannes15.github.io

Personal portfolio built with **Astro** + **GitHub API automation**.

**Live**: [https://yohannes15.github.io/](https://yohannes15.github.io/)

## How It Works

Projects are automatically sourced from GitHub:
1. Tag repos with `portfolio` topic
2. Add `.github/portfolio-thumb.{png,jpg,gif,svg}` to each repo
3. Build fetches fresh data via GitHub API
4. Projects auto-categorized and sorted by score (stars + recency)

## Local Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Categorization

**Projects** (main section):
- `demo` → Has a live demo/deployed URL
- `showcase` → Substantial projects worth showing (even without demo)
- Otherwise gets `Active`/`Stale` based on last update (6 months)

**Learning & Practice** (bottom section):
- `learning` only → Pure practice/learning exercises

**Examples:**
- AddisMap: `portfolio`, `demo` → Projects (has live demo)
- Chess Engine: `portfolio`, `learning`, `showcase` → Projects (substantial, no demo yet)
- Red Book: `portfolio`, `learning` → Learning & Practice (pure practice)

## Configuration

Edit `src/config/projects.ts`:
- Topic mappings: `learning` → "Learning", `showcase` → "Showcase", etc.
- Repo title overrides: `AddisMap` → "World Map Path Finder"
- Score weights: 60% stars, 40% recency
- Stale threshold: 6 months
- Excluded repos

## Adding/Updating Projects

1. **Tag repo on GitHub**: Add `portfolio` topic (+ `demo`/`learning`/`showcase` as needed)
2. **Add thumbnail**: Upload `.github/portfolio-thumb.{png,jpg,gif,svg}` to repo
3. **Set homepage URL** (optional): For demo link
4. **Push**: GitHub Actions rebuilds automatically

## Extended Project Descriptions

Default: Uses GitHub repo description.

For richer content, add to repo's README.md:

```markdown
## Portfolio

Extended description goes here.
Can use **markdown** formatting.
```

Or use HTML comments (invisible in README):

```markdown
<!-- portfolio-start -->
Extended portfolio content here.
<!-- portfolio-end -->
```

## Deploy (GitHub Pages)

Workflow: `.github/workflows/deploy.yml`

1. Settings → Pages → Source: **GitHub Actions**
2. Push to `master` → auto-deploy

## Tech Stack

- **Astro**: Static site generator
- **TypeScript**: Type-safe GitHub API integration
- **Marked**: Markdown rendering
- **GitHub CLI**: Topic management (development)

## Project Scoring

`score = (stars × 0.6) + (recency_months × 0.4)`

Where `recency_months = max(0, 12 - months_since_update)`

Higher score = appears first.
