import { Button } from "./ui/button";
import { AleartDeleteName } from "./AleartDeleteName";
import { SquarePen } from "lucide-react";

const MyName = (searchParams: { name?: string }) => {
  console.log(searchParams.name);

  return (
    <div className="flex flex-col gap-4 py-4 ">
      <div>
        <h1 className="text-3xl font-bold ml-4 ">
          Congratulations, 🎉{searchParams.name}🎉!
        </h1>
        <h1 className="text-xl font-semibold ml-4 ">
          You allready registerd you name.
        </h1>
      </div>
      <div className="w-full rounded-lg px-2 py-2">
        <div className="flex flex-row justify-between text-xl font-semibold border-2 border-bg-gray-500 px-4 py-4 rounded-lg items-center">
          <div className="flex flex-row gap-2">
            <p className="font-normal">name:</p>
            <p>{searchParams.name}</p>
          </div>
          {/* <Link
            className="flex gap-1 items-center justify-center"
            href={`https://sepolia.etherscan.io/tx/${address}`}
          >
            {address.slice(0, 5) + "...." + address.slice(-5, address.length)}{" "}
            <span className="font-normal text-gray-500">
              {" "}
              <Link2 size={18} />
            </span>
          </Link> */}
          <div className="flex flex-row gap-4">
            <Button variant={"outline"} className="cursor-pointer">
              <p>
                <SquarePen />
              </p>
              <p>Update</p>
            </Button>
            <AleartDeleteName name={searchParams.name} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyName;
