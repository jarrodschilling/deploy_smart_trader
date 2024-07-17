import Link from "next/link";
import "./globals.css";
import PageTitle from "@/components/PageTitle";
import LoginRegisterButton from "@/components/LoginRegisterButton";
import AboutApp from "@/components/AboutApp";
import GoogleButton from "@/components/GoogleButton";


export default async function Home() {

  return (
    <div className='m-4 mt-20'>
      <PageTitle title={"Welcome"} />
      <LoginRegisterButton />
      <AboutApp />
      <GoogleButton />
    </div>
  );
}
