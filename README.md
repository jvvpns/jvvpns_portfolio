# John Vincent L. Vipinosa - Portfolio

A professional portfolio website built with modern web technologies, featuring an integrated AI assistant powered by Google Gemini.

## Features

- **Personalized AI Assistant (JV):** A Gemini-powered chatbot trained to answer questions about my projects, experience, and background.
- **Secure API:** The chat endpoint includes strict input validation and in-memory rate limiting to prevent abuse and API quota exhaustion.
- **Responsive Design:** Fully responsive layout built with Tailwind CSS.
- **Modern Tech Stack:** Built using React 19, Next.js, and TypeScript.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **UI & Styling:** React 19, Tailwind CSS v4, Framer Motion, Radix UI
- **AI Integration:** Google Gemini SDK (`@google/generative-ai`)
- **Deployment:** Vercel

## Getting Started

First, clone the repository and install dependencies:

```bash
npm install
```

### Environment Variables

To run the AI Chatbot locally, you need a Google Gemini API Key. Create a `.env.local` file in the root directory:

```env
GOOGLE_GEMINI_API_KEY="your_api_key_here"
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Security Best Practices Implemented

- **Rate Limiting:** Protects the AI endpoint from spam requests.
- **Input Validation:** Restricts payload size and formats to prevent prompt injection.
- **Dependency Management:** Configured with specific overrides to resolve downstream vulnerability risks.
