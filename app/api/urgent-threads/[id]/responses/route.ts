import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// POST /api/urgent-threads/[id]/responses - Expert responds to thread
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const params = await context.params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get thread
    const thread = await prisma.urgentThread.findUnique({
      where: { id: params.id },
      include: { responses: true, matchedExperts: true }
    });

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Get expert user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { expertProfile: true }
    });

    if (!user || !user.expertProfile) {
      return NextResponse.json({ error: 'Not an expert' }, { status: 403 });
    }

    const expert = user.expertProfile;

    // Check if expert is matched to this thread
    const isMatched = thread.matchedExperts.some((e: any) => e.id === expert.id);
    if (!isMatched) {
      return NextResponse.json(
        { error: 'Not matched to this thread' },
        { status: 403 }
      );
    }

    // Check if thread is still active
    if (thread.status !== 'ACTIVE' && thread.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: 'Thread is not accepting responses' },
        { status: 400 }
      );
    }

    // Get request body
    const body = await request.json();
    const {
      content,
      whatToCheck,
      questionsToAsk,
      escalationScript
    } = body;

    // Validate required fields
    if (!content) {
      return NextResponse.json(
        { error: 'content is required' },
        { status: 400 }
      );
    }

    // Validate arrays
    if (!whatToCheck || !Array.isArray(whatToCheck)) {
      return NextResponse.json(
        { error: 'whatToCheck must be an array' },
        { status: 400 }
      );
    }

    if (!questionsToAsk || !Array.isArray(questionsToAsk)) {
      return NextResponse.json(
        { error: 'questionsToAsk must be an array' },
        { status: 400 }
      );
    }

    // Create response
    const response = await prisma.urgentResponse.create({
      data: {
        threadId: params.id,
        expertId: expert.id,
        content,
        whatToCheck,
        questionsToAsk,
        escalationScript
      },
      include: {
        expert: {
          select: {
            id: true,
            anonymousHandle: true,
            averageRating: true
          }
        }
      }
    });

    // Update thread status if this is the first response
    if (thread.responses.length === 0) {
      await prisma.urgentThread.update({
        where: { id: params.id },
        data: {
          status: 'IN_PROGRESS',
          firstResponseAt: new Date()
        }
      });
    }

    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.error('Error creating urgent response:', error);
    return NextResponse.json(
      { error: 'Failed to create urgent response' },
      { status: 500 }
    );
  }
}