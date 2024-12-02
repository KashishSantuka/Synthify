import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const inference = new HfInference(process.env.HF_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt } = body;

    console.log(body);

    console.log("Pormpt:", prompt);

    if (!prompt || prompt.length === 0) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    // if (!amount) {
    //   return new Response(JSON.stringify({ error: "Amount is required" }), {
    //     status: 400,
    //   });
    // }

    // if (!resolution) {
    //  return JSON.stringify({ error: "Resolution is required" }),
    //     {
    //       status: 400,
    //     };
    // }

    const imageUrl = [];

    const imageResponse = await inference.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
      // parameters: {
        
      //   guidance_scale: 7.5,
      //   num_inference_steps: 50,
      // },
    });

    console.log("IMAGERESPONSE:", imageResponse);

    // if (!imageResponse) {
    //  throw new Error("Image  Response was not found: 400 Status Code!")
    // };

      const Url = URL.createObjectURL(imageResponse);

      console.log("imageUrl:", Url);

      imageUrl.push(Url);

      console.log("ImageArray:", imageUrl);

      return new Response(
        JSON.stringify({ imageUrl }), // Send URL of the image to frontend
        { status: 200 }
      );
    }
   catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
