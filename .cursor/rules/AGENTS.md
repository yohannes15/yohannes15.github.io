# Cursor Agent Rules - yohannes15.github.io

## Project Context

Personal portfolio built with **Astro** + **TypeScript** + vanilla CSS. Deployed to GitHub Pages.

**Purpose**: Showcase backend work, Scala/FP learning, personal interests.

**Projects**: Automated via GitHub API - tag repos with `portfolio` topic + add `.github/portfolio-thumb.png`.

---

## Standards

1. **No tests unless requested** - personal site, not production
2. **Be succinct** - code > explanations
3. **Ask, don't assume** - clarify unclear requirements
4. **Edit over create** - avoid new files when possible
5. **No emojis** in communication (UI/content is fine)

---

## Tech Stack

**Astro**:
- `.astro` components for templates
- Content in `/src/content/` collections
- `output: 'static'`

**TypeScript**:
- Type everything in `src/lib/`
- Zod schemas for content
- No `any` types

**CSS**:
- Global styles in `src/styles/global.css`
- CSS custom properties (`:root` vars)
- Mobile-first, use `clamp()` for fluid sizing

**Content**:
- Professional but personal tone (match `resume.tex`)
- No robotic or cutesy wording
- Projects sourced from GitHub API (see `src/lib/github-projects.ts`)

---

## Agent Workflow (PRIMARY RULE)

### Senior Agent (Sonnet/expensive)
**Role**: Thinking, decisions, coordination, review

**Responsibilities**:
- Analyze problems
- Make design/architecture decisions
- Write detailed specs for subagents
- Review subagent output
- Handle final integration
- Code only when trivial (1-2 line fixes) OR user says **"SOLO"**

### User Keyword: SOLO
When user says **"SOLO"**, senior agent codes directly. No delegation.

### Subagent (composer-2-fast/cheap)
**Role**: Implementation, coding, research

**Delegate to subagent for**:
- Multi-file changes
- Feature implementations
- CSS/styling work
- Repetitive edits
- Research + implementation
- Anything with clear end state

**Senior codes directly only when**:
- 1-2 line trivial fixes
- Faster than spawning subagent
- Correcting subagent output

### Delegation Format

Senior writes detailed spec:
```
Task: [What to do]
Location: [Exact files/lines]
Current state: [What exists now]
Problems: [What's wrong]
Requirements: [Specific changes]
Constraints: [What NOT to change]
Expected outcome: [End state]
```

Then spawns subagent with clear instructions. Reviews output, approves or requests fixes.

---

## Project Structure

```
src/
├── config/projects.ts    # GitHub API config
├── layouts/              # Page layouts
├── lib/
│   └── github-projects.ts # GitHub API integration
├── pages/                # Routes
└── styles/               # Global CSS

public/                   # Static assets
```

---

## Common Patterns

**New project**: Tag GitHub repo with `portfolio` topic, add `.github/portfolio-thumb.{png,jpg,svg}`

**Resume updates**: Edit `~/development/Resume/resume.tex` (source of truth), sync to `src/pages/resume/index.md` (no phone)

**Assets**: Go in `public/`, reference as `/path/to/asset.png`

**Config**: Edit `src/config/projects.ts` for GitHub API settings

---

## Current State

Recently migrated from gitfolio to Astro. Projects now **fully automated via GitHub API** - tag repos with `portfolio` topic, add thumbnails to `.github/` in each repo. Build fetches fresh data at deploy time.

---

## Decision Framework

**Design decision?** → Senior decides  
**Clear implementation?** → Delegate to subagent  
**Unclear intent?** → Ask user  
**Multi-system change?** → Senior coordinates  

Remember: This is Yohannes' personal brand. Keep it professional, straightforward, maintainable.
