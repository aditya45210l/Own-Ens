import { Link2 } from "lucide-react";
import { AleartDeleteName } from "./AleartDeleteName";
import { UpdateDialog } from "./UpdateDialog";
import Link from "next/link";

const MyName = ({ name,address }: { name?: string; address?: string }) => {

  return (
    <div className="flex flex-col gap-4 py-4 ">
      <div>
        <h1 className="text-3xl font-bold ml-4 ">
          Congratulations, 🎉{name}🎉!
        </h1>
        <h1 className="text-xl font-semibold ml-4 ">
          You allready registerd you name.
        </h1>
      </div>
      <div className="w-full rounded-lg px-2 py-2">
        <div className="grid sm:grid-rows-1 grid-rows-3 sm:grid-cols-3 grid-cols-1 gap-2 justify-between text-xl font-semibold border-2 border-bg-gray-500 px-4 py-4 rounded-lg items-center">
          <div className="flex flex-row gap-2">
            Name: {" "}
            <p className="font-bold">{name}</p>
          </div>
          <Link
            className="flex gap-1 items-center "
            href={`https://sepolia.etherscan.io/tx/${address}`}
          >
            Address:{" "}
            <p className="font-bold">
            {address?.slice(0, 5) + "...." + address?.slice(-5, address?.length)}{" "}</p>
            <span className="font-normal text-gray-500">
              {" "}
              <Link2 size={18} className="pt-0.5" />
            </span>
          </Link>
          <div className="flex flex-row gap-4 justify-start">
            <UpdateDialog name={name} address={address} />
            <AleartDeleteName name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyName;
