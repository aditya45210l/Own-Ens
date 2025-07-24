'use client'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, sepolia } from "viem/chains";

const config = getDefaultConfig({
  appName: "Simle ENS",
  projectId: process.env.projectId || "",
  chains: [sepolia, anvil],
  ssr: false,
});

export default config;
