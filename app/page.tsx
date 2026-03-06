'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Signal {
  id: string;
  type: 'thread' | 'poll' | 'industry' | 'confession' | 'career';
  title: string;
  trialPhase?: string;
  therapeuticArea?: string;
  urgency?: string;
  sameSituationCount?: number;
  commentCount?: number;
  helpfulVotes?: number;
  question?: string;
  source?: string;
  topic?: string;
  createdAt: string;
}

export default function HomePage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all signal types
    const fetchSignals = async () => {
      try {
        const [threadsRes, pollsRes, industryRes, confessionsRes, careerRes] = await Promise.all([
          fetch('/api/threads'),
          fetch('/api/polls'),
          fetch('/api/industry-signals'),
          fetch('/api/trial-confessions'),
          fetch('/api/career-discussions'),
        ]);

        const threads = await threadsRes.json();
        const polls = await pollsRes.json();
        const industry = await industryRes.json();
        const confessions = await confessionsRes.json();
        const career = await careerRes.json();

        // Transform threads
        const threadSignals = (threads || []).map((t: any) => ({
          id: t.id,
          type: 'thread' as const,
          title: t.title,
          trialPhase: t.trialPhase,
          therapeuticArea: t.therapeuticArea,
          urgency: t.urgencyLevel,
          sameSituationCount: t.sameSituationCount,
          commentCount: t._count?.replies || 0,
          createdAt: t.createdAt,
        }));

        // Transform polls
        const pollSignals = (polls || []).map((p: any) => ({
          id: p.id,
          type: 'poll' as const,
          title: p.question,
          trialPhase: p.trialPhase,
          therapeuticArea: p.therapeuticArea,
          createdAt: p.createdAt,
        }));

        // Transform industry signals
        const industrySignals = (industry || []).map((i: any) => ({
          id: i.id,
          type: 'industry' as const,
          title: i.title,
          source: i.source,
          therapeuticArea: i.therapeuticArea,
          trialPhase: i.trialPhase,
          createdAt: i.createdAt,
        }));

        // Transform confessions
        const confessionSignals = (confessions || []).map((c: any) => ({
          id: c.id,
          type: 'confession' as const,
          title: c.title,
          therapeuticArea: c.therapeuticArea,
          trialPhase: c.trialPhase,
          createdAt: c.createdAt,
        }));

        // Transform career discussions
        const careerSignals = (career || []).map((c: any) => ({
          id: c.id,
          type: 'career' as const,
          title: c.title,
          topic: c.topic,
          helpfulVotes: c.helpfulVotes,
          createdAt: c.createdAt,
        }));

        // Combine and sort by date
        const allSignals = [
          ...threadSignals,
          ...pollSignals,
          ...industrySignals,
          ...confessionSignals,
          ...careerSignals,
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setSignals(allSignals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching signals:', error);
        setLoading(false);
      }
    };

    fetchSignals();
  }, []);

  const getSignalTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      thread: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      poll: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      industry: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      confession: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      career: 'bg-green-500/10 text-green-400 border-green-500/20',
    };
    return colors[type] || colors.thread;
  };

  const getSignalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      thread: 'Assist',
      poll: 'Reality Check',
      industry: 'Industry Signal',
      confession: 'Confession',
      career: 'Career',
    };
    return labels[type] || type;
  };

  const getUrgencyColor = (urgency?: string) => {
    const colors: Record<string, string> = {
      Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      Urgent: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Needs Advice': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      Normal: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    };
    return colors[urgency || 'Normal'] || colors.Normal;
  };

  const getSignalLink = (signal: Signal) => {
    switch (signal.type) {
      case 'thread':
        return `/threads/${signal.id}`;
      case 'poll':
        return `/polls#${signal.id}`;
      case 'industry':
        return `/industry-signals`;
      case 'confession':
        return `/confessions`;
      case 'career':
        return `/career`;
      default:
        return '/';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
      {/* Header */}
      <header className='border-b border-cyan-500/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <Link href='/' className='text-xl font-bold text-cyan-400'>
              BehindTheProtocol
            </Link>
            <nav className='flex gap-6 items-center'>
              <Link href='/threads' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Threads
              </Link>
              <Link href='/polls' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Polls
              </Link>
              <Link href='/industry-signals' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Industry
              </Link>
              <Link href='/playbooks' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Playbooks
              </Link>
              <Link href='/confessions' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Confessions
              </Link>
              <Link href='/career' className='text-slate-300 hover:text-cyan-400 transition-colors'>
                Career
              </Link>
              <Link href='/privacy' className='flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20 hover:bg-green-500/20 transition-colors'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                Privacy Protected
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-white mb-4'>
            Signal Feed
          </h1>
          <p className='text-slate-400 text-xl'>
            Real-time operational intelligence from clinical trial operators
          </p>
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <div className='text-slate-400'>Loading signals...</div>
          </div>
        ) : signals.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-slate-400 mb-4'>No signals yet</div>
            <p className='text-slate-500'>
              Be the first to share an operational challenge or question
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {signals.map((signal) => (
              <Link
                key={signal.id}
                href={getSignalLink(signal)}
                className='glass-card rounded-lg p-6 border border-slate-500/20 hover:border-cyan-500/40 transition-all block'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-3'>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSignalTypeColor(signal.type)}`}>
                        {getSignalTypeLabel(signal.type)}
                      </span>
                      {signal.urgency && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(signal.urgency)}`}>
                          {signal.urgency}
                        </span>
                      )}
                      {signal.therapeuticArea && (
                        <span className='px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20'>
                          {signal.therapeuticArea}
                        </span>
                      )}
                      {signal.trialPhase && (
                        <span className='px-3 py-1 bg-slate-500/10 text-slate-300 rounded-full text-sm border border-slate-500/20'>
                          {signal.trialPhase}
                        </span>
                      )}
                    </div>

                    <h3 className='text-xl font-semibold text-white mb-2'>
                      {signal.title}
                    </h3>

                    <div className='flex items-center gap-6 text-sm text-slate-400'>
                      {signal.sameSituationCount !== undefined && signal.sameSituationCount > 0 && (
                        <span className='flex items-center gap-2'>
                          <span className='text-cyan-400 font-semibold'>{signal.sameSituationCount}</span>
                          experiencing this
                        </span>
                      )}
                      {signal.commentCount !== undefined && signal.commentCount > 0 && (
                        <span className='flex items-center gap-2'>
                          <span className='text-cyan-400 font-semibold'>{signal.commentCount}</span>
                          comments
                        </span>
                      )}
                      {signal.helpfulVotes !== undefined && signal.helpfulVotes > 0 && (
                        <span className='flex items-center gap-2'>
                          <span className='text-cyan-400 font-semibold'>{signal.helpfulVotes}</span>
                          helpful
                        </span>
                      )}
                      {signal.source && (
                        <span className='flex items-center gap-2'>
                          Source: <span className='text-amber-400'>{signal.source}</span>
                        </span>
                      )}
                      {signal.topic && (
                        <span className='flex items-center gap-2'>
                          Topic: <span className='text-green-400'>{signal.topic}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
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