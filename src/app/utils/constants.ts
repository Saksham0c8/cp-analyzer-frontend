export const DIFFICULTY_COLORS = {
  EASY: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    solid: '#10b981',
  },
  MEDIUM: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/20',
    solid: '#f59e0b',
  },
  HARD: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20',
    solid: '#ef4444',
  },
} as const;

export const PLATFORM_COLORS = {
  LEETCODE: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  CODEFORCES: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  APP_USERNAME: 'appUsername',
  LEETCODE_USERNAME: 'leetcodeUsername',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
} as const;
