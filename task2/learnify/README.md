# Learnify — Student Learning Platform

A React-based student learning platform with:
- **Login** module (with demo account hint)
- **Registration** module (with interest selection & validation)
- **Dashboard** (courses, progress, activity chart, upcoming sessions, achievements)

---

## 🚀 Quick Start (Local)

### Prerequisites
Make sure you have **Node.js 16+** installed: https://nodejs.org

### Steps

```bash
# 1. Enter the project folder
cd learnify

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

**Demo login:** `demo@learnify.com` / `demo1234`

---

## 🏗 Build for Production

```bash
npm run build
```

This creates a `build/` folder with optimized static files, ready to deploy anywhere.

---

## ☁️ Deploy to Vercel (Recommended — Free)

1. Go to https://vercel.com and sign up with GitHub
2. Push this folder to a GitHub repository
3. Click **"New Project"** in Vercel → import your repo
4. Leave all settings as default → click **Deploy**
5. Your app will be live at `https://your-project.vercel.app` in ~1 minute

---

## ☁️ Deploy to Netlify (Free)

### Option A — Drag & Drop
1. Run `npm run build` locally
2. Go to https://netlify.com → **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `build/` folder
4. Done! Your site is live instantly.

### Option B — From GitHub
1. Push project to GitHub
2. Go to Netlify → **"Add new site"** → **"Import from Git"**
3. Select your repo → Build command: `npm run build`, Publish dir: `build`
4. Click **Deploy**

---

## ☁️ Deploy to GitHub Pages (Free)

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json "scripts":
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d build"
# Also add: "homepage": "https://YOUR_USERNAME.github.io/learnify"

# 3. Deploy
npm run deploy
```

---

## 📁 Project Structure

```
learnify/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── components/
│   │   └── AuthLayout.jsx  # Shared auth page wrapper
│   ├── pages/
│   │   ├── Login.jsx       # Login module
│   │   ├── Register.jsx    # Registration module
│   │   └── Dashboard.jsx   # Main dashboard
│   ├── App.jsx             # Root component + routing
│   ├── index.js            # React entry point
│   └── index.css           # Global styles & design tokens
└── package.json
```

---

## 🔧 Customization

- **Colors**: Edit CSS variables in `src/index.css` under `:root`
- **Courses data**: Edit the `COURSES` array in `src/pages/Dashboard.jsx`
- **Add real auth**: Replace the in-memory `users` array in `App.jsx` with API calls
- **Add routing**: Install `react-router-dom` for URL-based navigation
