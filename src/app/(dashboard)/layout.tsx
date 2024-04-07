import DashNavbar from "@/components/DashNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full max-w-6xl mx-auto">
      <div className="w-full border-b">
        <DashNavbar />
      </div>
      <main className="pt-[50px] h-full">{children}</main>
    </div>
  );
}
