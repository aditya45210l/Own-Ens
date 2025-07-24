"use client";
import { abi, contractAddr } from "@/constant/constant";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { readContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import NewNav from "@/components/NewNav";

// ✅ Rename the context (DO NOT export it as 'ContextProvider')
export const NameContext = createContext<{ name: string | undefined }>({
  name: undefined,
});

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const config = useConfig();
  const router = useRouter();

  const { isConnected, address } = useAccount();
  const [name, setName] = useState<string | undefined>("");
  const pathName = usePathname();

  const findName = useCallback(async () => {
    try {
      const result = await readContract(config, {
        abi,
        address: contractAddr,
        functionName: "getName",
        args: [address],
      });

      if (result && result !== "") {
        console.log("name was found!");
        setName(String(result));
        return { status: true, data: String(result) };
      } else {
        setName(undefined);
        return { status: false, data: "" };
      }
    } catch (err) {
      console.error("Error reading contract:", err);
      setName(undefined);
      return { status: false, data: "" };
    }
  }, [config, address]);

  useEffect(() => {
    if (!isConnected) {
      if (pathName != "/") {
        router.push("/");
        return;
      }
    }

    const checkName = async () => {
      const { status, data } = await findName();

      if (!status) {
        router.push("/search");
      } else {
        setName(data);
      }
    };

    checkName();
  }, [isConnected, address, pathName, findName, router]);

  return (
    <>
      <NewNav type="auth" name={name} address={address} />
      <NameContext.Provider value={{ name }}>
        {children}
      </NameContext.Provider>
    </>
  );
};

export default AuthLayout;
