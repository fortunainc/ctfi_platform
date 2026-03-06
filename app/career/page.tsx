'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CareerDiscussion {
  id: string;
  title: string;
  content: string;
  topic: string;
  helpfulVotes: number;
  user: {
    handle: string;
    reputationTier: string;
    badges: string[];
  };
}

export default function CareerDiscussionsPage() {
  const [discussions, setDiscussions] = useState<CareerDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const topics = [
    'Pushing back on sponsors',
    'Avoiding blame for protocol failures',
    'Handling CRO pressure',
    'Managing unrealistic expectations',
    'Site budget negotiations',
    'Career advancement',
  ];

  useEffect(() => {
    const url = selectedTopic
      ? `/api/career-discussions?topic=${encodeURIComponent(selectedTopic)}`
      : '/api/career-discussions';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDiscussions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching discussions:', error);
        setLoading(false);
      });
  }, [selectedTopic]);

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
              <Link href="/confessions" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Confessions
              </Link>
              <Link href="/career" className="text-cyan-400 font-semibold">
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
            Career Survival
          </h1>
          <p className="text-slate-400 text-lg">
            Dedicated section for operator career protection and professional guidance
          </p>
        </div>

        {/* Topic Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTopic('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTopic === ''
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Topics
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTopic === topic
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-400">Loading discussions...</div>
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No career discussions yet</div>
            <p className="text-slate-500">
              Share your career challenges and get advice from experienced operators
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="glass-card rounded-lg p-6 border border-green-500/20 hover:border-green-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                        {discussion.topic}
                      </span>
                      {discussion.user.badges.length > 0 && (
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm border border-amber-500/20">
                          {discussion.user.badges[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {discussion.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      By {discussion.user.handle} • {discussion.user.reputationTier}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">
                      {discussion.helpfulVotes}
                    </div>
                    <div className="text-slate-400 text-sm">Helpful</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-slate-200">{discussion.content}</p>
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