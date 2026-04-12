import React from 'react';
import { motion } from 'motion/react';
import {
  Microscope,
  Wind,
  Paintbrush,
  ShieldCheck,
  Bug,
  Droplets
} from 'lucide-react';

const services = [
  {
    icon: Bug,
    title: "Mould Removal",
    description:
      "Fast and safe mould removal for homes and businesses. We eliminate active mould and prevent future growth.",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: Droplets,
    title: "Mould Inspection",
    description:
      "Professional mould inspections to identify hidden moisture issues and contamination before it spreads.",
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    icon: Paintbrush,
    title: "Lead Paint Removal",
    description:
      "Safe removal of lead-based paint using controlled methods to prevent contamination and exposure.",
    color: "bg-rose-50 text-rose-600"
  },
  {
    icon: Wind,
    title: "Dust Remediation",
    description:
      "HEPA vacuuming and deep cleaning to remove hazardous dust and restore safe indoor air quality.",
    color: "bg-amber-50 text-amber-600"
  },
  {
    icon: Microscope,
    title: "Lead Testing",
    description:
      "Accurate testing and lab analysis to detect lead hazards in paint, dust, and surfaces.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: ShieldCheck,
    title: "Encapsulation",
    description:
      "Specialised coatings to seal hazardous materials and prevent airborne contamination.",
    color: "bg-slate-50 text-slate-700"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">
            Our Expertise
          </h2>

          <p className="text-4xl font-bold text-slate-900 tracking-tight mb-6">
            Mould & Lead Removal Services You Can Trust
          </p>

          <p className="text-lg text-slate-600">
            From emergency mould removal to certified lead abatement, we deliver
            safe, compliant and professional environmental solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};