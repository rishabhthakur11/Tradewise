import Navbar from "@/components/Navbar";
import UserCard from "./_components/UserCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full max-w-6xl mx-auto">
      <div className="w-full border-b">
        <Navbar />
      </div>
      <main className="pt-[50px] h-full">
        <div className="flex gap-x-20">
          <div className="w-1/4">
            <UserCard />
          </div>
          <div className="w-3/4">{children}</div>
        </div>
      </main>
    </div>
  );
}
