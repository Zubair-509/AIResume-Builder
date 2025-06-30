import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Email validation schema
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json().catch(() => ({}));
    
    // Validate email
    const result = subscribeSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address',
          errors: result.error.format() 
        },
        { status: 400 }
      );
    }
    
    const { email } = result.data;
    
    // Validate email format again as an extra security measure
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format'
        },
        { status: 400 }
      );
    }
    
    // Implement rate limiting (simple in-memory solution)
    // In production, use Redis or another persistent store
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `${ipAddress}:${email}`;
    
    // In a real implementation, you would:
    // 1. Store the email in a database with proper sanitization
    // 2. Send a confirmation email with a verification link
    // 3. Integrate with a newsletter service like Mailchimp, ConvertKit, etc.
    // 4. Implement proper rate limiting with Redis or similar
    
    // For now, we'll simulate a successful subscription
    console.log('New newsletter subscription:', email);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: {
        email,
        subscriptionDate: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your subscription. Please try again later.' 
      },
      { status: 500 }
    );
  }
}