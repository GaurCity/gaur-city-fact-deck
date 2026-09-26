import React from 'react';
import { Compass, Info, ArrowRight, Zap, Eye, Activity, ShieldCheck } from 'lucide-react';
import { FactItem } from '../data/facts';

interface FactVisualProps {
  fact: FactItem;
  className?: string;
  isCompact?: boolean;
}

export const FactVisual: React.FC<FactVisualProps> = ({
  fact,
  className = '',
  isCompact = false,
}) => {
  const sc = fact.schematic;

  return (
    <div
      className={`relative w-full rounded-2xl border-2 sm:border-3 border-black bg-white overflow-hidden retro-shadow-sm transition-all ${className}`}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b-2 border-black bg-amber-100/70">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-black bg-yellow-300 text-black font-goofy text-[10px] font-extrabold uppercase tracking-wider select-none">
            <span>★</span>
            <span>{sc.badge}</span>
          </span>
          <span className="font-mono text-[11px] font-bold text-slate-700 hidden sm:inline-block">
            REF #{fact.id.toUpperCase()}
          </span>
        </div>

        {sc.metricLabel && sc.metricValue && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-black bg-white font-mono text-[11px] font-bold text-slate-900 shadow-2xs">
            <span className="text-slate-500 font-normal">{sc.metricLabel}:</span>
            <span className="text-amber-800">{sc.metricValue}</span>
          </div>
        )}
      </div>

      {/* Main Vector Schematic Stage */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-white">
        {/* DIAGRAM 1: Marathon Route Timeline */}
        {sc.diagramType === 'timeline-marathon' && (
          <div className="space-y-3">
            <div className="relative pt-2 pb-1">
              <div className="h-2 bg-slate-200 border border-black rounded-full relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500" />
              </div>

              {/* Waypoints along the marathon */}
              <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                <div className="p-2 rounded-xl border border-black bg-amber-50">
                  <span className="font-mono text-[10px] font-extrabold text-amber-900 block">MILE 0</span>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">90°F Start</p>
                  <span className="text-[10px] text-slate-500 block">1 water station</span>
                </div>
                <div className="p-2 rounded-xl border border-black bg-orange-50">
                  <span className="font-mono text-[10px] font-extrabold text-orange-900 block">MILE 9</span>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">11-Mile Car Ride</p>
                  <span className="text-[10px] text-slate-500 block">Dropped as prank</span>
                </div>
                <div className="p-2 rounded-xl border border-black bg-rose-50">
                  <span className="font-mono text-[10px] font-extrabold text-rose-900 block">MILE 19</span>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Rat Poison Dose</p>
                  <span className="text-[10px] text-slate-500 block">Strychnine + brandy</span>
                </div>
                <div className="p-2 rounded-xl border-2 border-black bg-yellow-200">
                  <span className="font-mono text-[10px] font-extrabold text-black block">MILE 26.2</span>
                  <p className="text-[11px] font-extrabold text-slate-950 leading-tight">Gold Medal</p>
                  <span className="text-[10px] text-slate-600 block">Hallucinating finish</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM 2: Recurrent Laryngeal Nerve Detour */}
        {sc.diagramType === 'nerve-detour' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl border-2 border-black bg-emerald-200 flex items-center justify-center font-bold text-sm">
                  🧠
                </div>
                <span className="text-[10px] font-mono font-bold mt-1">Brainstem</span>
              </div>

              <div className="flex-1 sm:w-32 flex flex-col items-center px-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold mb-0.5">3-ft downward loop ↓</span>
                <div className="w-full h-1 bg-emerald-500 rounded relative">
                  <span className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl border-2 border-black bg-rose-200 flex items-center justify-center font-bold text-sm">
                  🫀
                </div>
                <span className="text-[10px] font-mono font-bold mt-1">Aortic Arch</span>
              </div>

              <div className="flex-1 sm:w-32 flex flex-col items-center px-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold mb-0.5">↑ returns to neck</span>
                <div className="w-full h-1 bg-emerald-500 rounded" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl border-2 border-black bg-amber-200 flex items-center justify-center font-bold text-sm">
                  🗣️
                </div>
                <span className="text-[10px] font-mono font-bold mt-1">Vocal Cords</span>
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl border border-black bg-emerald-50 text-[11px] font-mono text-emerald-950 font-medium">
              <span className="font-bold">Ancestral Fish Relic:</span> Giraffe nerve length is ~15 feet!
            </div>
          </div>
        )}

        {/* DIAGRAM 3: Lycurgus Cup Dichroic Optics */}
        {sc.diagramType === 'optical-cup' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border-2 border-black bg-emerald-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-black bg-emerald-400 flex items-center justify-center text-xl shrink-0">
                ☀️
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-900 block">
                  REFLECTED DIRECT LIGHT
                </span>
                <h4 className="font-goofy font-extrabold text-sm text-emerald-950">Appears Jade Green</h4>
                <p className="text-[11px] text-emerald-800 leading-tight">Light scatters off 70nm silver particles</p>
              </div>
            </div>

            <div className="p-3 rounded-xl border-2 border-black bg-rose-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-black bg-rose-500 text-white flex items-center justify-center text-xl shrink-0">
                💡
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase text-rose-900 block">
                  TRANSMITTED BACKLIGHT
                </span>
                <h4 className="font-goofy font-extrabold text-sm text-rose-950">Glows Ruby Red</h4>
                <p className="text-[11px] text-rose-800 leading-tight">Surface plasmon resonance transmits red wavebands</p>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM 4: Typewriter QWERTY Mechanical Arm Separation */}
        {sc.diagramType === 'typewriter-qwerty' && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl border border-black bg-rose-50">
                <span className="text-[10px] font-mono font-bold text-rose-800 block">ALPHABETICAL LAYOUT (1860s)</span>
                <p className="text-xs font-bold text-slate-800">Frequent letters adjacent (TH, ER)</p>
                <span className="text-[11px] text-rose-700 font-semibold block mt-1">⚠️ Mechanical arms collide and jam</span>
              </div>
              <div className="p-2.5 rounded-xl border-2 border-black bg-emerald-50">
                <span className="text-[10px] font-mono font-bold text-emerald-800 block">QWERTY SEPARATION (1873)</span>
                <p className="text-xs font-bold text-slate-800">Letters spaced across opposite quadrants</p>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-1">✓ Zero collision during rapid keypress</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold bg-slate-100 p-1.5 rounded-xl border border-black">
              <span>Q W E R T Y</span>
              <span className="text-slate-400">|</span>
              <span>U I O P</span>
            </div>
          </div>
        )}

        {/* DIAGRAM 5: Entasis Column Optical Correction */}
        {sc.diagramType === 'entasis-columns' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-black bg-stone-100 flex items-center gap-3">
              <div className="w-10 h-14 border border-black bg-white rounded-none flex items-center justify-center text-xs font-mono font-bold shrink-0">
                | |
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-600 block">WITHOUT ENTASIS</span>
                <p className="text-xs font-bold text-slate-800">Appears pinched & concave to human eyes</p>
                <span className="text-[10px] text-rose-700 font-medium">Eye illusion ruins scale</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border-2 border-black bg-amber-100 flex items-center gap-3">
              <div className="w-10 h-14 border-2 border-black bg-white rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0">
                ( )
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-900 block">WITH PARTHENON ENTASIS</span>
                <p className="text-xs font-extrabold text-slate-900">+1.7cm convex swell in center</p>
                <span className="text-[10px] text-emerald-700 font-bold">Appears perfectly vertical</span>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM 6: Mpemba Convection Loops */}
        {sc.diagramType === 'mpemba-convection' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-black bg-blue-50 text-center">
              <span className="text-[10px] font-mono font-bold text-blue-800 block">COLD WATER TUBE</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Stagnant density gradient</p>
              <span className="text-[10px] text-slate-500 block mt-1">Slow heat dissipation</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-black bg-amber-50 text-center">
              <span className="text-[10px] font-mono font-bold text-amber-900 block">HOT WATER TUBE</span>
              <p className="text-xs font-extrabold text-slate-900 mt-1">Violent convection currents</p>
              <span className="text-[10px] text-amber-800 font-bold block mt-1">Rapid evaporative freeze</span>
            </div>
          </div>
        )}

        {/* DIAGRAM 7: Reynolds Dilatancy Granular Spheres */}
        {sc.diagramType === 'dilatancy-grains' && (
          <div className="p-3 rounded-xl border border-black bg-yellow-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-black bg-yellow-200 flex items-center justify-center text-xl shrink-0">
                🦶
              </div>
              <div>
                <h4 className="font-goofy font-extrabold text-xs sm:text-sm text-slate-900">
                  Footprint Pressure on Wet Beach Sand
                </h4>
                <p className="text-[11px] text-slate-600">
                  Shear force expands void space between granules, creating suction that draws surface water down.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-black bg-white shrink-0">
              Δ Void Volume &gt; 0
            </span>
          </div>
        )}

        {/* DIAGRAM 8: Saccadic Suppression Clock */}
        {sc.diagramType === 'saccade-clock' && (
          <div className="p-3 rounded-xl border border-black bg-cyan-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-black bg-cyan-200 flex items-center justify-center text-xl shrink-0">
                👁️
              </div>
              <div>
                <h4 className="font-goofy font-extrabold text-xs sm:text-sm text-slate-900">
                  Visual Cortex Chronostasis
                </h4>
                <p className="text-[11px] text-slate-600">
                  Brain blocks 30–50ms of visual feed during every flick to prevent motion sickness.
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono text-sm font-extrabold text-cyan-950 block">40 MIN / DAY</span>
              <span className="text-[10px] text-slate-500 font-mono">Total suppression</span>
            </div>
          </div>
        )}

        {/* DIAGRAM 9: Mammalian Dive Reflex */}
        {sc.diagramType === 'dive-reflex' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-black bg-sky-50 flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-sky-700 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-800 block">HEART RATE</span>
                <span className="font-extrabold text-sm text-slate-900">Plummets by ~50%</span>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-black bg-sky-50 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-800 block">SPLEEN CONTRACTION</span>
                <span className="font-extrabold text-sm text-slate-900">+10% Red blood cells</span>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM 10: Generic Museum Plate for all other curated facts */}
        {sc.diagramType === 'generic-specimen' && (
          <div className="p-3.5 rounded-xl border border-black/30 bg-amber-50/70 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{fact.emoji}</span>
                <span className="font-display text-xs tracking-wider uppercase text-slate-900">
                  {fact.topicLabel} Specimen Archive
                </span>
              </div>
              <p className="text-xs font-medium text-slate-700 leading-snug">
                {sc.caption}
              </p>
            </div>

            <div
              className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-black ${sc.accentBg} flex items-center justify-center text-2xl select-none`}
            >
              {sc.symbol}
            </div>
          </div>
        )}

        {/* Footer Technical Tags */}
        {sc.tags && sc.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-200">
            {sc.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
