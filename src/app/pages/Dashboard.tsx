import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dashboardApi } from '../services/api';
import type { DashboardResponse } from '../types/dashboard';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import LeetCodeCard from '../components/LeetCodeCard';
import DifficultyChart from '../components/DifficultyChart';
import TopicChart from '../components/TopicChart';
import ActivityCard from '../components/ActivityCard';
import ConsistencyCard from '../components/ConsistencyCard';
import PerformanceCard from '../components/PerformanceCard';
import Recommendations from '../components/Recommendations';
import RecentSubmissions from '../components/RecentSubmissions';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, appUsername, leetcodeUsername } = useAuth();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!leetcodeUsername) {
      navigate('/onboarding');
      return;
    }

    fetchDashboard();
  }, [isAuthenticated, appUsername, leetcodeUsername, navigate]);

  const fetchDashboard = async () => {
    if (!appUsername || !leetcodeUsername) return;

    setLoading(true);
    setError('');

    try {
      const response = await dashboardApi.getDashboard(appUsername, leetcodeUsername);
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Loading your analytics...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Dashboard</h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <button
              onClick={fetchDashboard}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{appUsername}</span>!
          </h1>
          <p className="text-slate-400 text-lg">
            You are currently at {data.analytics.skillLevel} level.
            You have imported {data.analytics.totalSubmissions} recent solved problems.
            Your strongest recent topic is {data.analytics.strongestTopic}.
            Your consistency score is {data.analytics.consistencyScore.toFixed(0)}%.
            Keep the streak going.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards analytics={data.analytics} />
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* LeetCode Profile */}
          <div className="lg:col-span-1">
            <LeetCodeCard profile={data.leetcode} />
          </div>

          {/* Difficulty Chart */}
          <div className="lg:col-span-2">
            <DifficultyChart
              difficultyStats={{
                EASY: data.leetcode.easySolved,
                MEDIUM: data.leetcode.mediumSolved,
                HARD: data.leetcode.hardSolved,
              }}
            />
          </div>
        </div>

        {/* Topic Chart - Full width */}
        <div className="mb-8">
          <TopicChart topicStrength={data.analytics.topicStrength} />
        </div>

        {/* Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <ActivityCard activityStats={data.analytics.activityStats} />
          <ConsistencyCard consistency={data.analytics.consistency} />
          <PerformanceCard analytics={data.analytics} />
        </div>



        {/* Recommendations */}

        <div className="mb-8">
          <RecentSubmissions recentSubmissions={data.recentSubmissions} />
        </div>
        <div>
          <Recommendations recommendations={data.recommendations} />
        </div>
      </main>
    </div>
  );
}
