"use client";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import config from "../rainbowKitProvider";
import { createContext } from "react";
export const NameContext = createContext<
  { name: string | undefined }
>({name:undefined});
const Provider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider coolMode>
{children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default Provider;
