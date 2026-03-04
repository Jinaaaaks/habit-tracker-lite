# 🌿 Habit Tracker Lite

A clean, minimal habit tracker built with React + Vite. Track your daily habits, build streaks, add notes to your check-ins, and visualise your progress with a 7-day heatmap — all saved locally in your browser.

![Habit Tracker Lite](public/bg.jpg)

---

## ✨ Features

- **Daily check-ins** — check off habits each day with one click
- **Optional notes** — add a quick note when you check in (e.g. "ran 3km", "read before bed")
- **Streak tracking** — see your current streak and all-time best streak per habit
- **Habit categories** — tag habits as Health, Study, Mindset, or Other and filter by them
- **7-day heatmap** — visualise which days you checked in, per habit, on the Stats page
- **Stats summary** — total check-ins, best streak, and average completion rate across all habits
- **Progress bar** — shows how many habits you've completed today at a glance
- **LocalStorage persistence** — your data stays saved even after closing the tab, no account needed

---

## 📸 Pages

**Today** — your habit list for the day. Add habits, check them off, filter by category, and see your streaks.

**Stats** — your overall numbers plus a per-habit breakdown with a 7-day heatmap for each habit.

---

## 🛠️ Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- LocalStorage for persistence
- CSS with glassmorphism design — no UI library used

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Jinaaaaks/habit-tracker-lite.git

# 2. Go into the project folder
cd habit-tracker-lite

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open localhost in your browser.

---

## 📦 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Builds and deploys to GitHub Pages |
| `npm run lint` | Runs ESLint across the project |

---

## 🗂️ Project Structure

```
habit-tracker-lite/
├── public/
│   └── bg.jpg              # Background image
├── src/
│   ├── components/
│   │   └── Nav.jsx         # Navigation bar
│   ├── pages/
│   │   ├── Home.jsx        # Today's habits page
│   │   └── Stats.jsx       # Stats and heatmap page
│   ├── App.jsx             # Root component with routing
│   ├── main.jsx            # Entry point
│   ├── useHabits.js        # Custom hook — all habit logic and localStorage
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🧠 How It Works

All habit logic lives in a single custom React hook — `useHabits.js`. This hook handles:

- Reading and writing habits to `localStorage` so data persists across sessions
- Adding and deleting habits
- Toggling daily check-ins (stored as `{ date, note }` objects)
- Calculating current streak, best streak, and completion rate per habit
- Building the last 7 days of check-in data for the heatmap

Both `Home.jsx` and `Stats.jsx` call `useHabits()` to get the data they need — the hook is the single source of truth.

---

## 🌍 Deployment

This project is configured for GitHub Pages. To deploy:

```bash
npm run deploy
```

Your app will be live at:
```
https://YOUR_USERNAME.github.io/habit-tracker-lite/
```

> Make sure the `base` in `vite.config.js` matches your repository name exactly.

---

## 📝 Git History

This project was built commit by commit, one feature at a time:

```
feat: add 7-day heatmap to stats page
feat: add habit categories with filtering
feat: add optional notes to daily check-in
chore: add gh-pages deploy script to package.json
chore: configure vite base path for GitHub Pages
feat: add progress bar and today's completion banner
feat: add per-habit breakdown on Stats page
feat: add Stats page with overall summary numbers
feat: add streak tracking display to habit cards
feat: add add-habit form with keyboard support
feat: add Home page with habit list and check-in
feat: add Nav component with Today and Stats routes
feat: add useHabits custom hook with localStorage persistence
feat: add global CSS with background image and glass design system
feat: initial project setup with Vite + React
```

---

## 📄 License

MIT License — feel free to use, modify, and distribute.