
import SearchName from "./SearchName"

const NotUserName = () => {
  return (
    <main className="py-6 flex flex-col gap-8 items-center">
      <span>
        <h1 className="text-3xl font-bold ">
          Your web3 username for, everything{" "}
        </h1>
      </span>
      <p className="text-lg max-w-xl text-center leading-relaxed tracking-normal font-semibold">
        Use your Simple ENS name to simplify your web3 experience. No more long
        addresses, just one name for all your accounts.
      </p>
      <SearchName/>
    </main>
  )
}
export default NotUserName