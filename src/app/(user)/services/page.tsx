// app/services/page.tsx
import Link from "next/link";
import ServiceGallery from "@/components/services/ServiceGallery";
import { GiValve } from "react-icons/gi";
import { MdElectricalServices, MdLocalFireDepartment } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";

export const metadata = {
  title: "Services | Yunsung Indonesia",
  description:
    "Mechanical, Electrical, Fire Protection, and Turnkey Plant Construction services overview.",
};

// Example images (replace with your own public images if available)
const MECH_IMAGES = [
  {
    src: "/images/products/conveyor.jpg",
    alt: "Industrial conveyor system",
  },
  {
    src: "/images/products/hvac.jpg",
    alt: "HVAC chiller system",
  },
  {
    src: "/images/products/mixer-3.png",
    alt: "Mixer system",
  },
  {
    src: "/images/products/Cargo-lift-2.jpg",
    alt: "Cargo system",
  },
];

const ELEC_IMAGES = [
  {
    src: "/images/services/switchgear.webp",
    alt: "Switchgear lineup",
  },
  {
    src: "/images/products/panel.jpg",
    alt: "MCC and control panels",
  },
  {
    src: "/images/services/cable-tray.png",
    alt: "Cable trays and distribution",
  },
  {
    src: "/images/services/plant-lighting.jpg",
    alt: "Plant lighting and controls",
  },
];

const FIRE_IMAGES = [
  {
    src: "/images/services/sprinkler.jpeg",
    alt: "Sprinkler heads",
  },
  {
    src: "/images/services/hydrant.jpg",
    alt: "Fire pumps and valves",
  },
  {
    src: "/images/services/suppression.webp",
    alt: "Suppression systems",
  },
  {
    src: "/images/services/alarm.jpeg",
    alt: "Alarm and monitoring",
  },
];

const TURNKEY_IMAGES = [
  {
    src: "/images/services/turnkey.webp",
    alt: "Turnkey plant exterior",
  },
  {
    src: "/images/services/line-setup.webp",
    alt: "Production line setup",
  },
  {
    src: "/images/services/commissioning.webp",
    alt: "Commissioning and testing",
  },
  {
    src: "/images/services/building.jpeg",
    alt: "Quality control area",
  },
];

const FEATURES = [
  {
    icon: GiValve,
    title: "Mechanical Systems",
    points: [
      "Process piping (stainless/carbon steel), sanitary and utility lines",
      "HVAC: AHU, Chiller, Cooling Tower, and ducting",
      "Pump stations, pressure/flow control, insulation and testing",
      "P&ID, Isometric drawings, and as-built documentation",
    ],
  },
  {
    icon: MdElectricalServices,
    title: "Electrical Systems",
    points: [
      "Power intake and distribution (Switchgear, MCC, Panel Board)",
      "Cable trays/ducts/ladders and earthing system",
      "Lighting, emergency power, control and instrumentation (PLC/SCADA)",
      "Short-circuit and load-flow studies, verification",
    ],
  },
  {
    icon: MdLocalFireDepartment,
    title: "Fire Protection",
    points: [
      "NFPA-compliant sprinkler and protection design",
      "Fire pumps, valves, flow tests, and commissioning",
      "Integrated detection/alarm/monitoring systems",
      "Evacuation routes and performance-based consulting",
    ],
  },
  {
    icon: RiBuilding2Line,
    title: "Turnkey Plant Construction",
    points: [
      "Concept → Detail Design → Construction → Commissioning",
      "Integrated procurement, schedule, and risk management",
      "QA/QC and HSE standards in operation",
      "Start-up, O&M manuals, and training",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-20 md:pt-28 pb-20 space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-primary/10 via-transparent to-transparent backdrop-blur-sm p-8 md:p-12">
        <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-ink/80 dark:text-white/80">
          Mechanical, Electrical, Fire Protection, and Turnkey delivery — from
          concept to commissioning.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all"
          >
            Request a proposal
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-white/5 transition"
          >
            View case studies
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 gap-6">
        {FEATURES.map(({ icon: Icon, title, points }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm p-6 hover:-translate-y-0.5 hover:shadow-2xl transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/40 dark:bg-white/10">
                <Icon className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight">
                  {title}
                </h3>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-ink/80 dark:text-white/80">
                  {points.map((p) => (
                    <li key={p} className="text-sm md:text-[15px]">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Galleries */}
      <ServiceGallery
        title="Mechanical Systems"
        description="From process piping and HVAC to utilities, built to industry standards with verified documentation."
        items={MECH_IMAGES}
      />
      <ServiceGallery
        title="Electrical Systems"
        description="Stable power and control across the line — from intake to instrumentation."
        items={ELEC_IMAGES}
      />
      <ServiceGallery
        title="Fire Protection"
        description="NFPA-based design and performance tests to safeguard your facilities."
        items={FIRE_IMAGES}
      />
      <ServiceGallery
        title="Turnkey Plant Construction"
        description="One team from concept through commissioning, delivering on schedule and quality."
        items={TURNKEY_IMAGES}
      />

      {/* CTA */}
      <section className="relative overflow-hidden rounded-2xl mt-2 border border-white/10 bg-gradient-to-r from-primary/15 via-transparent to-fuchsia-400/10 backdrop-blur-sm p-8 md:p-10">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          Ready to plan your next project?
        </h3>
        <p className="mt-2 text-ink/80 dark:text-white/80">
          Share your process, utilities, and schedule — we’ll tailor a proposal
          that fits your budget and timeline.
        </p>
        <div className="mt-5">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
