import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const Hero = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = useCallback((clientX: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));

    setSliderPosition(clamped);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updateSliderPosition(event.clientX);
    },
    [isDragging, updateSliderPosition]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      updateSliderPosition(event.touches[0].clientX);
    },
    [updateSliderPosition]
  );

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-l-[100px]" />
      <div className="absolute top-1/4 left-10 -z-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              Emergency Mould Removal Specialists
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
              Fast, Safe <span className="text-emerald-600">Mould Removal</span> for
              Your Home or Business
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
              Professional mould removal, mould inspection and remediation services for
              homes, rentals and commercial properties. We remove active mould fast and
              help prevent it from coming back.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 group"
              >
                Get Emergency Help
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
              >
                View Mould Services
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="font-bold text-slate-900">Same-Day</span>
                <span className="text-slate-500 ml-1">Response Available</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">Residential & Commercial</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">Safe & Professional</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              ref={sliderRef}
              className="relative rounded-3xl overflow-hidden select-none cursor-ew-resize"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Imagem de trás */}
              <img
                src="./heroB.webp"
                alt="Before mould removal"
                className="w-full h-auto object-cover pointer-events-none"
                referrerPolicy="no-referrer"
                draggable={false}
              />

              {/* Imagem da frente mascarada */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <img
                  src="./heroA.webp"
                  alt="After mould removal"
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

              {/* Labels */}
              <div className="absolute top-4 left-4 z-20 bg-black/55 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full pointer-events-none">
                Before
              </div>

              <div className="absolute top-4 right-4 z-20 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full pointer-events-none">
                After
              </div>

              {/* Linha divisória */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 1px)` }}
              />

              {/* Botão do slider */}
              <button
                type="button"
                aria-label="Drag to compare before and after"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center touch-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="flex items-center justify-center gap-0.5 text-slate-700">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <span className="font-bold text-slate-900">Mould Spreads Fast</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mould can damage surfaces, affect air quality and quickly spread through
                damp areas if left untreated.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};