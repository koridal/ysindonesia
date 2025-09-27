import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";
import type { NavbarProps } from "sanity";

export default function StudioNavbar(props: NavbarProps) {
  return (
    <div>
      <div className="p-5 bg-black text-gray-100 flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-3 font-semibold hover:text-blue-600 duration-200"
        >
          <IoReturnDownBack className="text-2xl" />
          Go to Website
        </Link>
        <h2
          title="Our Projects"
          className="text-2xl hidden md:inline-flex font-bold"
        >
          Inko Jaya Konstruksi
        </h2>
        <p className="text-sm">Studio for Projects</p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
