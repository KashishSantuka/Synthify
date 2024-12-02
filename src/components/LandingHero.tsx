"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extralight">
        <h1>THE BEST AI TOOL for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to bg-pink-600">
          <Typewriter
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Audio Generation.",
                "Code Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold shadow-lg hover:opacity-90"
          >
            Start Generating AI 10x faster.
          </Button>
        </Link>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
          No Credit Card Required.
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
