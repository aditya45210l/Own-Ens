"use client";
import { abi, contractAddr } from "@/constant/constant";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useConfig,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { readContract } from "wagmi/actions";
import { Input } from "./ui/input";
import { redirect, RedirectType } from "next/navigation";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { NameContext } from "@/provider";

const SearchName = () => {
  // console.log("i am in search!;")
  const [name, setName] = useState("");
  const {name:checkName} = useContext(NameContext);

  console.log("checkname: ", checkName);
  const [startBuy, setStartBuy] = useState(false);
  const [isName, setIsName] = useState<"available" | "notAvailable" | null>(
    null
  );
  const config = useConfig();
  const {
    data: hash,
    writeContract,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();
  const { isSuccess: isConfirmed, data: confirmedHash } =
    useWaitForTransactionReceipt({
      hash,
    });

  const checkAvailibility = useCallback(
    async (_name: string) => {
      if (!_name) {
        setIsName(null);
        return;
      }
      const isAddress = await readContract(config, {
        abi: abi,
        address: contractAddr,
        functionName: "getAddress",
        args: [_name],
      });
      console.log(isAddress);
      console.log(_name);
      if (isAddress === "0x0000000000000000000000000000000000000000") {
        setIsName("available");

        return true;
      } else {
        setIsName("notAvailable");
        return false;
      }
    },
    [config]
  );

  const handleNameBuy = async () => {
    try {
      if (await checkAvailibility(name)) {
        setStartBuy(true);
        writeContract({
          abi: abi,
          address: contractAddr,
          functionName: "register",
          args: [name],
        });
      }
    } catch (error) {
      console.log(error);
      setStartBuy(false);
    } finally {
      setStartBuy(false);
    }
  };
  const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  useEffect(() => {
    if (isConfirmed && hash) {
      toast("registerd sucessfully", {
        description: hash,
        action: {
          label: "view tx",
          onClick: () =>
            redirect(
              `https://sepolia.etherscan.io/tx/${hash}`,
              RedirectType.push
            ),
        },
      });
      setTimeout(() => {
        redirect("/my-name");
      }, 1000);
    }
  }, [isConfirmed, hash]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      await checkAvailibility(name);
    }, 300);

    return () => clearTimeout(delay);
  }, [name, checkAvailibility]);

  return (
    <>
      <div className="flex flex-row gap-2 items-center min-h-fit transition-all">
        <Input
          size={36}
          type="text"
          placeholder="Enter name"
          disabled={startBuy}
          value={name}
          onChange={(e) => handleNameChange(e)}
          className="px-2 py-1 rounded-lg font-semibold outline-none h-auto !text-xl border-2 border-gray-300 min-w-10/12 text-center"
        />
        {/* <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <Input size={250}
                placeholder="Search for a name"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#121516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                disabled={startBuy}
                value={name}
                onChange={(e) => handleNameChange(e)}
              />
            </div>
          </label>
        </div> */}
        <Button
          size="lg"
          className="px-8 py-1.5 cursor-pointer"
          type="submit"
          disabled={
            checkName !== undefined ||
            (checkName === undefined && isName !== "available")
          }
          onClick={handleNameBuy}
        >
          {checkName === undefined ? (
            <p className="flex justify-center gap-1 items-center">
              {isPending && <Loader2Icon className="animate-spin" />}
              {isPending ? "wating..." : "Register"}{" "}
            </p>
          ) : (
            <p>Claimed</p>
          )}
        </Button>
      </div>

      {isName === "notAvailable" && (
        <Alert variant="destructive" className="font-bold max-w-72">
          <AlertCircleIcon />
          <AlertTitle>Selected Name Not Available!</AlertTitle>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="font-bold max-w-72">
          <AlertCircleIcon />
          <AlertTitle>{error.name}</AlertTitle>
        </Alert>
      )}
      {isSuccess && (
        <Alert variant="default" className="font-bold max-w-72">
          <AlertCircleIcon />
          <AlertTitle className="text-yellow-600">Pending...</AlertTitle>
          <AlertDescription className="whitespace-normal break-all break-words max-w-72 flex">
            tnxs:
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 break-all"
            >
              {" "}
              {hash.slice(0, 6)}...{hash.slice(-4)}
            </a>
          </AlertDescription>
        </Alert>
      )}
      {isConfirmed && (
        <Alert variant="default" className="font-bold max-w-72">
          <AlertCircleIcon />
          <AlertTitle className="text-green-600">Confirmed!</AlertTitle>
          <AlertDescription className="whitespace-normal break-all break-words max-w-72 flex">
            tnxs:
            <a
              href={`https://etherscan.io/tx/${String(confirmedHash)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 break-all"
            >
              {" "}
              {String(confirmedHash.transactionHash).slice(0, 6)}...
              {String(confirmedHash.transactionHash).slice(-4)}
            </a>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
export default SearchName;
