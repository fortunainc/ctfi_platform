'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OperatorPlaybook {
  id: string;
  title: string;
  situationDescription: string;
  warningSigns: string[];
  escalationSteps: string[];
  escalationLanguage: string;
  lessonsLearned: string;
  therapeuticArea: string;
  trialPhase: string | null;
  user: {
    handle: string;
    reputationTier: string;
  };
}

export default function OperatorPlaybooksPage() {
  const [playbooks, setPlaybooks] = useState<OperatorPlaybook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/operator-playbooks')
      .then((res) => res.json())
      .then((data) => {
        setPlaybooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching playbooks:', error);
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
              <Link href="/industry-signals" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Industry Signals
              </Link>
              <Link href="/playbooks" className="text-cyan-400 font-semibold">
                Playbooks
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Operator Playbooks
          </h1>
          <p className="text-slate-400 text-lg">
            Structured knowledge from high-value discussions and operator experiences
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Loading playbooks...</div>
          </div>
        ) : playbooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No playbooks yet</div>
            <p className="text-slate-500">
              High-value threads are converted into playbooks to preserve operational knowledge
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {playbooks.map((playbook) => (
              <div
                key={playbook.id}
                className="glass-card rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                        {playbook.therapeuticArea}
                      </span>
                      {playbook.trialPhase && (
                        <span className="px-3 py-1 bg-slate-500/10 text-slate-300 rounded-full text-sm border border-slate-500/20">
                          {playbook.trialPhase}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {playbook.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      By {playbook.user.handle} • {playbook.user.reputationTier}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Situation Description */}
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">Situation</h4>
                    <p className="text-white">{playbook.situationDescription}</p>
                  </div>

                  {/* Warning Signs */}
                  <div className="bg-rose-500/5 rounded-lg p-4 border border-rose-500/20">
                    <h4 className="text-rose-400 font-semibold mb-3">Warning Signs</h4>
                    <ul className="space-y-2">
                      {playbook.warningSigns.map((sign, index) => (
                        <li key={index} className="text-slate-300 flex items-start">
                          <span className="text-rose-400 mr-2">•</span>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Escalation Steps */}
                  <div className="bg-cyan-500/5 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-semibold mb-3">Escalation Steps</h4>
                    <ol className="space-y-2">
                      {playbook.escalationSteps.map((step, index) => (
                        <li key={index} className="text-slate-300 flex items-start">
                          <span className="text-cyan-400 mr-2 font-semibold">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Example Language */}
                  {playbook.escalationLanguage && (
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-purple-400 font-semibold mb-2">Example Escalation Language</h4>
                      <p className="text-slate-300 italic">{playbook.escalationLanguage}</p>
                    </div>
                  )}

                  {/* Lessons Learned */}
                  <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                    <h4 className="text-green-400 font-semibold mb-2">Lessons Learned</h4>
                    <p className="text-slate-300">{playbook.lessonsLearned}</p>
                  </div>
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