# Learnify – Deployment Guide

## Prerequisites
- Node.js 16+ (https://nodejs.org)
- npm (comes with Node.js)

---

## 1. Run Locally

```bash
cd learnify
npm install
npm start
```
Opens at http://localhost:3000

---

## 2. Deploy to Vercel (Recommended – Free)

### Option A: Via CLI
```bash
npm install -g vercel
cd learnify
npm run build
vercel
```
Follow the prompts. Your app goes live at a `.vercel.app` URL.

### Option B: Via GitHub (Even easier)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Click Deploy — done!

---

## 3. Deploy to Netlify (Also Free)

### Option A: Drag & Drop
```bash
cd learnify
npm run build
```
Then drag the `build/` folder to https://app.netlify.com/drop

### Option B: Via CLI
```bash
npm install -g netlify-cli
cd learnify
npm run build
netlify deploy --prod --dir=build
```

---

## 4. Deploy to GitHub Pages

```bash
# Add homepage to package.json first
npm install gh-pages --save-dev
```

Add to package.json:
```json
"homepage": "https://YOUR_USERNAME.github.io/learnify",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

---

## Notes
- User accounts are stored in browser localStorage (no backend needed)
- All data resets if localStorage is cleared
- To add a real backend later, replace AuthContext.js logic with API calls
