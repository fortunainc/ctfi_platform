'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface IndustrySignal {
  id: string;
  title: string;
  source: string;
  sourceUrl: string | null;
  eventDate: string;
  question: string;
  therapeuticArea: string | null;
  trialPhase: string | null;
}

export default function IndustrySignalsPage() {
  const [signals, setSignals] = useState<IndustrySignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/industry-signals')
      .then((res) => res.json())
      .then((data) => {
        setSignals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching signals:', error);
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
              <Link href="/industry-signals" className="text-cyan-400 font-semibold">
                Industry Signals
              </Link>
              <Link href="/playbooks" className="text-slate-300 hover:text-cyan-400 transition-colors">
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
            Industry Signals
          </h1>
          <p className="text-slate-400 text-lg">
            Discussions triggered by public industry events and regulatory actions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Loading industry signals...</div>
          </div>
        ) : signals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No industry signals yet</div>
            <p className="text-slate-500">
              Industry signals are created based on FDA warning letters, EMA reports, and other regulatory events
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className="glass-card rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
                        {signal.source}
                      </span>
                      {signal.therapeuticArea && (
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                          {signal.therapeuticArea}
                        </span>
                      )}
                      {signal.trialPhase && (
                        <span className="px-3 py-1 bg-slate-500/10 text-slate-300 rounded-full text-sm border border-slate-500/20">
                          {signal.trialPhase}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {signal.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Event Date: {new Date(signal.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <p className="text-white font-medium">
                    {signal.question}
                  </p>
                </div>

                {signal.sourceUrl && (
                  <div className="mt-4">
                    <a
                      href={signal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      View Source →
                    </a>
                  </div>
                )}
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