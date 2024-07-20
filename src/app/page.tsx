import Link from "next/link";
import "./globals.css";
import AboutApp from "@/components/AboutApp";
import HomePageTitleBar from "@/components/HomePageTitleBar";
import CreateAccountButton from "@/components/CreateAccountButton";


export default async function Home() {

  return (
    <div className='m-4 mt-20'>
      <div className="flex w-4/5 justify-center mx-auto">
      <div>
      <HomePageTitleBar />
      <CreateAccountButton />
      <AboutApp />
      </div>
      </div>
    </div>
  );
}
