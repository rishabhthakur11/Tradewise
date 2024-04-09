import Image from "next/image";
import Link from "next/link";
import notFound from "../../public/assets/notFound.svg";

export default function NotFound() {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <Image src={notFound} width={550} height={200} alt="404" />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
          <Link className="mt-4 text-gray-500" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
