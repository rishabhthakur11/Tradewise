import Image from "next/image";
import React from "react";
import feature from "../../../../../../public/assets/feature.png";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <div className="flex flex-col items-center h-screen bg-white w-full">
        <Image
          src={feature}
          width={350}
          height={350}
          alt="heroImage"
          priority
        />
        <h1 className="text-6xl font-bold mb-4 animate-fade-in-down ">
          Coming Soon
        </h1>
        <p className="text-lg text-textGray mb-8 animate-fade-in-up">
          We are not dealing With Mutual Funds right now. Stay tuned for more
        </p>
      </div>
    </div>
  );
}

export default page;
