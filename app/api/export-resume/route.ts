import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.resumeData || !body.format) {
      return NextResponse.json(
        { error: 'Missing required fields: resumeData and format are required' },
        { status: 400 }
      );
    }

    const { resumeData, format } = body;

    // Validate format
    const validFormats = ['pdf', 'docx', 'html'];
    if (!validFormats.includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Supported formats: pdf, docx, html' },
        { status: 400 }
      );
    }

    // Validate resume data structure
    if (!resumeData.fullName || !resumeData.email) {
      return NextResponse.json(
        { error: 'Resume data must include fullName and email' },
        { status: 400 }
      );
    }

    // Simulate PDF generation
    const mockPdf = Buffer.from('Mock PDF content');

    return new NextResponse(mockPdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.${format}"`
      }
    });
  } catch (error) {
    console.error('Resume export error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}