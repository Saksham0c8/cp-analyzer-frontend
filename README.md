# Competitive Programming Analyzer (CPA)

A modern React + TypeScript + Tailwind CSS frontend for analyzing competitive programming performance from LeetCode.

## Features

- 🔐 **Authentication System** - Secure login and registration
- 📊 **Comprehensive Analytics** - Track submissions, accuracy, and consistency
- 🎯 **Topic Analysis** - Identify strengths and weaknesses across different topics
- 📈 **Visual Charts** - Difficulty distribution pie chart and topic strength bar chart
- 🔥 **Activity Tracking** - Monitor daily activity and streaks
- 💡 **Smart Recommendations** - Get personalized problem recommendations
- 🎨 **Modern UI** - Dark mode with glassmorphism design and smooth animations

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **Motion (Framer Motion)** - Smooth animations

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API running (see API Configuration)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Replace with your backend API URL.

## Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:

```bash
pnpm build
# or
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── DifficultyChart.tsx
│   │   ├── TopicChart.tsx
│   │   ├── ActivityCard.tsx
│   │   ├── ConsistencyCard.tsx
│   │   ├── LeetCodeCard.tsx
│   │   ├── PerformanceCard.tsx
│   │   └── Recommendations.tsx
│   ├── context/             # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/               # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Onboarding.tsx
│   │   └── Dashboard.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── dashboard.ts
│   ├── routes.tsx           # Route configuration
│   └── App.tsx              # Root component
└── styles/                  # Global styles
    ├── theme.css
    └── index.css
```

## API Endpoints

The frontend expects the following backend endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Dashboard
- `GET /dashboard/{appUsername}/{leetcodeUsername}` - Fetch user analytics

## Authentication Flow

1. **Login/Register** - User authenticates with username and password
2. **JWT Token** - Token stored in localStorage
3. **Onboarding** - User connects LeetCode username
4. **Dashboard** - Protected route showing analytics

## Protected Routes

The dashboard route is protected and requires:
- Valid JWT token in localStorage
- App username stored
- LeetCode username configured

If any requirement is missing, user is redirected to the appropriate page.

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:8080)

## Design System

- **Dark Mode Only** - Optimized for dark environments
- **Glassmorphism** - Frosted glass effect on cards
- **Blue-Purple Gradient** - Accent colors throughout
- **Responsive Layout** - Works on all screen sizes
- **Smooth Animations** - Motion-based transitions

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
