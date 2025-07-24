import MyName from "@/components/MyName";


const page = async ({searchParams}:{searchParams:{name?: string,address?:string}}) => {
const {name, address} = (await searchParams);
  return <MyName name={ name} address={address}/>;
};
export default page;
