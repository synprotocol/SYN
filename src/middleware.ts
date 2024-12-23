import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function middleware(request: NextRequest) {
  try {
    // Create response early
    const res = NextResponse.next();

    // Add CORS headers for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
      res.headers.set('Access-Control-Allow-Origin', '*');
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: res.headers });
      }

      return res;
    }

    // List of public paths
    const publicPaths = ['/', '/login', '/api/marketcap', '/api/ai', '/api/messages', '/api/tweet'];

    // Check if current path is public
    const isPublicPath = publicPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    if (isPublicPath) {
      return res;
    }

    // Authentication check for protected routes
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (authError) {
      console.error('Supabase auth error:', authError);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/chat',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 