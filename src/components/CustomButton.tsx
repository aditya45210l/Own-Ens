"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button"; // shadcn button

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div aria-hidden={!ready}>
            {!connected ? (
              <Button
                onClick={openConnectModal}
                variant="default"
                size={"lg"}
                className="cursor-pointer"
              >
                Connect Wallet
              </Button>
            ) : chain.unsupported ? (
              <Button
                onClick={openChainModal}
                variant="destructive"
                size={"lg"}
                className="cursor-pointer"
              >
                Wrong Network
              </Button>
            ) : (
              <Button
                onClick={openAccountModal}
                variant="secondary"
                size={"lg"}
                className="cursor-pointer"
              >
                {account.displayName}
              </Button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
