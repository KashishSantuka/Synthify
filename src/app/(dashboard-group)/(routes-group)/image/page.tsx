"use client";

import Heading from "@/components/ui/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ImagePage = () => {
  const router = useRouter();
  // const [images, setImages] = useState<string | null>(null);
  const [images, setImages] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages(null);

      const response = await axios.post('/api/image', {
        prompt: values.prompt,
      });

      if (response.status === 200 && response.data.imageResponse) {
        setImages(response.data.imageResponse);
      } else {
        throw new Error("Failed to retrieve the image from the server");
      }

      // const ImageUrl = response.data.Url;

      // if (response && response.data) {

      //   const blobUrl = URL.createObjectURL(response.data); // Create blob URL in frontend
      //   setImages(blobUrl);
      //   form.reset();
      // } else {
      //   throw new Error("No image URL returned.");
      // }
    } catch (error) {
      toast.error("Something went wrong while generating the image.");
      console.error(error);
    } finally {
      router.refresh();
    }
  };


  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-400"
        bgColor="bg-pink-400/10"
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
                        placeholder="A picture of a horse in Swiss alps"
                        {...field}
                      />
                    </FormControl>
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {!images && !isLoading && <Empty label="No Images Generated" />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images && (
              <Card className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Generated Image" fill src={images}  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(images)}
                    variant="secondary"
                    className="w-full "
                  >
                    <Download className="h-4 w-4 mr-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
