import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/operator-playbooks - List all published playbooks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const therapeuticArea = searchParams.get('therapeuticArea');
    const trialPhase = searchParams.get('trialPhase');

    const where: any = {
      isPublished: true,
    };

    if (therapeuticArea) {
      where.therapeuticArea = therapeuticArea;
    }

    if (trialPhase) {
      where.trialPhase = trialPhase;
    }

    const playbooks = await prisma.operatorPlaybook.findMany({
      where,
      include: {
        user: {
          select: {
            handle: true,
            reputationTier: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(playbooks);
  } catch (error) {
    console.error('Error fetching playbooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playbooks' },
      { status: 500 }
    );
  }
}

// POST /api/operator-playbooks - Create new playbook
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
      threadId,
      situationDescription,
      warningSigns,
      escalationSteps,
      escalationLanguage,
      lessonsLearned,
      therapeuticArea,
      trialPhase,
    } = body;

    if (!title || !situationDescription || !warningSigns || !escalationSteps || !escalationLanguage || !lessonsLearned || !therapeuticArea) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    const playbook = await prisma.operatorPlaybook.create({
      data: {
        title,
        threadId: threadId || null,
        userId: user.id,
        situationDescription,
        warningSigns: Array.isArray(warningSigns) ? warningSigns : [warningSigns],
        escalationSteps: Array.isArray(escalationSteps) ? escalationSteps : [escalationSteps],
        escalationLanguage,
        lessonsLearned,
        therapeuticArea,
        trialPhase: trialPhase || null,
      },
    });

    return NextResponse.json(playbook, { status: 201 });
  } catch (error) {
    console.error('Error creating playbook:', error);
    return NextResponse.json(
      { error: 'Failed to create playbook' },
      { status: 500 }
    );
  }
}