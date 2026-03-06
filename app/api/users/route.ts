import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Generate a random anonymous handle
function generateHandle(role: string = 'Operator'): string {
  const prefix = role === 'CRA' ? 'CRA' : 
                 role === 'SiteLead' ? 'SiteLead' : 
                 role === 'PM' ? 'PM' : 
                 role === 'CRC' ? 'CRC' : 'Operator';
  
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}_${randomNum}`;
}

// Calculate reputation tier based on score
function getReputationTier(score: number): string {
  if (score >= 500) return 'Trusted Contributor';
  if (score >= 250) return 'Field Expert';
  if (score >= 100) return 'Senior Operator';
  if (score >= 50) return 'Experienced Operator';
  return 'Operator';
}

// GET /api/users - Get all users (admin) or current user profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerkId');
    
    if (clerkId) {
      // Get specific user by Clerk ID
      const user = await prisma.user.findUnique({
        where: { clerkId },
        include: {
          threads: { take: 10, orderBy: { createdAt: 'desc' } },
          replies: { take: 10, orderBy: { createdAt: 'desc' } },
          _count: {
            select: {
              threads: true,
              replies: true,
              pollVotes: true,
            }
          }
        }
      });
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      return NextResponse.json(user);
    }
    
    // Return list of users (for admin purposes - would need auth check in production)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        handle: true,
        reputationScore: true,
        reputationTier: true,
        createdAt: true,
      },
      orderBy: { reputationScore: 'desc' },
      take: 100,
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clerkId, role = 'Operator' } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId }
    });
    
    if (existingUser) {
      return NextResponse.json(existingUser);
    }
    
    // Generate unique handle
    let handle = generateHandle(role);
    let attempts = 0;
    
    while (attempts < 10) {
      const existing = await prisma.user.findUnique({ where: { handle } });
      if (!existing) break;
      handle = generateHandle(role);
      attempts++;
    }
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        clerkId,
        handle,
        reputationScore: 0,
        reputationTier: 'Operator',
        badges: [],
      }
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}