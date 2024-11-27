import { getSession } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
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
      prompt_b: "prompt",
    };

    const output = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input }
    );
    console.log(output);

    return new Response(JSON.stringify(output), {
      headers: { 'Content-Type': 'application/json' } // Optional, but good practice for clarity
  });
  
  } catch (error) {
    console.error("[MUSIC_ERROR]", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
