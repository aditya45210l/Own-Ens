'use client'
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, sepolia } from "viem/chains";

const config = getDefaultConfig({
  appName: "Simle ENS",
  projectId: process.env.projectId || "be7bdc5bddc672a5f0003bb02559f68e",
  chains: [sepolia, anvil],
  ssr: false,
});

export default config;
