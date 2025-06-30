import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Email validation schema
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
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
    
    // In a real implementation, you would:
    // 1. Store the email in a database
    // 2. Send a confirmation email
    // 3. Integrate with a newsletter service like Mailchimp, ConvertKit, etc.
    
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