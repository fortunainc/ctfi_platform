import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/urgent-threads/[id] - Get specific thread
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const params = await context.params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const thread = await prisma.urgentThread.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        responses: {
          include: {
            expert: {
              select: {
                id: true,
                anonymousHandle: true,
                averageRating: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        matchedExperts: {
          select: {
            id: true,
            anonymousHandle: true,
            expertise: true,
            isAvailable: true
          }
        }
      }
    });

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Check if user is authorized (owner or matched expert)
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { expertProfile: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isOwner = thread.userId === user.id;
    const isMatchedExpert = user.expertProfile && 
      thread.matchedExperts.some((e: any) => e.id === user.expertProfile?.id);

    if (!isOwner && !isMatchedExpert) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ thread });
  } catch (error) {
    console.error('Error fetching urgent thread:', error);
    return NextResponse.json(
      { error: 'Failed to fetch urgent thread' },
      { status: 500 }
    );
  }
}

// PATCH /api/urgent-threads/[id] - Update thread status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const params = await context.params;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, operatorRating, operatorFeedback } = body;

    // Get thread
    const thread = await prisma.urgentThread.findUnique({
      where: { id: params.id }
    });

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only owner can update status
    if (thread.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update thread
    const updateData: any = {
      status,
      updatedAt: new Date()
    };

    if (operatorRating !== undefined) {
      updateData.operatorRating = operatorRating;
    }

    if (operatorFeedback !== undefined) {
      updateData.operatorFeedback = operatorFeedback;
    }

    if (status === 'RESOLVED') {
      updateData.resolvedAt = new Date();
    }

    const updatedThread = await prisma.urgentThread.update({
      where: { id: params.id },
      data: updateData
    });

    return NextResponse.json({ thread: updatedThread });
  } catch (error) {
    console.error('Error updating urgent thread:', error);
    return NextResponse.json(
      { error: 'Failed to update urgent thread' },
      { status: 500 }
    );
  }
}