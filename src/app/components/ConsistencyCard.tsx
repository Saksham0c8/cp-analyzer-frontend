import React from 'react';
import { motion } from 'motion/react';
import { Flame, Target, Award } from 'lucide-react';
import type { Consistency } from '../types/dashboard';

interface ConsistencyCardProps {
  consistency: Consistency;
}

export default function ConsistencyCard({ consistency }: ConsistencyCardProps) {
  const items = [
    {
      label: 'Active Days',
      value: consistency.activeDays,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Longest Streak',
      value: consistency.longestStreak,
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      label: 'Score',
      value: `${consistency.score.toFixed(0)}%`,
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Consistency</h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg ${item.bgColor} border ${item.borderColor}`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-slate-300">{item.label}</span>
            </div>
            <span className="text-xl font-bold text-white">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
