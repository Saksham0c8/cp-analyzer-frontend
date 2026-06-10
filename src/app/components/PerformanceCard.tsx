import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Analytics } from '../types/dashboard';

interface PerformanceCardProps {
  analytics: Analytics;
}

export default function PerformanceCard({ analytics }: PerformanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Performance Insights</h2>

      <div className="space-y-4">
        {/* Strongest Topic */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-300 mb-1">Strongest Topic</p>
              <p className="text-xl font-bold text-white">{analytics.strongestTopic}</p>
              {analytics.topicStrength[analytics.strongestTopic] && (
                <p className="text-sm text-slate-400 mt-2">
                  {analytics.topicStrength[analytics.strongestTopic].solved} solved with{' '}
                  {analytics.topicStrength[analytics.strongestTopic].accuracy.toFixed(1)}% accuracy
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Weakest Topic */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-red-300 mb-1">Needs Improvement</p>
              <p className="text-xl font-bold text-white">{analytics.weakestTopic}</p>
              <p className="text-sm text-slate-400 mt-2">Focus on this topic to improve your overall performance</p>
            </div>
          </div>
        </div>

        {/* Skill Level */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Current Skill Level</p>
              <p className="text-2xl font-bold text-white">{analytics.skillLevel}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 mb-1">Weak Topics</p>
              <div className="flex flex-wrap gap-1 justify-end">
                {analytics.weakTopics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 rounded-md bg-white/10 text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
