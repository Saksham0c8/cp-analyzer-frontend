import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, FileText, Target, TrendingUp } from 'lucide-react';
import type { Analytics } from '../types/dashboard';

interface SummaryCardsProps {
  analytics: Analytics;
}

export default function SummaryCards({ analytics }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Recent Imported Solves',
      value: analytics.totalSubmissions,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Accepted Solves',
      value: analytics.acceptedSubmissions,
      icon: CheckCircle2,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Recent Solves',
      value: analytics.acceptedSubmissions,
      icon: Target,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Consistency Score',
      value: `${analytics.consistencyScore.toFixed(0)}%`,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="text-slate-400 text-sm mb-1">
            {card.title}
          </h3>

          <p className="text-3xl font-bold text-white">
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}