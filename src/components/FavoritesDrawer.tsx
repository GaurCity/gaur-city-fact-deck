import React from 'react';
import { X, Trash2, Share2, ArrowRight } from 'lucide-react';
import { FactItem } from '../data/facts';
import { sfx } from '../utils/audio';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedFacts: FactItem[];
  onSelectFact: (fact: FactItem) => void;
  onRemoveFact: (id: string) => void;
  onOpenShare: (fact: FactItem) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedFacts,
  onSelectFact,
  onRemoveFact,
  onOpenShare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#FFFDF5] rounded-3xl retro-border retro-shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <h2 className="font-display text-xl text-slate-900 tracking-wide uppercase">
                Saved Brain Vault
              </h2>
              <p className="text-xs font-medium text-slate-600">
                {savedFacts.length} {savedFacts.length === 1 ? 'fact' : 'facts'} saved to your memory bank
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.pop();
              onClose();
            }}
            className="p-2 rounded-xl border-2 border-black bg-white hover:bg-rose-100 transition-colors cursor-pointer retro-shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Facts List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {savedFacts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <span className="text-5xl block animate-bounce">🧠</span>
              <p className="font-goofy font-bold text-lg text-slate-800">
                Your brain vault is empty!
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the bookmark icon on any fact card to store weird knowledge for group chats and trivia nights.
              </p>
            </div>
          ) : (
            savedFacts.map((fact) => (
              <div
                key={fact.id}
                className="p-4 rounded-2xl border-2 border-black bg-white retro-shadow-sm hover:border-black transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{fact.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                      {fact.topicLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenShare(fact)}
                      className="p-1.5 rounded-lg border border-black hover:bg-amber-100 transition-colors cursor-pointer"
                      title="Share fact"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        sfx.pop();
                        onRemoveFact(fact.id);
                      }}
                      className="p-1.5 rounded-lg border border-black hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl border border-black ${fact.schematic.accentBg} flex items-center justify-center text-2xl shrink-0`}>
                    {fact.schematic.symbol}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-goofy font-bold text-sm sm:text-base text-slate-900 leading-snug truncate">
                      "{fact.headline}"
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {fact.fact}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide truncate max-w-[260px]">
                    ★ {fact.quirkyTag}
                  </span>
                  <button
                    onClick={() => {
                      sfx.pop();
                      onSelectFact(fact);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-black hover:underline cursor-pointer"
                  >
                    <span>View Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
