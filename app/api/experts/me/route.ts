import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/experts/me - Get my expert profile
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

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.expertProfile) {
      return NextResponse.json(
        { error: 'Expert profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ expert: user.expertProfile });
  } catch (error) {
    console.error('Error fetching expert profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expert profile' },
      { status: 500 }
    );
  }
}

// POST /api/experts/me - Create or update expert profile
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
      anonymousHandle,
      expertise
    } = body;

    // Validate required fields
    if (!anonymousHandle || !expertise || !Array.isArray(expertise) || expertise.length === 0) {
      return NextResponse.json(
        { error: 'anonymousHandle and expertise (non-empty array) are required' },
        { status: 400 }
      );
    }

    // Check if anonymous handle is already taken (if updating)
    const existingExpert = await prisma.expert.findUnique({
      where: { anonymousHandle }
    });

    if (existingExpert && existingExpert.userId !== user.id) {
      return NextResponse.json(
        { error: 'Anonymous handle already taken' },
        { status: 409 }
      );
    }

    // Create or update expert profile
    const expert = await prisma.expert.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        clerkId: userId,
        email: user.email,
        anonymousHandle,
        expertise,
        isAvailable: true,
        isVetted: false // Requires manual vetting by admin
      },
      update: {
        anonymousHandle,
        expertise,
        updatedAt: new Date()
      }
    });

    // Update user to mark as expert
    await prisma.user.update({
      where: { id: user.id },
      data: { isExpert: true }
    });

    return NextResponse.json({ expert }, { status: 201 });
  } catch (error) {
    console.error('Error creating expert profile:', error);
    return NextResponse.json(
      { error: 'Failed to create expert profile' },
      { status: 500 }
    );
  }
}