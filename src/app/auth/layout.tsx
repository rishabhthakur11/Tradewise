import Image from "next/image";
import login from "../../../public/assets/login.svg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-backgroundColor h-fit w-full flex justify-center items-center md:h-screen flex-col-reverse md:flex-row">
      <div className="md:w-1/2 flex items-center justify-center w-full p-10 md:p-0">
        <Image src={login} alt="Login Image" width={450} priority />
      </div>
      <div className="md:w-1/2 h-fit md:h-screen flex justify-center items-center bg-white w-full">
        {children}
      </div>
    </div>
  );
}
