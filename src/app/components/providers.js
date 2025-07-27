"use client";
import React from "react";
import { HeroUIProvider } from "@heroui/react";
function Providers({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

export default Providers;
