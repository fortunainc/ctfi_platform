import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/trial-confessions - List approved confessions
export async function GET() {
  try {
    const confessions = await prisma.trialConfession.findMany({
      where: {
        isApproved: true,
      },
      include: {
        user: {
          select: {
            handle: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(confessions);
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch confessions' },
      { status: 500 }
    );
  }
}

// POST /api/trial-confessions - Submit new confession
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      content,
      therapeuticArea,
      trialPhase,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          handle: `Operator_${Math.floor(1000 + Math.random() * 9000)}`,
        },
      });
    }

    const confession = await prisma.trialConfession.create({
      data: {
        userId: user.id,
        title,
        content,
        therapeuticArea: therapeuticArea || null,
        trialPhase: trialPhase || null,
        isApproved: false, // Requires moderation approval
      },
    });

    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    console.error('Error submitting confession:', error);
    return NextResponse.json(
      { error: 'Failed to submit confession' },
      { status: 500 }
    );
  }
}