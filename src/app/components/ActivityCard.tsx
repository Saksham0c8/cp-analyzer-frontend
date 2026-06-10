import React from 'react';
import { motion } from 'motion/react';
import { Activity, Calendar } from 'lucide-react';
import type { ActivityStats } from '../types/dashboard';

interface ActivityCardProps {
  activityStats: ActivityStats;
}

export default function ActivityCard({ activityStats }: ActivityCardProps) {
  const stats = [
    {
      label: 'Active Days',
      value: activityStats.activeDays,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Last 7 Days',
      value: activityStats.last7Days,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Last 30 Days',
      value: activityStats.last30Days,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Activity Stats</h2>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="h-2 rounded-full bg-white/5 overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stat.value / 30) * 100, 100)}%` }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
