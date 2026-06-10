export interface DashboardResponse {
  analytics: Analytics;
  codeforces: any;
  leetcode: LeetCodeProfile;
  recommendations: Recommendations;
  summary: string;
}
recentSubmissions: {
  data?: {
    recentAcSubmissionList?: {
      title: string;
      titleSlug: string;
      timestamp: string;
    }[];
  };
};

export interface Analytics {
  totalSubmissions: number;
  acceptedSubmissions: number;
  accuracy: number;
  difficultyStats: DifficultyStats;
  topicStats: Record<string, any>;
  activityStats: ActivityStats;
  consistency: Consistency;
  consistencyScore: number;
  improvementArea: string;
  skillLevel: string;
  strongestTopic: string;
  topicStrength: Record<string, TopicStrength>;
  weakTopics: string[];
  weakestTopic: string;
}

export interface DifficultyStats {
  EASY: number;
  MEDIUM: number;
  HARD: number;
}

export interface ActivityStats {
  last7Days: number;
  last30Days: number;
  activeDays: number;
}

export interface Consistency {
  activeDays: number;
  longestStreak: number;
  score: number;
}

export interface TopicStrength {
  attempted: number;
  solved: number;
  accuracy: number;
}

export interface LeetCodeProfile {
  easySolved: number;
  hardSolved: number;
  mediumSolved: number;
  ranking: number;
  totalSolved: number;
  username: string;
}

export interface Recommendations {
  recommendedProblems: RecommendedProblem[];
}

export interface RecommendedProblem {
  title: string;
  difficulty: string;
  topic: string;
  platform: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}
