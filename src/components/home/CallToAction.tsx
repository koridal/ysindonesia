import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";


export default function CallToAction() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center sm:flex-row sm:text-left rounded-tl-3xl rounded-br-3xl shadow-md overflow-hidden bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200">
        {/* 텍스트 영역 */}
        <div className="flex flex-col justify-center items-center sm:items-start flex-1 p-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Next-Generation Technology
          </h2>
          <p className="my-4 text-gray-600 max-w-lg">
            In line with the Fourth Industrial Revolution, Inko Jaya Konstruksi
            will concentrate all of its capability on developing Smart Factory
            and Next-Generation Technology.
          </p>
          <Link href="https://inkojayakonstruksi.vercel.app" target="blank">
            <Button className="rounded-bl-none rounded-tl-xl mt-4 cursor-pointer">
              Inko Jaya Konstruksi
            </Button>
          </Link>
        </div>

        {/* 이미지 영역 */}
        <div className="flex justify-center items-center flex-1 p-6">
          <Image
            width={400}
            height={300}
            src="/images/hero/excavator.jpeg"
            alt="machinery"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
