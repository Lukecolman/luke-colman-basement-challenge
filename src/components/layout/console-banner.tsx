"use client";

import { useEffect } from "react";

const banner = `
   ___  ______  ____  ________
  / _ )/ __/  |/  / |/ /_  __/
 / _  |\\ \\/ /|_/ /    / / /   
/____/___/_/  /_/_/|_/ /_(_)  
                              
`;

export function ConsoleBanner() {
  useEffect(() => {
    console.log(banner);
  }, []);

  return null;
}