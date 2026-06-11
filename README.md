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

## Notes
- Data saves in the browser (localStorage)
- Each team member's browser saves their own data
- Comments are also saved per browser
- For shared team data, you would need a backend (Firebase etc.) — but for a small team, each person can use their own browser and share screenshots!
