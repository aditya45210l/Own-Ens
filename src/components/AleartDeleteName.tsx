"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { abi, contractAddr } from "@/constant/constant";
import { AlertCircleIcon, Trash2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AleartDeleteName({ name }: { name?: string }) {
  const [state, setState] = useState(false);
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const {
    writeContract,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleDeleteId = async () => {
    try {
      writeContract({
        abi: abi,
        address: contractAddr,
        functionName: "remove",
        args: [name],
      });
      if (isSuccess) {
        setState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (error) {
      setErrors(error.message);
    }
  }, [error]);
  useEffect(() => {
    if (isSuccess && hash) {
              router.push(`/search`)
      setState(false);
      toast("Deleted sucessfully", {
        description: hash,
      });
    }
  }, [isSuccess, hash,router]);
  return (
    <>
      <AlertDialog open={state}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setState(true)}
            variant={"destructive"}
            className="cursor-pointer"
          >
            <Trash2 />
            <p>delete</p>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              {errors && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to process.</AlertTitle>
                </Alert>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => setState(false)}
              variant={"outline"}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleDeleteId}
              className="cursor-pointer"
            >
              {" "}
              <TriangleAlert />
              {isPending ? "wating..." : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
