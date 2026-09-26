import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Bookmark,
  Calendar,
  Layers,
  History as HistoryIcon,
  Sparkles,
} from 'lucide-react';
import { CURATED_FACTS, FactItem, TOPICS, TopicId, getFactOfTheDay } from './data/facts';
import { FactCard } from './components/FactCard';
import { TopicBar } from './components/TopicBar';
import { FactOfTheDaySpotlight } from './components/FactOfTheDaySpotlight';
import { ShareModal } from './components/ShareModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { sfx } from './utils/audio';

export default function App() {
  // Main view mode: 'daily' (Fact of the Day Spotlight) or 'browse' (Category Explorer)
  const [viewMode, setViewMode] = useState<'daily' | 'browse'>('daily');

  // Active category & vibe filter
  const [currentTopic, setCurrentTopic] = useState<TopicId>('all');
  const [currentTone, setCurrentTone] = useState<string>('mind-blown');

  // Master facts pool
  const allFacts = useMemo(() => CURATED_FACTS, []);

  // Non-repeating deck state: track drawn fact IDs per category
  // Maps TopicId -> array of already drawn IDs in the current cycle
  const [drawnByTopic, setDrawnByTopic] = useState<Record<string, string[]>>(() => {
    return {
      all: [],
      history: [],
      'human-body': [],
      literature: [],
      science: [],
      other: [],
    };
  });

  // Current active fact ID in Category Explorer
  const [currentFactId, setCurrentFactId] = useState<string>(() => {
    return CURATED_FACTS[0].id;
  });

  // Session history of recently drawn cards
  const [recentDrawnIds, setRecentDrawnIds] = useState<string[]>([CURATED_FACTS[0].id]);

  // Fact of the Day calculation
  const todayResult = useMemo(() => getFactOfTheDay(), []);

  // Saved/Bookmarked facts in LocalStorage
  const [savedFacts, setSavedFacts] = useState<FactItem[]>(() => {
    try {
      const stored = localStorage.getItem('deckoffacts_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sound FX toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('deckoffacts_sound');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  // Share Modal state
  const [shareConfig, setShareConfig] = useState<{
    fact: FactItem;
    isDaily?: boolean;
    dateLabel?: string;
  } | null>(null);

  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);

  // Sync sound settings
  useEffect(() => {
    sfx.enabled = soundEnabled;
    try {
      localStorage.setItem('deckoffacts_sound', JSON.stringify(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  // Save bookmarked facts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deckoffacts_saved', JSON.stringify(savedFacts));
    } catch {}
  }, [savedFacts]);

  // Category total counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allFacts.length };
    TOPICS.forEach((t) => {
      if (t.id !== 'all') {
        counts[t.id] = allFacts.filter((f) => f.topic === t.id).length;
      }
    });
    return counts;
  }, [allFacts]);

  // Filtered pool of facts for currently selected category
  const filteredFacts = useMemo(() => {
    if (currentTopic === 'all') return allFacts;
    return allFacts.filter((f) => f.topic === currentTopic);
  }, [allFacts, currentTopic]);

  // Currently drawn IDs in active category
  const alreadyDrawnInCurrent = useMemo(() => {
    return drawnByTopic[currentTopic] || [];
  }, [drawnByTopic, currentTopic]);

  // Unseen facts remaining in the deck for this category (guarantees NO REPEATS)
  const remainingFactsInDeck = useMemo(() => {
    return filteredFacts.filter((f) => !alreadyDrawnInCurrent.includes(f.id));
  }, [filteredFacts, alreadyDrawnInCurrent]);

  // Active Fact Item to display
  const currentFact: FactItem = useMemo(() => {
    const found = allFacts.find((f) => f.id === currentFactId);
    if (found && (currentTopic === 'all' || found.topic === currentTopic)) {
      return found;
    }
    return filteredFacts[0] || allFacts[0];
  }, [allFacts, currentFactId, currentTopic, filteredFacts]);

  // When current topic changes, ensure current card matches category
  useEffect(() => {
    if (currentFact.topic !== currentTopic && currentTopic !== 'all') {
      // Pick next card from unseen or first in category
      const candidates = remainingFactsInDeck.length > 0 ? remainingFactsInDeck : filteredFacts;
      if (candidates.length > 0) {
        const next = candidates[0];
        setCurrentFactId(next.id);
        setDrawnByTopic((prev) => ({
          ...prev,
          [currentTopic]: [...(prev[currentTopic] || []).filter((id) => id !== next.id), next.id],
        }));
      }
    }
  }, [currentTopic, currentFact.topic, remainingFactsInDeck, filteredFacts]);

  // DRAW NEXT CARD: 100% GUARANTEED ZERO REPEATS
  const handleDrawNextCard = useCallback(() => {
    if (filteredFacts.length === 0) return;

    // Filter out the current card and any already drawn card
    const available = remainingFactsInDeck.filter((f) => f.id !== currentFact.id);

    if (available.length > 0) {
      // Pick random unseen card from the remaining deck
      const nextIndex = Math.floor(Math.random() * available.length);
      const nextCard = available[nextIndex];
      setCurrentFactId(nextCard.id);

      setDrawnByTopic((prev) => ({
        ...prev,
        [currentTopic]: [...(prev[currentTopic] || []), nextCard.id],
      }));

      setRecentDrawnIds((prev) => [nextCard.id, ...prev.filter((id) => id !== nextCard.id).slice(0, 15)]);
    } else {
      // Deck is exhausted! Reshuffle and start fresh cycle
      sfx.ding();
      const freshPool = filteredFacts.filter((f) => f.id !== currentFact.id);
      const nextCard = freshPool[Math.floor(Math.random() * freshPool.length)] || filteredFacts[0];
      setCurrentFactId(nextCard.id);

      setDrawnByTopic((prev) => ({
        ...prev,
        [currentTopic]: [nextCard.id],
      }));

      setRecentDrawnIds((prev) => [nextCard.id, ...prev.filter((id) => id !== nextCard.id).slice(0, 15)]);
    }
  }, [filteredFacts, remainingFactsInDeck, currentFact.id, currentTopic]);

  // Manual Reshuffle Deck
  const handleReshuffleDeck = useCallback(() => {
    sfx.mindBlown();
    setDrawnByTopic((prev) => ({
      ...prev,
      [currentTopic]: [],
    }));
    // Draw a fresh card
    const nextCard = filteredFacts[Math.floor(Math.random() * filteredFacts.length)] || filteredFacts[0];
    if (nextCard) {
      setCurrentFactId(nextCard.id);
      setDrawnByTopic((prev) => ({
        ...prev,
        [currentTopic]: [nextCard.id],
      }));
    }
  }, [filteredFacts, currentTopic]);

  // Toggle bookmark
  const handleToggleSave = (factToSave: FactItem) => {
    setSavedFacts((prev) => {
      const exists = prev.some((f) => f.id === factToSave.id);
      if (exists) {
        return prev.filter((f) => f.id !== factToSave.id);
      } else {
        return [factToSave, ...prev];
      }
    });
  };

  const isCurrentFactSaved = savedFacts.some((f) => f.id === currentFact?.id);
  const isDailyFactSaved = savedFacts.some((f) => f.id === todayResult.fact?.id);

  // Jump from daily fact into category explorer
  const handleExploreCategory = (category: string) => {
    sfx.pop();
    const validTopic = TOPICS.find((t) => t.id === category)?.id || 'all';
    setCurrentTopic(validTopic as TopicId);
    setViewMode('browse');
  };

  // Card progress calculations
  const totalInCurrentDeck = filteredFacts.length;
  const currentCardNumber = Math.min(
    totalInCurrentDeck,
    Math.max(1, alreadyDrawnInCurrent.length === 0 ? 1 : alreadyDrawnInCurrent.length)
  );

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b-2 border-slate-900 px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              sfx.pop();
              setViewMode('daily');
            }}
            className="font-display text-xl sm:text-2xl tracking-tight text-slate-950 uppercase hover:text-amber-600 transition-colors"
          >
            Deck of Facts
          </a>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md border border-black bg-yellow-300 font-goofy text-[10px] font-extrabold text-black">
            NO REPEATS
          </span>
        </div>

        {/* Categories: History, Human Body, Literature, Science, Other */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-goofy font-bold text-slate-700">
          <button
            onClick={() => {
              sfx.pop();
              setViewMode('daily');
            }}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'daily'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : 'hover:text-black'
            }`}
          >
            <span>⭐ Fact of the Day</span>
          </button>

          <span className="text-slate-300">|</span>

          <button
            onClick={() => {
              sfx.pop();
              setCurrentTopic('history');
              setViewMode('browse');
            }}
            className={`hover:text-black transition-colors cursor-pointer ${
              viewMode === 'browse' && currentTopic === 'history'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : ''
            }`}
          >
            👑 History
          </button>

          <button
            onClick={() => {
              sfx.pop();
              setCurrentTopic('human-body');
              setViewMode('browse');
            }}
            className={`hover:text-black transition-colors cursor-pointer ${
              viewMode === 'browse' && currentTopic === 'human-body'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : ''
            }`}
          >
            🧠 Human Body
          </button>

          <button
            onClick={() => {
              sfx.pop();
              setCurrentTopic('literature');
              setViewMode('browse');
            }}
            className={`hover:text-black transition-colors cursor-pointer ${
              viewMode === 'browse' && currentTopic === 'literature'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : ''
            }`}
          >
            📚 Literature
          </button>

          <button
            onClick={() => {
              sfx.pop();
              setCurrentTopic('science');
              setViewMode('browse');
            }}
            className={`hover:text-black transition-colors cursor-pointer ${
              viewMode === 'browse' && currentTopic === 'science'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : ''
            }`}
          >
            🔬 Science
          </button>

          <button
            onClick={() => {
              sfx.pop();
              setCurrentTopic('other');
              setViewMode('browse');
            }}
            className={`hover:text-black transition-colors cursor-pointer ${
              viewMode === 'browse' && currentTopic === 'other'
                ? 'text-black underline underline-offset-4 decoration-2 decoration-amber-400 font-extrabold'
                : ''
            }`}
          >
            ⚡ Other
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) sfx.pop();
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            className="p-2 sm:p-2.5 rounded-xl border-2 border-black bg-white hover:bg-slate-100 transition-colors retro-shadow-sm cursor-pointer"
            title={soundEnabled ? 'Sound FX On' : 'Sound FX Muted'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-black" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Brain Vault */}
          <button
            onClick={() => {
              sfx.pop();
              setIsVaultOpen(true);
            }}
            className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl border-2 border-black bg-amber-300 hover:bg-amber-400 text-black font-goofy font-bold text-xs sm:text-sm transition-transform active:scale-95 retro-shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Bookmark className="w-4 h-4 fill-black" />
            <span className="hidden sm:inline">Brain Vault</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black text-amber-300 text-xs font-mono font-bold">
              {savedFacts.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-8">
        {/* Main View Switcher Segmented Control */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl border-2 border-black bg-white retro-shadow-sm gap-1">
            <button
              onClick={() => {
                sfx.pop();
                setViewMode('daily');
              }}
              className={`flex items-center gap-2 py-2 px-4 sm:px-5 rounded-xl font-goofy text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'daily'
                  ? 'bg-amber-400 text-black border-2 border-black shadow-xs font-extrabold'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>⭐ Fact of the Day</span>
            </button>

            <button
              onClick={() => {
                sfx.pop();
                setViewMode('browse');
              }}
              className={`flex items-center gap-2 py-2 px-4 sm:px-5 rounded-xl font-goofy text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'browse'
                  ? 'bg-amber-400 text-black border-2 border-black shadow-xs font-extrabold'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Deck Categories (No Repeats)</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: FACT OF THE DAY SPOTLIGHT */}
        {viewMode === 'daily' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Fact of the Day Spotlight Feature */}
            <FactOfTheDaySpotlight
              onOpenShare={(fact, isDaily, dateLabel) => {
                setShareConfig({ fact, isDaily, dateLabel });
              }}
              isSaved={isDailyFactSaved}
              onToggleSave={handleToggleSave}
              onExploreCategory={handleExploreCategory}
            />

            {/* Quick jump to Explore Categories */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-black/30 bg-amber-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-goofy font-bold text-base text-slate-900">
                  Ready to draw from the deck?
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Draw cards across History, Human Body, Literature, Science, and Other categories with guaranteed zero repeats.
                </p>
              </div>
              <button
                onClick={() => {
                  sfx.pop();
                  setViewMode('browse');
                }}
                className="py-2.5 px-4 rounded-xl border-2 border-black bg-white hover:bg-amber-200 font-goofy font-bold text-xs text-black retro-shadow-sm transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Draw From Deck →
              </button>
            </div>
          </div>
        )}

        {/* View Mode 2: CATEGORY EXPLORER & FILTERING */}
        {viewMode === 'browse' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black bg-white retro-shadow-sm font-goofy text-xs font-bold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Zero-Repeat Deck Dealing</span>
                <span aria-hidden="true">·</span>
                <span>History · Human Body · Literature · Science · Other</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
                Deck of Facts
              </h2>
            </div>

            {/* Filter and Control Bar */}
            <TopicBar
              currentTopic={currentTopic}
              onSelectTopic={(t) => {
                setCurrentTopic(t);
              }}
              categoryCounts={categoryCounts}
              currentTone={currentTone}
              onSelectTone={setCurrentTone}
              onNextRandom={handleDrawNextCard}
              remainingInDeck={remainingFactsInDeck.length}
              totalInDeck={totalInCurrentDeck}
              onReshuffle={handleReshuffleDeck}
            />

            {/* Central Fact Card */}
            {currentFact && (
              <FactCard
                fact={currentFact}
                isSaved={isCurrentFactSaved}
                onToggleSave={handleToggleSave}
                onOpenShare={(f) => setShareConfig({ fact: f, isDaily: false })}
                cardIndex={currentCardNumber}
                totalCards={totalInCurrentDeck}
                remainingInDeck={remainingFactsInDeck.length}
              />
            )}

            {/* Recently Drawn Cards in Session */}
            {recentDrawnIds.length > 1 && (
              <div className="pt-6 border-t-2 border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 font-display">
                    <HistoryIcon className="w-3.5 h-3.5" />
                    <span>Drawn in This Session</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {recentDrawnIds.length} cards drawn
                  </span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {recentDrawnIds.map((id) => {
                    const fact = allFacts.find((f) => f.id === id);
                    if (!fact) return null;
                    const isSelected = fact.id === currentFact?.id;
                    return (
                      <button
                        key={fact.id}
                        onClick={() => {
                          sfx.pop();
                          setCurrentFactId(fact.id);
                          if (currentTopic !== 'all' && fact.topic !== currentTopic) {
                            setCurrentTopic(fact.topic);
                          }
                        }}
                        className={`flex items-center gap-2 py-2 px-3 rounded-xl border-2 border-black text-xs font-goofy font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-black retro-shadow-sm font-extrabold scale-102'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{fact.emoji}</span>
                        <span className="max-w-[160px] truncate">{fact.headline}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-white/60 py-6 px-4 text-center mt-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Deck of Facts · Verified curiosities dealt with zero repeats.</p>
          <div className="flex items-center gap-4 font-goofy font-bold text-slate-700">
            <span>Fact of the Day</span>
            <span aria-hidden="true">·</span>
            <span>History · Human Body · Literature · Science · Other</span>
          </div>
        </div>
      </footer>

      {/* Social Sharing Studio Modal */}
      {shareConfig && (
        <ShareModal
          fact={shareConfig.fact}
          isOpen={Boolean(shareConfig)}
          onClose={() => setShareConfig(null)}
          isFactOfTheDay={shareConfig.isDaily}
          dailyDateLabel={shareConfig.dateLabel}
        />
      )}

      {/* Saved Brain Vault Drawer */}
      <FavoritesDrawer
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        savedFacts={savedFacts}
        onSelectFact={(fact) => {
          setViewMode('browse');
          setCurrentTopic(fact.topic);
          setCurrentFactId(fact.id);
        }}
        onRemoveFact={(id) => {
          setSavedFacts((prev) => prev.filter((f) => f.id !== id));
        }}
        onOpenShare={(fact) => setShareConfig({ fact, isDaily: false })}
      />
    </div>
  );
}
