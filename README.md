# yohannes15.github.io

Personal portfolio rebuilt with **[Astro](https://astro.build/)** + **GitHub API automation**.

**Live**: [https://yohannes15.github.io/](https://yohannes15.github.io/)

## How It Works

Projects are **automatically sourced from GitHub**:
- Tag repos with `portfolio` topic
- Add `.github/portfolio-thumb.{png,jpg,svg}` to each repo
- Build pulls fresh data via GitHub API

See [MIGRATION.md](MIGRATION.md) for full setup instructions.

## Local development

Requirements: Node 20+ recommended (GitHub Actions uses Node 22).

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview   # smoke-test ./dist locally
```

## Deploy (GitHub Pages)

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds static output and publishes **`dist`** via GitHub Actions plus the **GitHub Pages** environment.

1. In the repo **Settings → Pages**, set **Source** to **GitHub Actions** (not "deploy from branch").
2. Merge or push to `master`; the workflow runs automatically.

## Configuration

Edit `src/config/projects.ts` to customize:
- Required topic name
- Topic → tag mappings
- Score weights (stars vs recency)
- Stale threshold
- Excluded repos
