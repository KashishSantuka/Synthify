import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
console.log("genAI:", genAI);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    console.log(messages);

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
      });
    }

    const prompt = messages
      .map(
        ({ role, content }: { role: string; content: string }) =>
          `${role}: ${content}`
      )
      .join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    console.log(result);

    const responseText = result.response;

    console.log("responseText:", responseText);

    const text =
      typeof responseText.text === "function"
        ? responseText.text()
        : responseText.text;

    console.log("text:", text);

    const responseToSend = {
      messages: (responseText.candidates || []).map((candidate) => ({
        content: candidate.content,
        role: "user",
      })),
      usageMetadata: responseText.usageMetadata, // Should be fine if it's serializable
      modelVersion: model, // Should also be serializable
    };

    console.log("responseToSend:", responseToSend);
    return new Response(JSON.stringify(responseToSend), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
