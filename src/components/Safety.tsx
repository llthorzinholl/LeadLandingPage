/**
 * Safety Component
 * Explains the technical safety protocols.
 * Vital for building trust and reducing bounce rate by showing expertise.
 */
import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Thermometer, HardHat, FileCheck } from 'lucide-react';

const safetySteps = [
  {
    icon: ShieldAlert,
    title: "Area Isolation",
    description: "We create physical containment barriers to prevent lead dust from spreading to other areas of the property."
  },
  {
    icon: Thermometer,
    title: "Air Monitoring",
    description: "High-precision sensors monitor air quality in real-time throughout the entire remediation process."
  },
  {
    icon: HardHat,
    title: "Certified PPE",
    description: "Our team uses industrial-grade protective suits and full-face respirators for maximum safety."
  },
  {
    icon: FileCheck,
    title: "Final Certification",
    description: "After cleaning, we issue a technical report proving the environment is safe for re-occupancy."
  }
];

export const Safety = () => {
  return (
    <section id="safety" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Safety First</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Industrial-Grade Safety Protocol</h3>
            <p className="text-lg text-slate-600 mb-10">
              We don't just clean; we decontaminate. We follow the strictest international standards to ensure that no lead particles remain on site.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {safetySteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-600">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
              <img 
                src="./menVac.png" 
                alt="Safety equipment and PPE" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-600 rounded-full -z-10 blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};
