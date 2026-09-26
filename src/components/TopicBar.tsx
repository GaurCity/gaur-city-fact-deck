import React from 'react';
import { Layers, RotateCcw } from 'lucide-react';
import { TOPICS, TopicId, GOOFY_TONES } from '../data/facts';
import { sfx } from '../utils/audio';

interface TopicBarProps {
  currentTopic: TopicId;
  onSelectTopic: (topic: TopicId) => void;
  categoryCounts?: Record<string, number>;
  currentTone: string;
  onSelectTone: (tone: string) => void;
  onNextRandom: () => void;
  remainingInDeck: number;
  totalInDeck: number;
  onReshuffle: () => void;
}

export const TopicBar: React.FC<TopicBarProps> = ({
  currentTopic,
  onSelectTopic,
  categoryCounts,
  currentTone,
  onSelectTone,
  onNextRandom,
  remainingInDeck,
  totalInDeck,
  onReshuffle,
}) => {
  const isExhausted = remainingInDeck === 0;

  return (
    <div className="w-full space-y-4">
      {/* Category Tabs: Clean segmented controls */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-display">
              Select Category
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              (History · Human Body · Literature · Science · Other)
            </span>
          </div>
          <span className="text-xs font-bold text-amber-700 hidden sm:inline-block">
            {TOPICS.find((t) => t.id === currentTopic)?.description}
          </span>
        </div>

        {/* Topic buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TOPICS.map((topic) => {
            const isActive = currentTopic === topic.id;
            const count = categoryCounts ? categoryCounts[topic.id] : undefined;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  sfx.pop();
                  onSelectTopic(topic.id);
                }}
                className={`flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl border-2 border-black font-goofy font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black retro-shadow-sm scale-102 font-extrabold ring-1 ring-black'
                    : 'bg-white text-slate-800 hover:bg-amber-100 hover:border-black'
                }`}
              >
                <span className="text-base">{topic.emoji}</span>
                <span>{topic.label}</span>
                {count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black text-amber-300 font-bold' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Curated Vibe Filter & Deck Counter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
            Vibe:
          </span>
          {GOOFY_TONES.map((tone) => {
            const active = currentTone === tone.id;
            return (
              <button
                key={tone.id}
                onClick={() => {
                  sfx.pop();
                  onSelectTone(tone.id);
                }}
                className={`py-1.5 px-3 rounded-xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'border-black bg-slate-900 text-white shadow-xs'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-black'
                }`}
              >
                <span>{tone.label}</span>
              </button>
            );
          })}

          <div className="ml-auto sm:ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-black/30 bg-white text-xs font-mono font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>
              {isExhausted ? 'Deck empty' : `${remainingInDeck} unseen in deck`}
            </span>
          </div>
        </div>

        {/* Action Button: Draw Next Card (Guaranteed Zero Repeats) */}
        {isExhausted ? (
          <button
            onClick={() => {
              sfx.pop();
              onReshuffle();
            }}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border-3 border-black bg-emerald-400 hover:bg-emerald-300 active:translate-y-0.5 text-black font-goofy font-extrabold text-sm sm:text-base tracking-wide transition-all retro-shadow cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-black" />
            <span>Deck Finished! Reshuffle Deck 🔄</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sfx.boing();
              onNextRandom();
            }}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border-3 border-black bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 text-black font-goofy font-extrabold text-sm sm:text-base tracking-wide transition-all retro-shadow cursor-pointer"
          >
            <Layers className="w-5 h-5 text-black" />
            <span>Draw Next Card 🃏</span>
            <span className="hidden sm:inline-block text-[11px] bg-black text-amber-300 px-2 py-0.5 rounded-full font-sans font-bold">
              No Repeats
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
