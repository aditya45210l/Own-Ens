"use client";
import { abi, contractAddr } from "@/constant/constant";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { readContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import NewNav from "@/components/NewNav";

const ContextProvider = createContext<{ name: string | undefined }>({
  name: undefined,
});

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const config = useConfig(); // ✅ This gives you the actual config object
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
        return { status: false, data: "" }; // No name
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
        // router.push(`/my-name?address=${address}&name=${data}`);
        router.push("/search");
      } else {
        setName(data);
      }
    };

    checkName();
  }, [isConnected, address, pathName, findName, router]);

  useEffect(() => {
    console.log("effect; ", name);
  }, [name]);

  return (
    <>
      <NewNav type="auth" name={name} address={address} />
      <ContextProvider.Provider value={{ name: name ? name : undefined }}>
        {children}
      </ContextProvider.Provider>
    </>
  );
};
export default AuthLayout;

export const ContextValue = () => {
  const value = useContext(ContextProvider);
  console.log("value: ", value);
  return { ...value };
};
