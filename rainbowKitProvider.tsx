"use client";
import { projectId } from "@/constant/constant";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, sepolia } from "viem/chains";

const config = getDefaultConfig({
  appName: "Simle ENS",
  projectId: projectId!,
  chains: [sepolia, anvil],
  ssr: false,
});

export default config;
