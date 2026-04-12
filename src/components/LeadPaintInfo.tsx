import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';

export const LeadPaintInfo = () => {
  return (
    <section id="lead-paint" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">
              Health Risks & Safety
            </h2>

            <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">
              Lead & Mould Hazards in Your Property
            </h3>

            <div className="space-y-8">
              {/* MOULD - HIGH PRIORITY */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Mould Exposure Risks
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Mould spreads quickly in damp environments and releases airborne spores that can trigger allergies,
                    respiratory issues and long-term health problems if not removed properly.
                  </p>
                </div>
              </div>

              {/* MOULD SOURCE */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Where Mould Develops
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Mould is commonly found in bathrooms, ceilings, walls, and areas affected by leaks or poor ventilation.
                    It can grow behind surfaces and spread unnoticed.
                  </p>
                </div>
              </div>

              {/* LEAD */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Lead Poisoning Risks
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Lead is a toxic substance found in older paint. When disturbed, it creates hazardous dust that can
                    cause serious health issues, especially in children.
                  </p>
                </div>
              </div>

              {/* SOLUTION */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    Our Professional Solution
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    We provide safe mould removal and certified lead abatement using industry-approved methods.
                    Our process eliminates contamination and helps prevent future risks.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="./jobs.jpg"
                  alt="Mould contamination on wall"
                  className="rounded-3xl shadow-lg object-cover w-full h-64"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="./jobs3.png"
                  alt="Mould inspection"
                  className="rounded-3xl shadow-lg object-cover w-full h-48"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="./job4.jpg"
                  alt="HEPA cleaning and remediation"
                  className="rounded-3xl shadow-lg object-cover w-full h-48"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="./jobs2.png"
                  alt="Clean safe indoor environment"
                  className="rounded-3xl shadow-lg object-cover w-full h-64"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-[220px]">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                Safety First
              </p>
              <p className="text-sm font-medium leading-relaxed">
                Professional mould remediation and lead removal with safe and compliant procedures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};