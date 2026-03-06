import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/polls - List polls
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const active = searchParams.get('active') === 'true';
    
    const where: any = {};
    
    // Filter for active polls if requested
    if (active) {
      where.expiresAt = {
        gt: new Date()
      };
    }
    
    const polls = await prisma.poll.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: {
            pollVotes: true,
          }
        }
      }
    });
    
    // Get vote counts for each option
    const pollsWithResults = await Promise.all(
      polls.map(async (poll) => {
        const votes = await prisma.pollVote.groupBy({
          by: ['selectedOption'],
          where: { pollId: poll.id },
          _count: true,
        });
        
        const totalVotes = votes.reduce((sum, v) => sum + v._count, 0);
        
        // Parse options and add vote counts
        const options = (poll.options as string[]).map((option) => {
          const voteCount = votes.find(v => v.selectedOption === option)?._count || 0;
          return {
            label: option,
            votes: voteCount,
            percentage: totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0,
          };
        });
        
        return {
          id: poll.id,
          question: poll.question,
          trialPhase: poll.trialPhase,
          therapeuticArea: poll.therapeuticArea,
          duration: poll.duration,
          expiresAt: poll.expiresAt,
          createdAt: poll.createdAt,
          options,
          totalVotes,
        };
      })
    );
    
    return NextResponse.json(pollsWithResults);
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      question,
      trialPhase,
      therapeuticArea,
      options,
      duration,
    } = body;
    
    // Calculate expiration based on duration
    const durationMap: Record<number, number> = {
      24: 24 * 60 * 60 * 1000,
      48: 48 * 60 * 60 * 1000,
      72: 72 * 60 * 60 * 1000,
      168: 7 * 24 * 60 * 60 * 1000, // 1 week
    };
    
    const expiresAt = new Date(Date.now() + (durationMap[duration] || durationMap[48]));
    
    // Create poll
    const poll = await prisma.poll.create({
      data: {
        question,
        trialPhase,
        therapeuticArea,
        options,
        duration,
        expiresAt,
      }
    });
    
    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}