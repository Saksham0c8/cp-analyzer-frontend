import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, ExternalLink } from 'lucide-react';
import type { Recommendations as RecommendationsType } from '../types/dashboard';
import { getDifficultyColor } from '../utils/helpers';

interface RecommendationsProps {
  recommendations: RecommendationsType;
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Recommended Problems</h2>
          <p className="text-sm text-slate-400">Curated for your skill improvement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {recommendations.recommendedProblems.map((problem, index) => (
          <motion.div
            key={`${problem.title}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                  {problem.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-1 rounded-md border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {problem.topic}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {problem.platform}
                  </span>
                </div>
              </div>
              <button className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all flex items-center gap-2 opacity-0 group-hover:opacity-100">
                Solve
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {recommendations.recommendedProblems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">No recommendations available at the moment</p>
        </div>
      )}
    </motion.div>
  );
}