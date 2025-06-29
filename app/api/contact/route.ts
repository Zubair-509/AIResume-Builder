import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate form data
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          success: false, 
          errors: result.error.format() 
        },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = result.data;
    
    // In a real implementation, you would:
    // 1. Store the message in a database
    // 2. Send an email notification
    // 3. Possibly integrate with a CRM or ticketing system
    
    // For now, we'll simulate a successful submission
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will contact you shortly.',
      data: {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        name,
        email,
        subject
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}