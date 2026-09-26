import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bookmark,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FactItem } from '../data/facts';
import { FactVisual } from './FactVisual';
import { sfx } from '../utils/audio';

interface FactCardProps {
  fact: FactItem;
  isSaved: boolean;
  onToggleSave: (fact: FactItem) => void;
  onOpenShare: (fact: FactItem) => void;
  cardIndex?: number;
  totalCards?: number;
  remainingInDeck?: number;
}

export const FactCard: React.FC<FactCardProps> = ({
  fact,
  isSaved,
  onToggleSave,
  onOpenShare,
  cardIndex,
  totalCards,
  remainingInDeck,
}) => {
  const [mindBlownCount, setMindBlownCount] = useState<number>(0);
  const [whatCount, setWhatCount] = useState<number>(0);

  const handleMindBlown = (e: React.MouseEvent) => {
    sfx.mindBlown();
    setMindBlownCount((prev) => prev + 1);

    // Fire confetti from the button origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
    });
  };

  const handleWhatReaction = () => {
    sfx.boing();
    setWhatCount((prev) => prev + 1);
  };

  return (
    <motion.div
      key={fact.id}
      initial={{ opacity: 0, y: 24, rotate: -0.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -24, rotate: 0.5 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-3xl retro-border retro-shadow-xl p-6 sm:p-8 md:p-10 transition-colors ${fact.palette.cardBg}`}
    >
      {/* Decorative Tape Sticker with Card Index */}
      <div className="absolute -top-3.5 left-8 transform -rotate-1 bg-yellow-300 border-2 border-black px-3 py-0.5 rounded-md retro-shadow-sm font-goofy text-[11px] font-extrabold uppercase tracking-wider text-black select-none pointer-events-none flex items-center gap-1.5">
        <span>★ DECK OF FACTS</span>
        {cardIndex !== undefined && totalCards !== undefined && (
          <span className="bg-black text-amber-300 px-1.5 py-0.2 rounded font-mono">
            #{cardIndex} / {totalCards}
          </span>
        )}
        <span>★</span>
      </div>

      {/* Top Header: Topic Badge + Tag Stamp + Action Icons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {/* Topic Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-black bg-white retro-shadow-sm font-goofy font-bold text-sm text-slate-900">
            <span className="text-xl">{fact.emoji}</span>
            <span>{fact.topicLabel}</span>
          </div>

          {/* Quirky Tag Stamp */}
          <div className="hidden sm:inline-block px-3 py-1 rounded-lg border-2 border-black bg-black text-amber-300 font-display text-xs tracking-wider uppercase transform rotate-1 retro-shadow-sm">
            {fact.quirkyTag}
          </div>

          {/* Zero Repeats Indicator */}
          <span className="hidden md:inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded-full">
            ✓ Zero Repeats
          </span>
        </div>

        {/* Quick Actions (Save, Share) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sfx.pop();
              onToggleSave(fact);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save fact'}
            className={`p-2.5 rounded-xl border-2 border-black transition-all active:scale-90 cursor-pointer retro-shadow-sm ${
              isSaved
                ? 'bg-amber-400 text-black'
                : 'bg-white text-slate-700 hover:bg-amber-100'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-black' : ''}`} />
          </button>

          <button
            onClick={() => {
              sfx.pop();
              onOpenShare(fact);
            }}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border-2 border-black bg-black hover:bg-slate-800 text-white font-goofy font-bold text-sm transition-all active:scale-95 cursor-pointer retro-shadow-sm"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Catchy Headline */}
      <h1 className="font-goofy font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight leading-snug mb-5">
        "{fact.headline}"
      </h1>

      {/* Visual Illustration / Artifact Frame */}
      <div className="mb-5">
        <FactVisual fact={fact} />
      </div>

      {/* Main Fact Explanation (Tight, punchy, straight to the point) */}
      <div className="p-5 sm:p-6 md:p-7 rounded-2xl border-3 border-black bg-white retro-shadow mb-6">
        <p className="text-base sm:text-lg md:text-xl font-medium text-slate-800 leading-relaxed">
          {fact.fact}
        </p>
      </div>

      {/* Interactive Reactions Bar */}
      <div className="pt-4 border-t-2 border-black/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mind Blown Button */}
          <button
            onClick={handleMindBlown}
            className="flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl border-2 border-black bg-white hover:bg-amber-100 font-goofy font-bold text-sm text-slate-900 transition-transform active:scale-95 cursor-pointer retro-shadow-sm"
          >
            <span className="text-xl">🤯</span>
            <span>Mind Blown</span>
            {mindBlownCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-xs font-mono font-bold">
                +{mindBlownCount}
              </span>
            )}
          </button>

          {/* Excuse Me What Button */}
          <button
            onClick={handleWhatReaction}
            className="flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl border-2 border-black bg-white hover:bg-slate-100 font-goofy font-bold text-sm text-slate-900 transition-transform active:scale-95 cursor-pointer retro-shadow-sm"
          >
            <span className="text-xl">🤨</span>
            <span>Excuse Me What?</span>
            {whatCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-black text-xs font-mono font-bold">
                +{whatCount}
              </span>
            )}
          </button>
        </div>

        {/* Deck Status / Astonishment rating */}
        <div className="flex items-center gap-2">
          {remainingInDeck !== undefined && (
            <span className="text-xs font-mono font-bold text-slate-600 bg-white/70 py-1.5 px-2.5 rounded-xl border border-black/20">
              {remainingInDeck} cards left
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/80 py-1.5 px-3 rounded-xl border border-black/30">
            <span>Astonishment:</span>
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < fact.mindBlownRating ? 'text-amber-500' : 'text-slate-300'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
