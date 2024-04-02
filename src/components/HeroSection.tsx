import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <div>
        <div className="px-6 lg:px-8 z-10 max-w-6xl mx-auto">
          <div className="mx-auto max-w-4xl pt-20 lg:pt-20">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="bg-[#B8F5F9] rounded-full px-16 py-2 text-lg text-black">
                Stock markets at your fingertips
              </div>
            </div>
            <div className="text-center leading-tight">
              <h1 className="text-8xl font-bold  text-black leading-tight tracking-wider">
                All things finance, right here .
              </h1>
              <p className="mt-6 text-lg leading-8 text-textGray font-semibold mx-auto max-w-3xl">
                Whether it's planning your savings with a new-age savings
                account, investing in mutual funds and high-interest products -
                do it all on Tradewise.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="bg-black text-white px-8 py-2 rounded-full"
                >
                  Start your journey
                </a>
              </div>
            </div>
          </div>
          {/* <div className="-z-10">
            <Image
              src={heroImage}
              width={100}
              height={100}
              layout="responsive"
              alt="heroImage"
              className="lg:-m-44 lg:mx-auto"
              priority
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
