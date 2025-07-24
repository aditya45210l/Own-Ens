"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, Loader2Icon, SquarePen } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { abi, contractAddr } from "@/constant/constant";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "sonner";
import { Alert, AlertTitle } from "./ui/alert";
import { useRouter } from "next/navigation";

export function UpdateDialog({ name,address }: { name?: string ,address?:string}) {
  const [state, setState] = useState(false);
  const [newName, setNewName] = useState<string | null>("");
  const router = useRouter();

  const {
    writeContract,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();
  const {
    isSuccess: isConfirmed,
    data: confirmedHash,
    error: watingError,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const [errors, setErrors] = useState(
    error || watingError ? String(error) || String(watingError) : null
  );
  if (isConfirmed) {
    console.log(confirmedHash);
  }

  const handleUpdateName = async (e: FormEvent<HTMLFormElement>) => {
    setErrors(null);
    e.preventDefault();
    const event = new FormData(e.currentTarget);
    const _newName = event.get("newName");

    if (String(_newName).length < 3) {
      setErrors("Input length must be greater then 3");
      return;
    }

    setNewName(String(_newName));

    try {
      writeContract({
        abi: abi,
        address: contractAddr,
        functionName: "update",
        args: [name, _newName],
      });
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
      router.push(`/my-name?name=${newName}&address=${address}`);
      setState(false);
      toast("Update sucessfully", {
        description: hash,
      });
    }
  }, [isSuccess, hash]);

  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setState(true);
            setErrors(null);
          }}
          variant={"outline"}
          className="cursor-pointer"
        >
          <p>
            <SquarePen />
          </p>
          <p>Update</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => handleUpdateName(e)}
        >
          <DialogHeader>
            <DialogTitle>Update name</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click update when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Old name</Label>
              <Input id="name-1" name="name" defaultValue={name} disabled />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">New name</Label>
              <Input
                id="username-1"
                name="newName"
                placeholder="Eg. Aditya"
                min={3}
              />
            </div>
            {errors && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{errors}</AlertTitle>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              <p className="flex justify-center gap-1 items-center">
                {isPending && <Loader2Icon className="animate-spin" />}
                {isPending ? "wating..." : "Update"}
              </p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
