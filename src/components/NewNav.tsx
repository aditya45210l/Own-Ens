import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { CustomConnectButton } from "./CustomButton";

const NewNav = ({
  type,
  address,
  name,
}: {
  type: "auth" | "landing";
  name?: string;
  address?: string;
}) => {
  return (
    <header className="flex h-16 w-full items-center border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl flex w-full items-center px-4 md:px-6">
        <Link href="/search" className="mr-6 flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {type === "auth" ? (
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Search
            </Link>
            <Link
              href={`/my-name?address=${address}&name=${name}`}
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              My name
            </Link>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <CustomConnectButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {type === "auth" && (
              <SheetContent side="top">
                <div className="grid gap-6 p-6">
                  <Link
                    href="/search"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Search
                  </Link>
                  <Link
                    href={`/my-name?address=${address}&name=${name}`}
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    My name
                  </Link>
                  {/* <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Services
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Contact
                  </Link> */}
                </div>
              </SheetContent>
            )}
            {type === "landing" && (
              <SheetContent side="top">
                <div className="grid gap-6 p-6">
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Services
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </div>
      </div>
    </header>
  );
};
export default NewNav;

function MountainIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
