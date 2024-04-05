import { NextResponse } from 'next/server';

//const AUTH_USER= "awb-rapport"
//const AUTH_PASS = "void@awb@rapport"

const AUTH_USER= "user"
const AUTH_PASS = "password"

// Step 1. HTTP Basic Auth Middleware for Challenge
export function middleware(req) {
  console.log("==========================================================================================")
  console.log("==========================================================================================")
  console.log("==========================================================================================")
  console.log("==========================================================================================")
  console.log("middlware src")

  if (!isAuthenticated(req)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }

  return NextResponse.next();
}

// Step 2. Check HTTP Basic Auth header if present
function isAuthenticated(req) {
  const authheader = req.headers.get('authorization') || req.headers.get('Authorization');

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true;
  } else {
    return false;
  }
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/'
  ],
}


