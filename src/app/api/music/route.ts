import dotenv from "dotenv";
import { ElevenLabsClient } from "elevenlabs";

dotenv.config();

const client = new ElevenLabsClient({ apiKey: process.env.ELEVEN_KEY });

console.log(client);

if (!client) {
  throw new Error("API Key not found");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, voices } = body;

    // Check if voices and prompt are provided
    if (!voices) {
      return new Response(JSON.stringify({ error: "Voices is required" }), {
        status: 400,
      });
    }

    console.log("voices:", voices);

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    console.log("Prompt:", prompt);

    // Fetch all voices
    const aiVoices = await client.voices.getAll();

    console.log("AIVOICES:", aiVoices);
    console.log("This line is working");

    // Ensure aiVoices is not empty or undefined
    if (!aiVoices || !aiVoices.voices || !Array.isArray(aiVoices.voices)) {
      return new Response(
        JSON.stringify({ error: "AI Voices are not available" }),
        { status: 400 }
      );
    }

    console.log("This line is working???");

    // Find matching voice
    const matchingVoice = aiVoices.voices.find(
      (voice) => voice.name === voices
    );

    if (!matchingVoice) {
      console.log("Matching Voices not match");
      return new Response(JSON.stringify({ error: "Voice not found" }), {
        status: 404,
      });
    }

    console.log("After matching voice is not working ig");
    console.log("MatchingVoices:", matchingVoice);

    // Generate audio if voice is found
    const audioGeneration = await client.textToSpeech.convert(
      matchingVoice.voice_id,
      {
        model_id: "eleven_multilingual_v2",
        text: prompt,
        voice_settings: {
          stability: 0.1,
          similarity_boost: 0.3,
          style: 0.2,
        },
      }
    );

    // Check if audio generation was successful
    if (!audioGeneration) {
      return new Response(
        JSON.stringify({ error: "Audio generation failed" }),
        { status: 400 }
      );
    }

    console.log("AudioGeneration:", audioGeneration);
    console.log(typeof audioGeneration);
    console.log(Object.keys(audioGeneration));

    //  const readableStream =  (audioGeneration as any).readable;

    const chunks: Buffer[] = [];
    for await (const chunk of audioGeneration) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks);

    return new Response(content, {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request",
      }),
      { status: 500 }
    );
  }
}
