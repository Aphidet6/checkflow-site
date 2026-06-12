# Check Flow Test Doc — Roblox Game Website

A checklist website for your team to test every system in Lobby + yshibuya.

## How to deploy to Vercel (free!)

### Option A — Drag and Drop (easiest, no code needed)
1. Go to https://vercel.com and sign up with GitHub (free)
2. Click **"Add New Project"** → **"Deploy from template"**
3. Actually easier: Go to https://vercel.com/new and drag the whole folder into the browser
4. Click Deploy → done! You get a free link like `https://yourproject.vercel.app`

### Option B — Upload via GitHub
1. Create a GitHub account if you don't have one
2. Create a new repository (public or private)
3. Upload index.html and vercel.json to the repo
4. Go to https://vercel.com → Import your GitHub repo
5. Click Deploy → free link ready!

### Option C — Vercel CLI
```bash
npm install -g vercel
cd checkflow-site
vercel
```
Follow the prompts → free link!

---

## Features
- 25 systems across Lobby + yshibuya
- Checkbox checklist per system (saves in browser)
- Status per system: Not tested / Working / Broken / Has issues
- Team comments on each system
- Sidebar with color dots showing status at a glance
- Progress counter in header
- Set your name so team knows who commented
- Export a full Markdown report for Codex
- Export a problems-only Markdown report
- Export separate Lobby and yshibuya reports for task delegation
- Export and import JSON backups for exact checklist restore
- Publish one shared Markdown report so every visitor sees the same progress

## Shared progress setup on Vercel

1. Deploy this folder using GitHub import or Vercel CLI.
2. Open the project in Vercel.
3. Go to **Storage** and create a **Public Blob** store.
4. Connect the Blob store to this project. Vercel creates `BLOB_READ_WRITE_TOKEN` automatically.
5. Go to **Settings > Environment Variables**.
6. Add `REPORT_UPDATE_KEY` with a private password for your team.
7. Redeploy the project.

Visitors do not need a password to see shared progress. The password is only required when someone clicks **Publish Shared Report**.

## Shared workflow

1. Test systems and export `roblox-flow-full-report-YYYY-MM-DD.md`.
2. Click **Publish Shared Report**.
3. Select the Markdown file and enter `REPORT_UPDATE_KEY`.
4. Every visitor will load the latest shared report automatically.

Local edits are drafts until a new Markdown report is published.

## Notes
- Data saves in the browser (localStorage)
- Each team member's browser saves their own data
- Comments are also saved per browser
- For shared team data, you would need a backend (Firebase etc.) — but for a small team, each person can use their own browser and share screenshots!
