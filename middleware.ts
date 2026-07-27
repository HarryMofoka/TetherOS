import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limiter';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // 2. API Route Protection & Rate Limiting
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const { allowed, remaining } = checkRateLimit(ip, 60, 60000);

    response.headers.set('X-RateLimit-Limit', '60');
    response.headers.set('X-RateLimit-Remaining', remaining.toString());

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429, headers: response.headers }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
