import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/industry-signals - List all industry signals
export async function GET() {
  try {
    const signals = await prisma.industrySignal.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        eventDate: 'desc',
      },
    });

    return NextResponse.json(signals);
  } catch (error) {
    console.error('Error fetching industry signals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industry signals' },
      { status: 500 }
    );
  }
}

// POST /api/industry-signals - Create new industry signal
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
      source,
      sourceUrl,
      eventDate,
      question,
      therapeuticArea,
      trialPhase,
    } = body;

    if (!title || !source || !eventDate || !question) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const signal = await prisma.industrySignal.create({
      data: {
        title,
        source,
        sourceUrl: sourceUrl || null,
        eventDate: new Date(eventDate),
        question,
        therapeuticArea: therapeuticArea || null,
        trialPhase: trialPhase || null,
      },
    });

    return NextResponse.json(signal, { status: 201 });
  } catch (error) {
    console.error('Error creating industry signal:', error);
    return NextResponse.json(
      { error: 'Failed to create industry signal' },
      { status: 500 }
    );
  }
}