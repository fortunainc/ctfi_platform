import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redactContent, validateContent } from '@/lib/redaction';

// GET /api/threads - List threads with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trialTypeRoom = searchParams.get('trialTypeRoom');
    const urgencyLevel = searchParams.get('urgencyLevel');
    const sort = searchParams.get('sort') || 'trending';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build where clause
    const where: any = {};
    
    if (urgencyLevel && urgencyLevel !== 'all') {
      where.urgencyLevel = urgencyLevel;
    }
    
    if (trialTypeRoom && trialTypeRoom !== 'all') {
      // This would need to be implemented with TrialTypeRoom relationship
      // For now, we'll filter by therapeutic area as a proxy
      where.therapeuticArea = trialTypeRoom;
    }
    
    // Build orderBy based on sort parameter
    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'trending') {
      orderBy = {
        replies: {
          _count: 'desc'
        }
      };
    } else if (sort === 'urgent') {
      const urgencyOrder = { 'Critical': 4, 'Urgent': 3, 'Needs Advice': 2, 'Normal': 1 };
      orderBy = {
        // This is a simplified approach - in production, use raw SQL for custom ordering
        createdAt: 'desc'
      };
    } else if (sort === 'active') {
      orderBy = {
        replies: {
          _count: 'desc'
        }
      };
    }
    
    // Fetch threads
    const threads = await prisma.thread.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            handle: true,
            reputationTier: true,
          }
        },
        replies: {
          select: {
            id: true,
            helpfulVotes: true,
            isMostHelpful: true,
          }
        },
        _count: {
          select: {
            replies: true,
            threadFollows: true,
          }
        }
      }
    });
    
    // Format response
    const formattedThreads = threads.map(thread => ({
      id: thread.id,
      title: thread.title,
      trialPhase: thread.trialPhase,
      therapeuticArea: thread.therapeuticArea,
      siteCountRange: thread.siteCountRange,
      issueCategory: thread.issueCategory,
      description: thread.description,
      urgencyLevel: thread.urgencyLevel,
      additionalContext: thread.additionalContext,
      sameSituationCount: thread.sameSituationCount,
      replyCount: thread._count.replies,
      createdAt: thread.createdAt,
      author: thread.user?.handle || 'Anonymous',
      authorReputation: thread.user?.reputationTier || 'Operator',
      mostHelpfulReply: thread.replies.find(r => r.isMostHelpful),
    }));
    
    return NextResponse.json(formattedThreads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/threads - Create a new thread
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clerkId,
      title,
      trialPhase,
      therapeuticArea,
      siteCountRange,
      issueCategory,
      urgencyLevel,
      description,
      additionalContext,
    } = body;
    
    // Get or create user
    let user;
    if (clerkId) {
      user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        // Create user if doesn't exist
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
    const contentValidation = validateContent(description);
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { error: contentValidation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Redact PII from content before storage
    const redactedTitle = redactContent(title);
    const redactedDescription = redactContent(description);
    const redactedAdditionalContext = additionalContext ? redactContent(additionalContext) : null;
    
    // Create thread with redacted content
    const thread = await prisma.thread.create({
      data: {
        userId: user?.id,
        title: redactedTitle,
        trialPhase,
        therapeuticArea,
        siteCountRange,
        issueCategory,
        urgencyLevel,
        description: redactedDescription,
        additionalContext: redactedAdditionalContext,
        sameSituationCount: 0,
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
    
    return NextResponse.json(thread, { status: 201 });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}