import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Redirect to the home page
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  });
}