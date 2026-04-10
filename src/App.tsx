/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Main Application Component
 * Orchestrates the landing page layout and global scroll progress.
 * Components are separated for maintainability and SEO optimization.
 */
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { LeadPaintInfo } from './components/LeadPaintInfo';
import { Safety } from './components/Safety';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* Progress Bar - Visual cue for user engagement */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Header />
      
      <main>
        <Hero />
        
        {/* Trust Bar - Social proof and industry compliance */}
        <div className="bg-slate-50 py-10 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-black italic tracking-tighter">ISO 9001</span>
              <span className="text-xl font-black italic tracking-tighter">EPA CERTIFIED</span>
              <span className="text-xl font-black italic tracking-tighter">HUD COMPLIANT</span>
              <span className="text-xl font-black italic tracking-tighter">OSHA SAFETY</span>
              <span className="text-xl font-black italic tracking-tighter">GREEN SEAL</span>
            </div>
          </div>
        </div>

        <Services />
        
        {/* Educational Section - High SEO value for lead paint keywords */}
        <LeadPaintInfo />
        
        <Safety />
        
        {/* Stats Section - Quantifiable trust signals */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">20+</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">Industry Proven</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">100%</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Safety Guaranteed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">Fast</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Technical Support</p>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

