"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useAccount, useConfig } from "wagmi";
import { redirect } from "next/navigation";
import NewNav from "@/components/NewNav";
import { CustomConnectButton } from "@/components/CustomButton";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const config = useConfig(); // ✅ This gives you the actual config object
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (!isConnected) return;

    redirect("/search");
  }, [config, isConnected, address]);

  return (
    <>
      <NewNav type="landing" />

      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
      >
        <Head>
          <title>Stitch Design</title>
          <link
            rel="icon"
            type="image/x-icon"
            href="data:image/x-icon;base64,"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossOrigin=""
          />
          <Link
            rel="stylesheet"
            as="style"
            href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Work+Sans:wght@400;500;700;900"
            onLoad={(e) => {
              const target = e.target as HTMLLinkElement;
              target.rel = "stylesheet";
            }}
          />
          <script
            src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
            async
          />
        </Head>

        <div className=" flex h-full grow flex-col">
          <div className=" flex flex-1 justify-center py-5">
            <div className="flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="p-4">
                  <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat gap-8 rounded-xl items-center justify-center p-4"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsW7L4-uVTqOgKjd2AMgGH1O6twY1A9SNMJZyBN9yHrlDN0U1Uy98hxfbAdJzHC6a1QFN_de33rd6PavxilpVQSE7Y02QGCJTxND1fi891MhQuqUexwLVmoNrvgAD2eQei0LhzMmirb4NAcSt6NTGnNquSH1eFg7Sg1bPoNAQg20R48GDGw_5s3HeM6kOjw4EenwuI_6MrLe-8gubFAUI5p5mD__pIE0aDB7HOIlR5_gUUmzFqYonSAxwqJ8WZRltZbmnpsivBRv0w")',
                    }}
                  >
                    <div className="flex flex-col gap-2 text-center">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-5xl font-black leading-tight tracking-[-0.033em]">
                        Your web3 username, for life
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal text-base font-normal leading-normal">
                        Use your Name Service name to simplify your web3
                        experience. No more long addresses - use your name to
                        store your avatar, profile data, and more.
                      </h2>
                    </div>
                    {isConnected ? (
                      <Button onClick={() => redirect("/search")}>
                        Launch App
                      </Button>
                    ) : (
                      <CustomConnectButton />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <h1 className="text-[#121516] tracking-light text-[32px] font-bold leading-tight text-4xl font-black leading-tight tracking-[-0.033em] max-w-[720px]">
                    Why Name Service?
                  </h1>
                  <p className="text-[#121516] text-base font-normal leading-normal max-w-[720px]">
                    Your Name Service name is more than just a username.
                    It&apos;s your identity in the decentralized world.
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                    <div className="text-[#121516]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM143.31,41.34,152,56.9,125.09,81.24,112.85,88H96.14a16,16,0,0,0-13.88,8l-8.73,15.23L63.38,84.19,74.32,58.32a87.87,87.87,0,0,1,69-17ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Zm102.58,86.78,1.13-5.81a16.09,16.09,0,0,0-4-13.9,1.85,1.85,0,0,1-.14-.14L120,174.74,133.7,144l22.82,3.08,45.72,28.12A88.18,88.18,0,0,1,142.58,214.78Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121516] text-base font-bold leading-tight">
                        One name for all your addresses
                      </h2>
                      <p className="text-[#6a7681] text-sm font-normal leading-normal">
                        No more copying long addresses. Use your Name Service
                        name to store all of your addresses and receive any
                        cryptocurrency, token, or NFT.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                    <div className="text-[#121516]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121516] text-base font-bold leading-tight">
                        Your profile across services
                      </h2>
                      <p className="text-[#6a7681] text-sm font-normal leading-normal">
                        Use your Name Service name as your username and profile
                        across different services. Your Name Service name is
                        portable and belongs to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 flex-col">
                    <div className="text-[#121516]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M160,16A80.07,80.07,0,0,0,83.91,120.78L26.34,178.34A8,8,0,0,0,24,184v40a8,8,0,0,0,8,8H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A80,80,0,1,0,160,16Zm0,144a63.7,63.7,0,0,1-23.65-4.51,8,8,0,0,0-8.84,1.68L116.69,168H96a8,8,0,0,0-8,8v16H72a8,8,0,0,0-8,8v16H40V187.31l58.83-58.82a8,8,0,0,0,1.68-8.84A64,64,0,1,1,160,160Zm32-84a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121516] text-base font-bold leading-tight">
                        Own your name, forever
                      </h2>
                      <p className="text-[#6a7681] text-sm font-normal leading-normal">
                        Instead of renting a domain name for a yearly fee, you
                        can own your Name Service name with a one-time
                        registration fee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="@container">
                <div className="flex flex-col justify-center items-center px-4 py-10 gap-8 ">
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-[#121516] tracking-light text-[32px] font-bold leading-tight text-4xl  tracking-[-0.033em] max-w-[720px]">
                      Ready to get started?
                    </h1>
                    <p className="text-[#121516] text-base font-normal leading-normal max-w-[720px]">
                      Connect your wallet and search for your name.
                    </p>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <div className="flex justify-center">
                      {isConnected ? (
                        <Button onClick={() => redirect("/search")}>
                          Launch App
                        </Button>
                      ) : (
                        <CustomConnectButton />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
