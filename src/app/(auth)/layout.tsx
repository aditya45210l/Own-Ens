"use client";
import { abi, contractAddr } from "@/constant/constant";
import { ReactNode, useCallback, useEffect } from "react";
import { readContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { usePathname, useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const config = useConfig(); // ✅ This gives you the actual config object
  const { isConnected, address } = useAccount();
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

        return { status: true, data: String(result) };
      } else {
        return { status: false, data: "" }; // No name
      }
    } catch (err) {
      console.error("Error reading contract:", err);

      return { status: false, data: "" };
    } finally {
    }
  }, [config]);
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      if (pathName != "/") {
        console.log("i am pushing to '/'");
        router.push("/");
        return;
      }
    }

    const checkName = async () => {
      const { status, data } = await findName();

      if (status) {
        router.push(`/my-name?name=${data}`);
      } else {
        router.push("/search");
      }
    };

    checkName();
  }, [isConnected, address, pathName, findName, router]);

  return <>{children}</>;
};
export default AuthLayout;
