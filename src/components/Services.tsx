/**
 * Services Component
 * Lists the core offerings. Uses grid layout for scannability.
 * Icons from lucide-react for visual cues.
 */
import React from 'react';
import { motion } from 'motion/react';
import { Home, Building2, Microscope, Wind, Paintbrush, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Paintbrush,
    title: "Lead Paint Removal",
    description: "Safe scraping, sanding, and chemical stripping of lead-based paint using wet methods to minimize dust.",
    color: "bg-rose-50 text-rose-600"
  },
  {
    icon: Wind,
    title: "Dust Remediation",
    description: "Deep cleaning of lead dust using HEPA-filtered vacuums and specialized cleaning agents.",
    color: "bg-amber-50 text-amber-600"
  },
  {
    icon: Microscope,
    title: "Lead Testing",
    description: "Professional XRF testing and lab analysis to identify lead hazards in paint, dust, and soil.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: ShieldCheck,
    title: "Encapsulation",
    description: "Applying specialized coatings to seal lead paint, preventing it from chipping or turning into dust.",
    color: "bg-emerald-50 text-emerald-600"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
          <p className="text-4xl font-bold text-slate-900 tracking-tight mb-6">Comprehensive Lead Abatement Solutions</p>
          <p className="text-lg text-slate-600">
            We provide a rigorous decontamination protocol to eliminate every trace of lead from your environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
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
