import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award } from 'lucide-react';
import type { LeetCodeProfile } from '../types/dashboard';
import { formatNumber } from '../utils/helpers';

interface LeetCodeCardProps {
  profile: LeetCodeProfile;
}

export default function LeetCodeCard({ profile }: LeetCodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">LeetCode Profile</h2>
          <p className="text-sm text-slate-400">@{profile.username}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Ranking */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-300">Global Ranking</span>
          </div>
          <span className="text-white font-bold">#{formatNumber(profile.ranking)}</span>
        </div>

        {/* Total solved */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <span className="text-slate-300 font-medium">Total Solved</span>
          <span className="text-2xl font-bold text-white">{profile.totalSolved}</span>
        </div>

        {/* Difficulty breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-xs text-green-300 mb-1">Easy</p>
            <p className="text-xl font-bold text-white">{profile.easySolved}</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-300 mb-1">Medium</p>
            <p className="text-xl font-bold text-white">{profile.mediumSolved}</p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-300 mb-1">Hard</p>
            <p className="text-xl font-bold text-white">{profile.hardSolved}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}