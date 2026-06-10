import React from 'react';
import { motion } from 'motion/react';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 h-32" />
        ))}
      </div>

      {/* Two column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 h-96" />
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 h-96" />
      </div>

      {/* Full width skeleton */}
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 h-96" />

      {/* Three column skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 h-64" />
        ))}
      </div>
    </div>
  );
}
