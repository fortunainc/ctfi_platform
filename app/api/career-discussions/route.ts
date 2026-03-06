import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/career-discussions - List all career discussions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get('topic');

    const where: any = {};

    if (topic) {
      where.topic = topic;
    }

    const discussions = await prisma.careerDiscussion.findMany({
      where,
      include: {
        user: {
          select: {
            handle: true,
            reputationTier: true,
            badges: true,
          },
        },
      },
      orderBy: {
        helpfulVotes: 'desc',
      },
    });

    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Error fetching career discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career discussions' },
      { status: 500 }
    );
  }
}

// POST /api/career-discussions - Create new career discussion
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
      topic,
    } = body;

    if (!title || !content || !topic) {
      return NextResponse.json(
        { error: 'Title, content, and topic are required' },
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

    const discussion = await prisma.careerDiscussion.create({
      data: {
        userId: user.id,
        title,
        content,
        topic,
      },
    });

    return NextResponse.json(discussion, { status: 201 });
  } catch (error) {
    console.error('Error creating career discussion:', error);
    return NextResponse.json(
      { error: 'Failed to create career discussion' },
      { status: 500 }
    );
  }
}