import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ error: 'Missing Google credential' }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,  
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });
    }

    const { email, name, picture, sub: googleId } = payload;

    // Find user by Google ID or Email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId },
          { email }
        ]
      }
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name,
          image: picture,
          googleId,
        }
      });
    } else if (!user.googleId) {
      // Link Google Account to existing email
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          name: user.name || name,
          image: user.image || picture,
        }
      });
    }

    // Generate custom JWT
    const token = await signToken({ userId: user.id, email: user.email });
    
    cookies().set('prime_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, message: 'Google login successful' });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
