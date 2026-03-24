/**
 * LeadPaintInfo Component
 * Educational section about lead paint risks.
 * High SEO value for keywords like "Lead Paint Hazards" and "Lead Poisoning".
 */
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
            <h2 className="text-sm font-bold text-rose-600 uppercase tracking-[0.2em] mb-4">The Danger of Lead Paint</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Why Professional Removal is Essential</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Lead Poisoning Risks</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Lead is a potent neurotoxin. Even small amounts of lead dust can cause irreversible brain damage, learning disabilities, and behavioral problems in children.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Where is it Found?</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Most homes built before 1978 contain lead-based paint. It becomes a hazard when it peels, chips, or is disturbed during renovations, creating toxic dust.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Our Solution</h4>
                  <p className="text-slate-600 leading-relaxed">
                    We don't just paint over the problem. We use EPA-approved abatement methods to permanently remove or safely encapsulate lead hazards.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="./jobs.png" 
                  alt="Peeling lead paint hazard" 
                  className="rounded-3xl shadow-lg object-cover w-full h-64"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="./jobs3.png" 
                  alt="Lead testing kit" 
                  className="rounded-3xl shadow-lg object-cover w-full h-48"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="./jobs4.png" 
                  alt="HEPA vacuum for lead dust" 
                  className="rounded-3xl shadow-lg object-cover w-full h-48"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="./jobs2.png" 
                  alt="Clean safe home" 
                  className="rounded-3xl shadow-lg object-cover w-full h-64"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* SEO Badge */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Compliance</p>
              <p className="text-sm font-medium leading-relaxed">Fully compliant with EPA RRP Rule and HUD guidelines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
