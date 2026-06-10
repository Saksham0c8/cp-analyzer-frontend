import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { leetcodeApi } from '../services/api';

export default function Onboarding() {
  const navigate = useNavigate();

  const {
    setLeetcodeUsername,
    isAuthenticated,
  } = useAuth();

  const [leetcodeUsernameInput, setLeetcodeUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedUsername = leetcodeUsernameInput.trim();

    if (!cleanedUsername) {
      alert('Please enter your LeetCode username');
      return;
    }

    setLoading(true);

    try {
      const appUsername = localStorage.getItem('appUsername');

      if (!appUsername) {
        throw new Error('App username not found');
      }

      await leetcodeApi.importRecent(
        appUsername,
        cleanedUsername
      );

      setLeetcodeUsername(cleanedUsername);

      navigate('/dashboard');
    } catch (error) {
      console.error('LeetCode import failed:', error);
      alert('Failed to import LeetCode data. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
          >
            <Code2 className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Connect Your LeetCode Account
          </h1>

          <p className="text-slate-400">
            Enter your LeetCode username to import your recent solved problems
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="leetcodeUsername"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                LeetCode Username
              </label>

              <input
                id="leetcodeUsername"
                type="text"
                required
                value={leetcodeUsernameInput}
                onChange={(e) =>
                  setLeetcodeUsernameInput(e.target.value)
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="Example: saksham_05"
              />

              <p className="mt-2 text-xs text-slate-500">
                We will import your recent accepted LeetCode submissions and analyze them.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Importing LeetCode Data...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Tip:</strong> Make sure your LeetCode profile is public.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}