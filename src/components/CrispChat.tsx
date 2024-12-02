"use client";

import { useEffect } from "react";
import dotenv from "dotenv";
import { Crisp } from "crisp-sdk-web";

dotenv.config();

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("process.env.CRISP_WEBSITE_ID");
  }, []);

  return null;
};

export default CrispChat
