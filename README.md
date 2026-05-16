# yohannes15.github.io

Personal portfolio rebuilt with **[Astro](https://astro.build/)**.

**Live**: [https://yohannes15.github.io/](https://yohannes15.github.io/)

**Profile photo**: add a square-ish image at `public/images/profile.jpg` (or `.png`, `.jpeg`, `.webp`). The homepage picks the first matching file automatically; otherwise it falls back to your GitHub avatar.

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

1. In the repo **Settings → Pages**, set **Source** to **GitHub Actions** (not “deploy from branch”).
2. Merge or push to `master`; the workflow runs automatically.
