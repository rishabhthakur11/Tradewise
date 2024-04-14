"use client";
import React from "react";
import Image from "next/image";
import image1 from "../../public/screenshots/image 6.png";
import image2 from "../../public/assets/wallet.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const imagePaths = [image1, image2];
const BrandCarousal = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="carousal-container">
      <div className="container mx-auto">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent>
            {imagePaths.map((path, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={path}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={`heroImage${index + 1}`}
                    className="rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BrandCarousal;
