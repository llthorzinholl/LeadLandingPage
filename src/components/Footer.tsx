import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* LOGO */}
          <div className="flex items-center justify-center md:justify-start gap-0">
              <img
                src="./src/components/assets/logoT.png"
                alt="LeadSafe Icon"
                className="h-20 w-auto object-contain"
              />
            
              <span className="text-white font-semibold text-lg tracking-tight">
                Absolute Environmental Services
              </span>
          </div>

          {/* LINKS */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-slate-300">
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#lead-paint" className="hover:text-white transition">
              Lead Paint
            </a>
            <a href="#safety" className="hover:text-white transition">
              Safety
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} LeadSafe. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>0425 257 142</span>
            <span>business.support@aesaus.com.au</span>
          </div>
        </div>

      </div>
    </footer>
  );
};