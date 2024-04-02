import BannerSection from "@/components/BannerSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Stocks from "@/components/Stocks";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <div className="bg-backgroundColor h-fit w-full">
      <div className="max-w-6xl mx-auto">
        <Navbar />
      </div>
      <div>
        <HeroSection />
      </div>
      <div className="mx-auto">
        <Stocks />
        <Wallet />
      </div>
      <div>
        <BannerSection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
