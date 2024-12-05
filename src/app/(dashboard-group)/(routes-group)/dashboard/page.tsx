"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import {
  MessageSquare,
  ArrowRight,
  ImageIcon,
  Music,
  Code,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    href: "/music",
  },

  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];

export default function DashBoard() {
  const router = useRouter();
  return (
    <div>
      <SignedIn>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Explore the power of AI
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            Chat with the smartest AI - Experience the power of AI
          </p>
          <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map((tool) => (
              <Card
                onClick={() => {
                  router.push(tool.href);
                }}
                key={tool.href}
                className="p-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <div
                    className={cn(
                      "p-3 w-fir flex flex-row rounded-md",
                      tool.bgColor
                    )}
                  >
                    <p className="text-emerald-500"></p>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>

                  <div className="font-semibold ml-4">{tool.label}</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Card>
            ))}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
