import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/polls/[id]/vote - Vote on a poll
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { clerkId, selectedOption } = body;
    
    // Validate poll exists and is active
    const poll = await prisma.poll.findUnique({
      where: { id }
    });
    
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    
    if (poll.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Poll has expired' }, { status: 400 });
    }
    
    // Validate selected option
    const options = poll.options as string[];
    if (!options.includes(selectedOption)) {
      return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
    }
    
    // Get or create user
    let user;
    if (clerkId) {
      user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        const prefix = 'Operator';
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        const handle = `${prefix}_${randomNum}`;
        
        user = await prisma.user.create({
          data: {
            clerkId,
            handle,
            reputationScore: 0,
            reputationTier: 'Operator',
          }
        });
      }
    }
    
    // Check if user already voted
    if (user) {
      const existingVote = await prisma.pollVote.findUnique({
        where: {
          pollId_userId: {
            pollId: id,
            userId: user.id,
          }
        }
      });
      
      if (existingVote) {
        return NextResponse.json({ error: 'Already voted' }, { status: 400 });
      }
    }
    
    // Create vote
    const vote = await prisma.pollVote.create({
      data: {
        pollId: id,
        userId: user?.id,
        selectedOption,
      }
    });
    
    // Get updated results
    const votes = await prisma.pollVote.groupBy({
      by: ['selectedOption'],
      where: { pollId: id },
      _count: true,
    });
    
    const totalVotes = votes.reduce((sum, v) => sum + v._count, 0);
    
    const optionsWithResults = options.map((option) => {
      const voteCount = votes.find(v => v.selectedOption === option)?._count || 0;
      return {
        label: option,
        votes: voteCount,
        percentage: totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0,
      };
    });
    
    return NextResponse.json({
      vote,
      results: {
        options: optionsWithResults,
        totalVotes,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error voting on poll:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}