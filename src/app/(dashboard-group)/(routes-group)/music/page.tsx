"use client";

import Heading from "@/components/ui/heading";
import { Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, voices } from "./constant";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { cn } from "@/lib/utils";

const AudioPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      voices: "Chris",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Values:", values);
    console.log("Helllo kashish");
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values, {
        responseType: "blob",
      });

      console.log("Helllo kashish2");
      console.log("AudioResponse:", response);

      const audioUrl = URL.createObjectURL(response.data);

      // Create an Audio element to play the audio
      const audio = new Audio(audioUrl);
      audio.play();

      setMusic(audioUrl);

      console.log("Setmusic", setMusic);

      form.reset();
    } catch (error) {
      toast.error("Something wen wrong");
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  console.log("Music:", music);
  return (
    <div>
      <Heading
        title="Audio Generation"
        description="Turn your prompt into an Audio"
        icon={Play}
        iconColor="text-emeral-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A hammer is hitting a wooden surface"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="voices"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value}></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {voices.map((option) => (
                          <SelectItem key={option.voice_id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounde-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No Music Generated" />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPage;
