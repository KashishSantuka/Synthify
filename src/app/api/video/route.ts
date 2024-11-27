import { getSession } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const session = await getSession(req);

    const { userId } = session;
    const body = await req.json();
    const { prompt } = body;

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!prompt) {
      return NextResponse.json({ error: "Promt is required" }, { status: 400 });
    }

    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt: "Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic",
      guidance_scale: 17.5,
      negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
  };
  
  const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
  
  
  for (const [index, item] of Object.entries(output)) {
    await writeFile(`output_${index}`, item);
  }

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' } // Optional, but good practice for clarity
  });
  
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
