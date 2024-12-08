// import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

// axios
import axios from "axios";

dotenv.config();

// const inference = new HfInference(process.env.HF_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt } = body;

    console.log(body);

    console.log("Pormpt:", prompt);

    const formData = new FormData();
    formData.append("prompt", prompt);

    const textImg = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          // "Content-Type": "application/json",
          "x-api-key":
            process.env.CLIP_DROP_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(textImg.data, "binary").toString("base64");

    //   const responseData = await axios.post(
    //     `${context.bap_uri}/${response.context.action}`,
    //     response,
    //     {
    //       headers: {
    //         Authorization: header,
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    // )

    // if (!prompt || prompt.length === 0) {
    //   return new Response(JSON.stringify({ error: "Prompt is required" }), {
    //     status: 400,
    //   });
    // }

    // const imageResponse = await inference.textToImage({
    //   model: "black-forest-labs/FLUX.1-dev",
    //   inputs: prompt,
    // });

    // console.log("IMAGERESPONSE:", imageResponse);

    // if (!imageResponse) {
    //   throw new Error("Image  Response was not found: 400 Status Code!");
    // }

    // const Url = URL.createObjectURL(imageResponse);

    // console.log("imageUrl:", Url);

    // imageUrl.push(Url);

    // console.log("ImageArray:", imageUrl);

    return new Response(
      JSON.stringify({ imageResponse: `data:image/png;base64,${base64Image}` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
