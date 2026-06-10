# Quick Start Guide

Get your Competitive Programming Analyzer up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm installed (recommended) or npm
- Backend API running (see Backend Setup)

## Installation Steps

### 1. Clone and Install

```bash
# Install dependencies
pnpm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and set your backend API URL
# VITE_API_BASE_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
pnpm dev
```

The app will open at `http://localhost:5173`

## First Time Setup

### 1. Create an Account
- Open the app in your browser
- Click "Create Account" on the login page
- Fill in your details:
  - Full Name
  - Username
  - Email
  - Password
- Click "Create Account"

### 2. Connect LeetCode
- After registration, you'll be redirected to the onboarding page
- Enter your LeetCode username
- Click "Continue"

### 3. View Your Dashboard
- You'll be redirected to your personalized dashboard
- The app will fetch your analytics from the backend
- Explore your stats, charts, and recommendations!

## What You'll See

### Dashboard Components

1. **Summary Cards** - Quick stats at a glance
   - Total Submissions
   - Accepted Submissions
   - Accuracy Percentage
   - Consistency Score

2. **LeetCode Profile** - Your LeetCode stats
   - Global Ranking
   - Total Problems Solved
   - Easy/Medium/Hard breakdown

3. **Difficulty Distribution** - Visual pie chart
   - Problems by difficulty level

4. **Topic Analysis** - Bar chart
   - Your performance across topics

5. **Activity Stats** - Coding activity
   - Last 7 days
   - Last 30 days
   - Total active days

6. **Consistency Metrics**
   - Active days count
   - Longest streak
   - Consistency score

7. **Performance Insights**
   - Strongest topic
   - Areas needing improvement
   - Current skill level

8. **Recommended Problems**
   - Personalized problem suggestions
   - Difficulty and topic labels

## Common Issues & Solutions

### Issue: "Failed to load dashboard"

**Solution:**
- Verify backend API is running
- Check `.env` has correct `VITE_API_BASE_URL`
- Verify your LeetCode username is correct
- Check browser console for detailed errors

### Issue: "Login failed"

**Solution:**
- Verify backend API is running on correct port
- Check credentials are correct
- Try registering a new account
- Check backend logs for errors

### Issue: "Cannot connect to API"

**Solution:**
- Ensure backend is running: `http://localhost:8080`
- Check for CORS errors in browser console
- Verify backend CORS configuration allows frontend origin
- Test backend endpoints with curl/Postman

### Issue: Charts not displaying

**Solution:**
- Wait for data to load completely
- Check if backend returns proper data format
- Verify browser supports SVG rendering
- Check browser console for JavaScript errors

## Backend Setup

If you don't have the backend running yet, you need to:

1. Clone the backend repository
2. Install backend dependencies
3. Configure database connection
4. Start the backend server on port 8080
5. Verify endpoints with API_REFERENCE.md

## Directory Structure

```
competitive-programming-analyzer/
├── src/
│   ├── app/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context
│   │   ├── services/       # API calls
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utilities
│   └── styles/             # Global styles
├── .env                    # Environment config
├── README.md              # Full documentation
├── API_REFERENCE.md       # API docs
└── DEVELOPMENT.md         # Dev guide
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm tsc --noEmit
```

## Testing the App

### 1. Test Registration
- Go to `/register`
- Fill in all fields
- Submit and verify redirect to onboarding

### 2. Test Login
- Go to `/login`
- Enter credentials
- Verify redirect to dashboard (if LeetCode connected) or onboarding

### 3. Test Onboarding
- Should only be accessible when logged in
- Enter a LeetCode username
- Verify redirect to dashboard

### 4. Test Dashboard
- Should display all sections
- Check for loading states
- Verify charts render correctly
- Test logout button

### 5. Test Protected Routes
- Try accessing `/dashboard` without login
- Should redirect to `/login`
- Try accessing `/onboarding` without LeetCode username
- Verify redirects work correctly

## Production Deployment

### Build the App
```bash
pnpm build
```

### Deploy the `dist/` folder to:
- **Vercel** - Zero config deployment
- **Netlify** - Drag and drop or Git integration
- **AWS S3 + CloudFront** - Scalable hosting
- **DigitalOcean App Platform** - Simple deployment
- **Any static hosting service**

### Environment Variables in Production
Set `VITE_API_BASE_URL` to your production API URL:
```
VITE_API_BASE_URL=https://api.yourapp.com
```

## Next Steps

1. ✅ App is running
2. ✅ Connected to backend
3. ✅ Created account
4. ✅ Viewing dashboard

**What's next?**
- Customize the UI colors and styles
- Add more features (compare users, leaderboards)
- Integrate Codeforces data
- Add data export functionality
- Implement dark/light theme toggle

## Getting Help

- 📖 Read the full **README.md**
- 🔧 Check **DEVELOPMENT.md** for dev details
- 📡 Review **API_REFERENCE.md** for API docs
- 🐛 Check browser console for errors
- 📝 Review backend logs for API issues

## Useful Links

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts Docs](https://recharts.org)
- [Axios Docs](https://axios-http.com)
- [React Router](https://reactrouter.com)

---

**Happy Coding! 🚀**
