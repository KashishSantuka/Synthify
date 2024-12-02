"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    const websiteId = "fd603b2b-6fbf-46cd-87c6-6212407fcb2b";

    // Ensure that websiteId is a string
    if (websiteId) {
      console.log("Crisp Website ID:", websiteId);
      Crisp.configure(websiteId);
    } else {
      console.error("Crisp Website ID is missing!");
    }
  }, []);

  return null;
};

export default CrispChat;
