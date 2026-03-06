import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redactContent, validateContent } from '@/lib/redaction';

// POST /api/threads/[id]/replies - Create a reply
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { clerkId, content } = body;
    
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
            badges: [],
          }
        });
      }
    }

    // Validate content (no file attachments)
    const contentValidation = validateContent(content);
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { error: contentValidation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Redact PII from content before storage
    const redactedContent = redactContent(content);
    
    // Create reply with redacted content
    const reply = await prisma.reply.create({
      data: {
        userId: user?.id,
        threadId: id,
        content: redactedContent,
        helpfulVotes: 0,
        isMostHelpful: false,
      },
      include: {
        user: {
          select: {
            handle: true,
            reputationTier: true,
          }
        }
      }
    });
    
    // Update thread updatedAt
    await prisma.thread.update({
      where: { id },
      data: { updatedAt: new Date() }
    });
    
    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/threads/[id]/replies - Get replies for a thread
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const replies = await prisma.reply.findMany({
      where: { threadId: id },
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
    });
    
    return NextResponse.json(replies);
  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}