import  LandingNavbar  from "@/components/LandingNavbar";
import  LandingHero  from "@/components/LandingHero";
import React from "react";
// import { Button } from "@/components/ui/button";


const LandingPage = () => {
  return (
    <div className="h-full">
   <LandingNavbar />
   <LandingHero />
    </div>
  );
};

export default LandingPage;



