// components/home/ServicesPreview.tsx
import GlassCard from "@/components/common/GlassCard";
import { GiValve } from "react-icons/gi";
import { MdElectricalServices, MdLocalFireDepartment } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";

const SERVICES = [
  { icon: GiValve, title: "Mechanical Systems", desc: "High-reliability piping, HVAC, and process utilities." },
  { icon: MdElectricalServices, title: "Electrical Systems", desc: "Switchgears, panels, power distribution & controls." },
  { icon: MdLocalFireDepartment, title: "Fire Protection", desc: "Sprinkler, suppression, detection, and monitoring." },
  { icon: RiBuilding2Line, title: "Turnkey Plant Construction", desc: "From concept to commissioning, end-to-end delivery." },
];

export default function ServicesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-ink dark:text-white">Services</h2>
      <p className="mt-2 text-ink/80 dark:text-white/80 max-w-2xl">Engineering excellence across MEP and turnkey plants.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((s) => (
          <GlassCard key={s.title} className="p-5 hover:bg-white/15 dark:hover:bg-black/30 transition">
            <s.icon className="text-2xl text-teal" />
            <h3 className="mt-3 font-semibold text-ink dark:text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-ink/80 dark:text-white/80">{s.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}