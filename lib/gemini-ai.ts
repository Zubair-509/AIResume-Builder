'use client';

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyCPbHe6MR9ThCTkdNJplT-ctkTyHmlO4-U");

// The model to use for generating content
const MODEL_NAME = "gemini-pro";

// The system prompt to guide Gemini's behavior
const SYSTEM_PROMPT = `You are an AI Resume Assistant helping users build their resumes. Ask the user step-by-step questions to collect their resume details.

Your behavior:
1. Start by greeting the user and explaining that you will help them build a resume step by step.
2. Ask the user for each section of a resume, one at a time:
   - Full Name
   - Job Title or Career Goal
   - Contact Information (Email, Phone, LinkedIn/Portfolio)
   - Summary (2-4 sentence personal/professional summary)
   - Work Experience (job titles, companies, responsibilities, dates)
   - Education (degree, institution, dates)
   - Skills (comma-separated list)
   - Certifications (if any)
   - Projects (titles, descriptions, technologies used)
3. After collecting all required fields, ask if the user wants to add any extras (languages, volunteer work, etc.).
4. Once all info is collected, format a complete resume as structured text or JSON.

Respond as a helpful chatbot, one question at a time. Wait for the user's response after each question.`;

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: string;
}

export async function generateChatResponse(messages: GeminiMessage[]): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Start a chat session
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.parts }],
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      systemInstruction: SYSTEM_PROMPT,
    });

    // Generate a response
    const result = await chat.sendMessage(messages[messages.length - 1].parts);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

export async function parseResumeData(resumeText: string): Promise<any> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Create a prompt to parse the resume text into structured data
    const prompt = `
    Parse the following resume text into a structured JSON object with these fields:
    - fullName: string
    - jobTitle: string
    - email: string
    - phone: string
    - linkedin: string (optional)
    - professionalSummary: string
    - skills: string (comma-separated list)
    - workExperience: array of objects with {company, position, startDate, endDate, current, responsibilities}
    - education: array of objects with {institution, degree, fieldOfStudy, graduationDate}
    - certifications: array of objects with {name, issuer, date} (optional)
    - projects: array of objects with {name, description, technologies} (optional)

    Resume text:
    ${resumeText}

    Return only valid JSON without any explanations or markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text().trim();
    
    // Try to parse the JSON
    try {
      return JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error("Failed to parse resume data");
    }
  } catch (error) {
    console.error("Error parsing resume data:", error);
    throw error;
  }
}