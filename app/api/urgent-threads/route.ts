import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/urgent-threads - List threads for experts
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { expertProfile: true }
    });

    if (!user || !user.isExpert || !user.expertProfile) {
      return NextResponse.json({ error: 'Not an expert' }, { status: 403 });
    }

    const expert = user.expertProfile;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const failureType = searchParams.get('failureType');
    const trialPhase = searchParams.get('trialPhase');
    const urgencyLevel = searchParams.get('urgencyLevel');
    const status = searchParams.get('status') || 'ACTIVE';

    // Build filter
    const where: any = {
      status,
      matchedExperts: {
        some: { id: expert.id }
      }
    };

    if (failureType) {
      where.failureType = failureType;
    }

    if (trialPhase) {
      where.trialPhase = trialPhase;
    }

    if (urgencyLevel) {
      where.urgencyLevel = urgencyLevel;
    }

    // Get threads
    const threads = await prisma.urgentThread.findMany({
      where,
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
      },
      orderBy: [
        { urgencyLevel: 'desc' },
        { createdAt: 'asc' }
      ]
    });

    return NextResponse.json({ threads });
  } catch (error) {
    console.error('Error fetching urgent threads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch urgent threads' },
      { status: 500 }
    );
  }
}

// POST /api/urgent-threads - Submit urgent help request
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get request body
    const body = await request.json();
    const {
      trialPhase,
      therapeuticArea,
      siteType,
      failureType,
      urgencyLevel,
      description,
      needsHelpWith
    } = body;

    // Validate required fields
    if (!trialPhase || !therapeuticArea || !failureType || !urgencyLevel || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate needsHelpWith
    if (!needsHelpWith || !Array.isArray(needsHelpWith) || needsHelpWith.length === 0) {
      return NextResponse.json(
        { error: 'needsHelpWith must be a non-empty array' },
        { status: 400 }
      );
    }

    // Find matching experts
    const matchedExperts = await prisma.expert.findMany({
      where: {
        isVetted: true,
        isAvailable: true,
        expertise: {
          has: failureType
        }
      },
      take: 10
    });

    // Generate title
    const title = `${failureType.replace(/_/g, ' ')} - ${therapeuticArea}`;

    // Create urgent thread
    const thread = await prisma.urgentThread.create({
      data: {
        userId: user.id,
        trialPhase,
        therapeuticArea,
        siteType,
        failureType,
        urgencyLevel,
        title,
        description,
        needsHelpWith,
        matchedExperts: {
          connect: matchedExperts.map((e: any) => ({ id: e.id }))
        }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
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

    return NextResponse.json({ thread }, { status: 201 });
  } catch (error) {
    console.error('Error creating urgent thread:', error);
    return NextResponse.json(
      { error: 'Failed to create urgent thread' },
      { status: 500 }
    );
  }
}