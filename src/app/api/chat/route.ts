import { GoogleGenerativeAI } from "@google/generative-ai";
import { site, techStack, projects, experience, awards } from "@/lib/data";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// JV's Permanent Persona
const JV_PERSONA = `
ROLE:
You are John Vincent L. Vipinosa (JV). This is your personal portfolio.
Your purpose is to chat with visitors and share insights into your technical background, projects, and professional journey.
You speak in the first person ("I", "my", "me").

KNOWLEDGE BASE:
- Name: ${site.name}
- Role: ${site.role}
- Tech Stack: ${JSON.stringify(techStack)}
- Featured Projects: ${JSON.stringify(projects)}
- Experience: ${JSON.stringify(experience)}
- Awards: ${JSON.stringify(awards)}
- About: ${site.about.join(" ")}
- Motto: ${site.motto}
- Email: ${site.email}
- Github: ${site.github}
- Linkedin: ${site.linkedin}
- Facebook: ${site.facebook}
- Instagram: ${site.instagram}

CORE COMMUNICATION STYLE:
- **Speak as yourself (JV)**. Be professional, technical, and approachable.
- **Be extremely concise**. Aim for 1-2 short sentences.
- **Use bullet points** for lists (my skills, my projects, my awards).
- **Be conversational**. Instead of "The projects are...", say "Some of my favorite projects include:".
- **Grounded info**: Talk about YOUR awards (Best Programmer, Best Thesis) with pride.
- **Avoid redundant greetings** like "Hello! I'm JV..." unless the user explicitly asks. Just start answering.
- **No Hallucinations**: If you're asked about something you haven't done, just say "I haven't explored that yet, but I'm always learning!"

FINAL REMINDER: You are John Vincent. Be efficient, technical, and direct.
`;

const CANDIDATE_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite-preview",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-3.1-pro-preview-customtools",
  "gemini-3.1-pro-preview",
  "gemini-1.5-flash",
  "gemini-1.5-pro"
];

// Simple In-Memory Rate Limiter (Soft limit for Portfolio)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 7; // Slightly more generous
const ipCache = new Map<string, { count: number; firstRequest: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = ipCache.get(ip);

  if (!userData) {
    ipCache.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - userData.firstRequest > RATE_LIMIT_WINDOW) {
    ipCache.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (userData.count >= MAX_REQUESTS) {
    return true;
  }

  userData.count++;
  return false;
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "Gemini API Key is missing." }), { status: 500 });
  }

  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again in a minute." }), { status: 429 });
    }

    const { messages } = await req.json();

    // --- Input Validation ---
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request: messages must be a non-empty array." }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.content || typeof lastMessage.content !== "string") {
      return new Response(JSON.stringify({ error: "Invalid request: last message content is missing." }), { status: 400 });
    }

    if (lastMessage.content.length > 500) {
      return new Response(JSON.stringify({ error: "Message too long. Please keep it under 500 characters." }), { status: 400 });
    }
    // ------------------------

    const userMessage = lastMessage.content;

    const encoder = new TextEncoder();

    // We'll use a stream to send data back
    const stream = new ReadableStream({
      async start(controller) {
        let success = false;

        for (const modelName of CANDIDATE_MODELS) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: JV_PERSONA,
            });

            const result = await model.generateContentStream(userMessage);

            for await (const chunk of result.stream) {
              const text = chunk.text();
              controller.enqueue(encoder.encode(text));
            }

            success = true;
            break;
          } catch (error: any) {
            console.warn(`JV AI: Model ${modelName} failed in stream, trying fallback...`, error.message);
          }
        }

        if (!success) {
          controller.enqueue(encoder.encode("Sorry, I'm having trouble connecting to my brain right now. Please try again later!"));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error: any) {
    console.error("Chat API Critical Failure:", error);
    return new Response(JSON.stringify({ error: "Critical failure." }), { status: 500 });
  }
}
