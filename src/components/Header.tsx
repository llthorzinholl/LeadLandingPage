/**
 * Header Component
 * Handles site navigation, branding, and mobile menu toggle.
 * Sticky positioning with backdrop blur for modern UI.
 */
import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + Name */}
          <div className="flex items-center">
            <button
              onClick={() => handleScroll('top')}
              className="flex items-center gap-3 h-20"
            >
              <img
                src="./logo.svg"
                alt="Absolute Environmental Services"
                className="h-10 w-auto object-contain"
              />

              <span className="flex flex-col text-left leading-tight hidden sm:flex">
                {/* Absolute */}
                <span className="text-lg font-bold text-slate-900">
                  Absolute
                </span>
              
                {/* Environmental Services */}
                <span className="text-sm font-semibold text-slate-900 -mt-[2px] leading-tight">
                  Environmental <br />
                  <span className="text-emerald-600">Services</span>
                </span>
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleScroll('services')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Services
            </button>

            <button onClick={() => handleScroll('lead-paint')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Lead Paint
            </button>

            <button onClick={() => handleScroll('safety')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Safety
            </button>

            <button
              onClick={() => handleScroll('contact')}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              Get a Free Quote
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4"
          >
            <button onClick={() => handleScroll('services')} className="block text-lg font-medium text-slate-900 w-full text-left">
              Services
            </button>

            <button onClick={() => handleScroll('lead-paint')} className="block text-lg font-medium text-slate-900 w-full text-left">
              Lead Paint
            </button>

            <button onClick={() => handleScroll('safety')} className="block text-lg font-medium text-slate-900 w-full text-left">
              Safety
            </button>

            <button
              onClick={() => handleScroll('contact')}
              className="block w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold"
            >
              Get a Free Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};