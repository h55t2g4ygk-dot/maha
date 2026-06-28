# MAHA AI Assistant

Recipe analyzer aligned with Make America Healthy Again dietary principles.

## Deploy to Vercel in 5 minutes

### 1. Get a free Vercel account
Go to https://vercel.com and sign up (free).

### 2. Get your Anthropic API key
Go to https://console.anthropic.com → API Keys → Create Key.
Copy it — you'll need it in step 4.

### 3. Upload this project
Option A — Drag and drop:
- Go to https://vercel.com/new
- Drag this entire folder onto the page

Option B — GitHub (recommended):
- Create a repo at github.com, upload this folder
- In Vercel, click "Import Git Repository" and select it

### 4. Add your API key
In Vercel, before deploying:
- Go to Settings → Environment Variables
- Add: ANTHROPIC_API_KEY = (paste your key here)
- Click Save

### 5. Deploy
Click Deploy. In ~60 seconds you'll have a live URL like:
https://maha-ai-assistant.vercel.app

Share that link with anyone — it works on phones, tablets, desktop.

## Project structure

```
maha-app/
├── api/
│   └── analyze.js      ← Serverless function (keeps API key secret)
├── public/
│   └── index.html      ← The full app (no build step needed)
├── vercel.json         ← Routing config
└── package.json
```

## Notes
- No build step required — the app runs directly in the browser
- The API key never leaves the server
- Free Vercel tier handles ~100,000 requests/month
