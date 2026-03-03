import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/experts - List all available experts
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const expertise = searchParams.get('expertise');
    const isAvailable = searchParams.get('isAvailable');
    const isVetted = searchParams.get('isVetted');

    // Build filter
    const where: any = {};

    if (expertise) {
      where.expertise = {
        has: expertise
      };
    }

    if (isAvailable !== null) {
      where.isAvailable = isAvailable === 'true';
    }

    if (isVetted !== null) {
      where.isVetted = isVetted === 'true';
    }

    // Get experts
    const experts = await prisma.expert.findMany({
      where,
      select: {
        id: true,
        anonymousHandle: true,
        expertise: true,
        isVetted: true,
        isAvailable: true,
        averageRating: true,
        totalResponses: true,
        totalHelpful: true,
        reputationScore: true,
        lastActiveAt: true
      },
      orderBy: [
        { isAvailable: 'desc' },
        { averageRating: 'desc' },
        { totalResponses: 'desc' }
      ]
    });

    return NextResponse.json({ experts });
  } catch (error) {
    console.error('Error fetching experts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experts' },
      { status: 500 }
    );
  }
}