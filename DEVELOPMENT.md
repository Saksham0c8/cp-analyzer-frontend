# Development Guide

## Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/app/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── SummaryCards.tsx
│   ├── DifficultyChart.tsx
│   ├── TopicChart.tsx
│   ├── ActivityCard.tsx
│   ├── ConsistencyCard.tsx
│   ├── LeetCodeCard.tsx
│   ├── PerformanceCard.tsx
│   └── Recommendations.tsx
├── context/             # React Context providers
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Onboarding.tsx
│   └── Dashboard.tsx
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript types
│   └── dashboard.ts
├── utils/               # Utilities
│   ├── constants.ts
│   └── helpers.ts
├── routes.tsx           # Route configuration
└── App.tsx              # Root component
```

## Authentication Flow

```
User opens app
    ↓
Check localStorage for token
    ↓
No token → Redirect to /login
    ↓
Login/Register → Store JWT token
    ↓
Check for LeetCode username
    ↓
No username → Redirect to /onboarding
    ↓
Connect LeetCode → Store username
    ↓
Redirect to /dashboard
    ↓
Fetch analytics from API
    ↓
Display dashboard
```

## API Integration

### Base URL Configuration
Set in `.env`:
```
VITE_API_BASE_URL=http://localhost:8080
```

### Endpoints Used

**Authentication**
- `POST /auth/register` - User registration
  - Request: `{ fullName, username, email, password }`
  - Response: `{ token, username }`

- `POST /auth/login` - User login
  - Request: `{ username, password }`
  - Response: `{ token, username }`

**Dashboard**
- `GET /dashboard/{appUsername}/{leetcodeUsername}` - Fetch analytics
  - Headers: `Authorization: Bearer {token}`
  - Response: See `types/dashboard.ts` for complete structure

### API Service (`services/api.ts`)

The API service uses Axios with interceptors for:
- Automatic JWT token injection
- 401 error handling (auto logout)
- Base URL configuration

Example usage:
```typescript
import { authApi, dashboardApi } from './services/api';

// Login
const response = await authApi.login({ username, password });

// Get dashboard
const data = await dashboardApi.getDashboard(appUsername, leetcodeUsername);
```

## State Management

### AuthContext
Global authentication state using React Context:
```typescript
const {
  token,              // JWT token
  appUsername,        // App username
  leetcodeUsername,   // LeetCode username
  setAuth,            // Set auth credentials
  setLeetcodeUsername,// Set LeetCode username
  logout,             // Clear all auth data
  isAuthenticated,    // Boolean auth status
} = useAuth();
```

### Local Storage
The app stores three items:
- `token` - JWT authentication token
- `appUsername` - User's app username
- `leetcodeUsername` - User's LeetCode username

## Styling

### Dark Mode
The app uses dark mode exclusively with:
- Background: `bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950`
- Cards: Glassmorphism with `backdrop-blur-xl bg-white/5`
- Borders: `border border-white/10`

### Design Tokens
- **Primary gradient**: Blue to Purple (`from-blue-500 to-purple-600`)
- **Success**: Green (`green-500`)
- **Warning**: Yellow (`yellow-500`)
- **Error**: Red (`red-500`)

### Animations
Using Motion (Framer Motion):
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Components

### Dashboard Components

1. **Navbar** - Top navigation with logo and logout
2. **SummaryCards** - 4 key metrics in cards
3. **LeetCodeCard** - Profile info and stats
4. **DifficultyChart** - Pie chart of problem difficulty
5. **TopicChart** - Bar chart of topic strengths
6. **ActivityCard** - Activity over time periods
7. **ConsistencyCard** - Streak and consistency metrics
8. **PerformanceCard** - Strong/weak topics analysis
9. **Recommendations** - Suggested problems

## Error Handling

### API Errors
All API calls include try-catch blocks:
```typescript
try {
  const response = await authApi.login(data);
  // Success
} catch (err: any) {
  setError(err.response?.data?.message || 'Default error message');
}
```

### Protected Routes
Dashboard checks for authentication:
```typescript
useEffect(() => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }
  if (!leetcodeUsername) {
    navigate('/onboarding');
    return;
  }
}, [isAuthenticated, leetcodeUsername]);
```

## Utilities

### Helpers (`utils/helpers.ts`)
- `formatNumber()` - Add commas to numbers
- `calculatePercentage()` - Calculate percentage
- `getDifficultyColor()` - Get badge colors
- `getSkillLevelColor()` - Get skill level colors
- `formatDate()` - Format dates
- `debounce()` - Debounce function calls

### Constants (`utils/constants.ts`)
- `DIFFICULTY_COLORS` - Color mappings for difficulty levels
- `PLATFORM_COLORS` - Color mappings for platforms
- `STORAGE_KEYS` - localStorage key constants
- `ROUTES` - Route path constants

## Charts

### Using Recharts

**Pie Chart** (Difficulty Distribution)
```typescript
<PieChart>
  <Pie data={data} dataKey="value" />
  <Tooltip />
  <Legend />
</PieChart>
```

**Bar Chart** (Topic Analysis)
```typescript
<BarChart data={data}>
  <CartesianGrid />
  <XAxis dataKey="topic" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="accuracy" fill="url(#colorAccuracy)" />
</BarChart>
```

## Development Tips

1. **Hot Module Replacement** - Changes reflect instantly
2. **TypeScript** - Use types from `types/dashboard.ts`
3. **API Mock** - Backend must be running or use mock responses
4. **Environment Variables** - Use `import.meta.env.VITE_*`
5. **Debugging** - React DevTools and Network tab

## Common Tasks

### Adding a New Page
1. Create component in `pages/`
2. Add route in `routes.tsx`
3. Add navigation link if needed

### Adding a New Component
1. Create component in `components/`
2. Import in parent component
3. Pass required props with TypeScript types

### Adding a New API Endpoint
1. Add type to `types/dashboard.ts`
2. Add function to `services/api.ts`
3. Use in component with error handling

### Modifying Styles
- Use Tailwind utility classes
- Custom styles in `styles/theme.css`
- Gradients and glassmorphism for consistency

## Build & Deploy

### Production Build
```bash
pnpm build
```

Output in `dist/` directory.

### Preview Build
```bash
pnpm preview
```

### Environment Variables
Set `VITE_API_BASE_URL` to production API URL in deployment environment.

## Troubleshooting

### API Connection Issues
- Check `.env` has correct `VITE_API_BASE_URL`
- Verify backend is running
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check JWT token is valid
- Verify API returns correct token format

### Route Issues
- Check React Router configuration
- Verify protected route logic
- Check browser console for navigation errors
