import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/threads/[id] - Get thread details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const thread = await prisma.thread.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            handle: true,
            reputationTier: true,
          }
        },
        replies: {
          include: {
            user: {
              select: {
                handle: true,
                reputationTier: true,
              }
            }
          },
          orderBy: [
            { isMostHelpful: 'desc' },
            { helpfulVotes: 'desc' },
            { createdAt: 'asc' }
          ]
        },
        _count: {
          select: {
            replies: true,
            threadFollows: true,
          }
        }
      }
    });
    
    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }
    
    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/threads/[id] - Update thread (same situation count, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body;
    
    if (action === 'same-situation') {
      const thread = await prisma.thread.update({
        where: { id },
        data: {
          sameSituationCount: {
            increment: 1
          }
        }
      });
      return NextResponse.json(thread);
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/threads/[id] - Delete thread
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.thread.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}