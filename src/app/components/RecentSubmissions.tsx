import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
}

interface Props {
  recentSubmissions: {
    data?: {
      recentAcSubmissionList?: RecentSubmission[];
    };
  };
}

export default function RecentSubmissions({ recentSubmissions }: Props) {
  const submissions =
    recentSubmissions?.data?.recentAcSubmissionList || [];

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <Clock className="w-6 h-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Solved Problems
          </h2>
          <p className="text-slate-400 text-sm">
            Imported from your LeetCode accepted submissions
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <p className="text-slate-400">
          No recent solved problems found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {submissions.slice(0, 10).map((submission) => (
            <a
              key={submission.titleSlug}
              href={`https://leetcode.com/problems/${submission.titleSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div>
                <h3 className="text-white font-medium">
                  {submission.title}
                </h3>
                <p className="text-slate-500 text-xs">
                  LeetCode
                </p>
              </div>

              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}