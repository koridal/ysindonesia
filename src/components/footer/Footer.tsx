// components/footer/Footer.tsx
import Link from "next/link";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { SiSanity } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/20 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-ink dark:text-white">Yunsung Indonesia</h4>
          <p className="text-sm text-ink/80 dark:text-white/80 mt-2">Since 1988, delivering MEP & turnkey plants across Indonesia.</p>
        </div>
        <div>
          <h5 className="font-medium text-ink dark:text-white">Contact</h5>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start gap-2"><FiMail /> admin@inkojayakonstruksi.com</li>
            <li className="flex items-start gap-2"><FiPhone /> +62 21 8263 1845</li>
            <li className="flex items-start gap-2"><FiMapPin /> Jl. Cempaka 1 Blok F 16 Delta Silicon, Cikarang Selatan, Bekasi, Jawa Barat 17530</li>
          </ul>
        </div>
        <div className="flex text-sm text-ink/70 dark:text-white/70 gap-6">
          <p>© {new Date().getFullYear()} Yunsung Indonesia. All rights reserved.</p>
          <Link href="/studio" className="pr-2">
            <SiSanity />
          </Link>
        </div>
      </div>
    </footer>
  );
}