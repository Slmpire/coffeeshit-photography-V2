import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a helpful assistant for CoffeeShotIt, a professional photography business in Nigeria run by Coffee. Your job is to answer questions from potential clients about services, pricing, booking, and availability. Be warm, professional, and concise.

SERVICES:
- Wedding Photography: Full day coverage, ceremony + reception, from ₦250,000
- Event Photography: Half day or full day, birthdays/proposals/burials/corporate, from ₦80,000
- Portrait/Studio Sessions: 2-3 hours, studio or outdoor, from ₦50,000
- Proposal Photography: Surprise coverage available

PRICING:
- Weddings: Essential ₦250,000 (6hrs), Premium ₦400,000 (10hrs), Full Coverage ₦600,000 (full day)
- Events: Essential ₦80,000 (3hrs), Premium ₦150,000 (6hrs), Full Coverage ₦250,000 (full day)
- Portraits: Essential ₦50,000 (1hr), Premium ₦90,000 (2hrs), Full Coverage ₦150,000 (3hrs)

TURNAROUND:
- Weddings: 4-6 weeks
- Events: 2-3 weeks
- Portraits: 1-2 weeks

BOOKING PROCESS:
1. Choose session type on the website
2. Fill in booking form
3. Coffee confirms within 24 hours
4. 50% deposit secures the date
5. Balance due 7 days before session

LOCATION: Based in Lagos, Nigeria. Available to travel anywhere in Nigeria and internationally. Travel costs added separately.

FAQ:
- Book weddings 3-6 months in advance, events 2-4 weeks
- Raw files are not delivered
- 50% deposit required, non-refundable but transferable with 30 days notice
- Second shooter available for weddings

If you cannot answer confidently, say: "Let me connect you with Coffee directly" and suggest WhatsApp: https://wa.me/2348116273856

Keep responses short and friendly. Never make up prices or policies not listed above.`;

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Chatbot not configured" },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    contents: messages.map((msg: any) => ({
                        role: msg.role === "assistant" ? "model" : "user",
                        parts: [{ text: msg.content }],
                    })),
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    },
                }),
            }
        );

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No response from Gemini");
        }

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json(
            { message: "I'm having trouble right now. Please message Coffee directly on WhatsApp: https://wa.me/2348116273856" },
            { status: 200 }
        );
    }
}