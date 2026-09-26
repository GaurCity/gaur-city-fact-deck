import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FactItem, getRecentDailyFacts } from '../data/facts';
import { FactVisual } from './FactVisual';
import { sfx } from '../utils/audio';

interface FactOfTheDaySpotlightProps {
  onOpenShare: (fact: FactItem, isDaily: boolean, dateLabel: string) => void;
  isSaved: boolean;
  onToggleSave: (fact: FactItem) => void;
  onExploreCategory: (category: string) => void;
}

export const FactOfTheDaySpotlight: React.FC<FactOfTheDaySpotlightProps> = ({
  onOpenShare,
  isSaved,
  onToggleSave,
  onExploreCategory,
}) => {
  const recentDays = getRecentDailyFacts(7);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [streak, setStreak] = useState<number>(1);
  const [mindBlownCount, setMindBlownCount] = useState<number>(0);

  const activeDaily = recentDays[selectedDayIndex] || recentDays[0];
  const activeFact = activeDaily.fact;

  // Streak logic from localStorage
  useEffect(() => {
    try {
      const todayKey = recentDays[0].dateKey;
      const lastVisitKey = localStorage.getItem('deckoffacts_last_daily_date');
      const storedStreak = parseInt(localStorage.getItem('deckoffacts_streak') || '1', 10);

      if (lastVisitKey === todayKey) {
        setStreak(storedStreak);
      } else if (lastVisitKey) {
        const lastDate = new Date(lastVisitKey);
        const todayDate = new Date(todayKey);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          const newStreak = storedStreak + 1;
          setStreak(newStreak);
          localStorage.setItem('deckoffacts_streak', String(newStreak));
        } else {
          setStreak(1);
          localStorage.setItem('deckoffacts_streak', '1');
        }
        localStorage.setItem('deckoffacts_last_daily_date', todayKey);
      } else {
        localStorage.setItem('deckoffacts_last_daily_date', todayKey);
        localStorage.setItem('deckoffacts_streak', '1');
      }
    } catch {}
  }, []);

  // Countdown timer to midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMindBlown = (e: React.MouseEvent) => {
    sfx.mindBlown();
    setMindBlownCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
    });
  };

  return (
    <div className="w-full relative">
      {/* Top Bar for Fact of the Day: Date, Streak, Countdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-black bg-amber-300 font-display text-xs tracking-wider uppercase text-black retro-shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Fact Of The Day</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-black bg-white font-goofy text-xs font-bold text-slate-800 retro-shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{activeDaily.formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 border-black bg-orange-100 font-goofy text-xs font-extrabold text-orange-950 retro-shadow-sm"
            title="Your consecutive daily trivia check-in streak"
          >
            <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
            <span>{streak} Day Streak</span>
          </div>

          {/* Next Drop Timer */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 border-black bg-white font-mono text-xs font-bold text-slate-700 retro-shadow-sm"
            title="Time until tomorrow's fresh daily fact"
          >
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Next in {timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Card for Daily Fact */}
      <motion.div
        key={activeFact.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-3xl retro-border retro-shadow-xl bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100 p-6 sm:p-8 md:p-10 border-black overflow-hidden"
      >
        {/* Background decorative watermark */}
        <div className="absolute right-4 bottom-2 text-9xl font-display opacity-5 select-none pointer-events-none">
          DAILY
        </div>

        {/* Header inside the Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onExploreCategory(activeFact.topic)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-black bg-white hover:bg-amber-100 transition-colors font-goofy font-bold text-sm text-slate-900 retro-shadow-sm cursor-pointer"
              title="Click to filter by this category"
            >
              <span className="text-xl">{activeFact.emoji}</span>
              <span>{activeFact.topicLabel}</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300">
                Filter Category ↗
              </span>
            </button>

            <span className="px-3 py-1 rounded-lg border-2 border-black bg-black text-amber-300 font-display text-xs tracking-wider uppercase transform -rotate-1 retro-shadow-sm">
              ★ {activeDaily.isToday ? "Today's Spotlight" : activeDaily.relativeLabel}
            </span>
          </div>

          {/* Quick Action Icons (Bookmark, Share) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sfx.pop();
                onToggleSave(activeFact);
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
                onOpenShare(activeFact, true, activeDaily.formattedDate);
              }}
              className="flex items-center gap-2 py-2.5 px-5 rounded-xl border-2 border-black bg-black hover:bg-slate-800 text-white font-goofy font-extrabold text-sm transition-all active:scale-95 cursor-pointer retro-shadow-sm"
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>Share Daily Fact</span>
            </button>
          </div>
        </div>

        {/* Catchy Headline */}
        <h2 className="font-goofy font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight leading-snug mb-5 relative z-10">
          "{activeFact.headline}"
        </h2>

        {/* Visual Illustration / Artifact Frame */}
        <div className="mb-5 relative z-10">
          <FactVisual fact={activeFact} />
        </div>

        {/* Fact Detail Description */}
        <div className="p-5 sm:p-6 md:p-7 rounded-2xl border-3 border-black bg-white retro-shadow mb-6 relative z-10">
          <p className="text-base sm:text-lg md:text-xl font-medium text-slate-800 leading-relaxed">
            {activeFact.fact}
          </p>
        </div>

        {/* Reaction Row */}
        <div className="pt-4 border-t-2 border-black/15 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3">
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
          </div>

          {/* Quick indicator of day navigation */}
          <div className="text-xs font-bold text-slate-700 bg-white/80 py-1.5 px-3 rounded-xl border border-black/30">
            <span>Daily Drop: </span>
            <span className="font-extrabold text-slate-950">{activeDaily.relativeLabel}</span>
          </div>
        </div>
      </motion.div>

      {/* Past 7 Days History Selector Strip */}
      <div className="mt-4 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Catch Up on Recent Daily Drops</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">Last 7 days</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {recentDays.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.dateKey}
                onClick={() => {
                  sfx.pop();
                  setSelectedDayIndex(idx);
                }}
                className={`flex items-center gap-2 py-2 px-3 rounded-xl border-2 border-black text-xs font-goofy font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-black retro-shadow-sm scale-102 font-extrabold ring-1 ring-black'
                    : 'bg-white text-slate-700 hover:bg-amber-50'
                }`}
              >
                <span>{day.fact.emoji}</span>
                <span className="font-semibold">{day.relativeLabel}</span>
                {day.isToday && (
                  <span className="text-[10px] bg-black text-amber-300 px-1 py-0.2 rounded font-mono font-bold">
                    TODAY
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
