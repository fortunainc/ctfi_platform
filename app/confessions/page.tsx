'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TrialConfession {
  id: string;
  title: string;
  content: string;
  therapeuticArea: string | null;
  trialPhase: string | null;
  user: {
    handle: string;
  };
}

export default function TrialConfessionsPage() {
  const [confessions, setConfessions] = useState<TrialConfession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trial-confessions')
      .then((res) => res.json())
      .then((data) => {
        setConfessions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching confessions:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-cyan-500/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-cyan-400">
              BehindTheProtocol
            </Link>
            <nav className="flex gap-6">
              <Link href="/threads" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Threads
              </Link>
              <Link href="/polls" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Polls
              </Link>
              <Link href="/confessions" className="text-cyan-400 font-semibold">
                Confessions
              </Link>
              <Link href="/career" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Career
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Trial Confessions
          </h1>
          <p className="text-slate-400 text-lg mb-6">
            Anonymous stories revealing the hidden realities of clinical trial operations
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <p className="text-amber-400 text-sm">
              <strong>Note:</strong> All confessions are moderated and anonymous. No sponsor names, company names, or accusations are allowed.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Loading confessions...</div>
          </div>
        ) : confessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No confessions yet</div>
            <p className="text-slate-500">
              Share your story anonymously. Others may be going through the same experience.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {confessions.map((confession) => (
              <div
                key={confession.id}
                className="glass-card rounded-lg p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium border border-amber-500/20">
                        Anonymous
                      </span>
                      {confession.therapeuticArea && (
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                          {confession.therapeuticArea}
                        </span>
                      )}
                      {confession.trialPhase && (
                        <span className="px-3 py-1 bg-slate-500/10 text-slate-300 rounded-full text-sm border border-slate-500/20">
                          {confession.trialPhase}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {confession.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      By {confession.user.handle}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <p className="text-slate-200 text-lg leading-relaxed">
                    &quot;{confession.content}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
}