import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';
import type { Analytics } from '../types/dashboard';

interface TopicChartProps {
  topicStrength: Analytics['topicStrength'];
}

export default function TopicChart({ topicStrength }: TopicChartProps) {
  const data = Object.entries(topicStrength).map(([topic, stats]) => ({
    topic,
    accuracy: stats.accuracy,
    solved: stats.solved,
    attempted: stats.attempted,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Topic Analysis</h2>
      </div>

      {data.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="topic"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'accuracy') return [`${value.toFixed(1)}%`, 'Accuracy'];
                  if (name === 'solved') return [value, 'Solved'];
                  if (name === 'attempted') return [value, 'Attempted'];
                  return [value, name];
                }}
              />
              <Bar dataKey="accuracy" fill="url(#colorAccuracy)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <p className="text-slate-400">No topic data available yet</p>
        </div>
      )}
    </motion.div>
  );
}
