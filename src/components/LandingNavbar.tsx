"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="px-1 py-4 bg-transparent w-full flex  justify-betweem">
      <Link href="/" className="flex items-center ">
        <div className="relative h-8 w-8 mr-2">
          <Image fill alt="Logo" src="/Logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Synthify
        </h1>
      </Link>
      <div className="flex  ml-auto justify-end  gap-x-1">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
