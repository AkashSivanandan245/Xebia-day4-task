#FOR TASK 2
# Learnify — Student Learning Platform
A React-based student learning platform with:
- **Login** module (with demo account hint)
- **Registration** module (with interest selection & validation)
- **Dashboard** (courses, progress, activity chart, upcoming sessions, achievements)

---

## 🔗 Live Demo
**[https://learnify-ten-umber.vercel.app/](https://learnify-ten-umber.vercel.app/)**

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
