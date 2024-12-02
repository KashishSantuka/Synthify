import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Audio Prompt is required",
  }),
  voices: z.string().min(1),
});

export const voices = [
  {
    name: "Aria",
    voice_id: "9BWtsMINqrJLrRacOk9x",
  },
  {
    name: "Chris",
    voice_id: "iP95p4xoKVk53GoZ742B"
  },
  {
    name: "George",
    voice_id: "AZnzlk1XvdvUeBnXmlld"
  },
  {
    name: "Roger",
    voice_id: "CwhRBWXzGAHq8TQ4Fs17"
  },
  {
    name: "Sarah",
    voice_id: "EXAVITQu4vr4xnSDxMaL"
  },
  {
    name: "Laura",
    voice_id: "FGY2WhTYpPnrIDTdsKH5"
  },
  {
    name: "Matilda",
    voice_id: "XrExE9yKIg1WjnnlVkGX"
  }
];
