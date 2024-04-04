import Image from "next/image";
import login from "../../../public/assets/login.svg";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-backgroundColor h-screen w-full">
        <div className=" flex justify-center items-center h-screen">
          <div className="w-1/2 flex items-center justify-center">
            <Image
              src={login}
              alt="Login Image"
              objectFit="cover"
              width={450}
              priority
            />
          </div>
          <div className="w-1/2 h-screen flex justify-center items-center bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
