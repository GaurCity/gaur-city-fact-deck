import React, { useState, useEffect } from 'react';
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Square,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { FactItem } from '../data/facts';
import { CARD_STYLES, generateSocialCardBlob } from '../utils/canvasCard';
import { sfx } from '../utils/audio';

interface ShareModalProps {
  fact: FactItem;
  isOpen: boolean;
  onClose: () => void;
  isFactOfTheDay?: boolean;
  dailyDateLabel?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  fact,
  isOpen,
  onClose,
  isFactOfTheDay,
  dailyDateLabel,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'square' | 'story'>('square');
  const [selectedStyle, setSelectedStyle] = useState<string>('retro-yellow');
  const [cardPreviewUrl, setCardPreviewUrl] = useState<string>('');
  const [cardBlob, setCardBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);

  const dailyDateBadge = isFactOfTheDay
    ? `FACT OF THE DAY`
    : undefined;

  // Generate card when format or style changes
  useEffect(() => {
    if (!isOpen) return;

    let isCurrent = true;
    setIsGenerating(true);

    generateSocialCardBlob(fact, selectedFormat, selectedStyle, dailyDateBadge)
      .then(({ blob, dataUrl }) => {
        if (isCurrent) {
          setCardBlob(blob);
          setCardPreviewUrl(dataUrl);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error('Error generating card image:', err);
        if (isCurrent) setIsGenerating(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [fact, selectedFormat, selectedStyle, isOpen, dailyDateBadge]);

  if (!isOpen) return null;

  const headerPrefix = isFactOfTheDay
    ? `⭐ FACT OF THE DAY (${dailyDateLabel || 'Today'}):\n`
    : '';
  const fullShareText = `${headerPrefix}💡 "${fact.headline}"\n\n${fact.fact}\n\n👉 Discovered on Deck of Facts`;
  const encodedText = encodeURIComponent(fullShareText);
  const twitterPrefix = isFactOfTheDay ? `⭐ Fact of the Day · ` : `💡 `;
  const twitterText = encodeURIComponent(`${twitterPrefix}${fact.shareQuote}\n\n#DailyTrivia #DeepLore #DeckOfFacts`);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${twitterText}`,
      bg: 'bg-black text-white hover:bg-neutral-800',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      bg: 'bg-[#25D366] text-black hover:bg-[#20ba59]',
    },
    {
      name: 'Threads',
      icon: '🧵',
      url: `https://www.threads.net/intent/post?text=${encodedText}`,
      bg: 'bg-[#000000] text-white hover:bg-neutral-800',
    },
    {
      name: 'Reddit',
      icon: '🤖',
      url: `https://www.reddit.com/submit?title=${encodeURIComponent(fact.headline)}&text=${encodedText}`,
      bg: 'bg-[#FF4500] text-white hover:bg-[#e03d00]',
    },
  ];

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopiedText(true);
      sfx.ding();
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownloadImage = () => {
    if (!cardPreviewUrl) return;
    sfx.pop();
    const link = document.createElement('a');
    link.download = `deck-of-facts-${fact.topic}-${fact.id}.png`;
    link.href = cardPreviewUrl;
    link.click();
  };

  const handleCopyImage = async () => {
    if (!cardBlob) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': cardBlob,
        }),
      ]);
      setCopiedImage(true);
      sfx.ding();
      setTimeout(() => setCopiedImage(false), 2000);
    } catch {
      handleDownloadImage();
    }
  };

  const handleNativeShare = async () => {
    sfx.pop();
    if (navigator.share) {
      try {
        if (cardBlob && navigator.canShare && navigator.canShare({ files: [new File([cardBlob], 'fact.png', { type: 'image/png' })] })) {
          const file = new File([cardBlob], `deck-of-facts-${fact.id}.png`, { type: 'image/png' });
          await navigator.share({
            title: fact.headline,
            text: fact.shareQuote,
            files: [file],
          });
        } else {
          await navigator.share({
            title: fact.headline,
            text: fullShareText,
          });
        }
      } catch (err) {
        // user aborted or not supported
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFFDF5] rounded-3xl retro-border retro-shadow-xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📢</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl text-slate-900 tracking-wide uppercase">
                  Share To The World
                </h2>
                {isFactOfTheDay && (
                  <span className="px-2.5 py-0.5 rounded-full border border-black bg-amber-400 font-goofy text-[11px] font-extrabold text-black">
                    ⭐ FACT OF THE DAY
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-600">
                {isFactOfTheDay
                  ? `Drop today's official daily drop into group chats, stories, or viral threads!`
                  : `Drop this into group chats, stories, or viral threads!`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.pop();
              onClose();
            }}
            aria-label="Close dialog"
            className="p-2 rounded-xl border-2 border-black bg-white hover:bg-rose-100 transition-colors cursor-pointer retro-shadow-sm"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Instant 1-Click Social Triggers & Text Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1-Click Direct Social Post
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {shareLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.pop()}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black font-goofy font-bold text-sm transition-transform active:scale-95 retro-shadow-sm ${item.bg}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* Native Mobile Share Sheet */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full py-3.5 px-4 rounded-xl border-2 border-black bg-gradient-to-r from-amber-300 to-yellow-300 font-goofy font-bold text-slate-900 flex items-center justify-center gap-2.5 transition-transform active:scale-95 retro-shadow-sm cursor-pointer"
              >
                <Share2 className="w-5 h-5 text-black" />
                <span>Open Device Share Sheet (Instagram, AirDrop, Messages)</span>
              </button>
            )}

            {/* Quick Text Copy Card */}
            <div className="p-4 rounded-2xl border-2 border-black bg-white retro-shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Formatted Text Quote
                </span>
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-black bg-amber-200 hover:bg-amber-300 text-xs font-bold text-black transition-colors cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-700 font-medium italic line-clamp-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                "{fact.shareQuote}"
              </p>
            </div>

            {/* Card Studio Controls */}
            <div className="p-4 rounded-2xl border-2 border-black bg-amber-50/80 retro-shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-slate-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Card Graphic Studio</span>
              </div>

              {/* Aspect Ratio Switch */}
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Aspect Ratio
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      sfx.pop();
                      setSelectedFormat('square');
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 border-black font-goofy text-xs font-bold transition-all cursor-pointer ${
                      selectedFormat === 'square'
                        ? 'bg-amber-400 text-black shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Square className="w-4 h-4" />
                    <span>Square (Feed / X)</span>
                  </button>
                  <button
                    onClick={() => {
                      sfx.pop();
                      setSelectedFormat('story');
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 border-black font-goofy text-xs font-bold transition-all cursor-pointer ${
                      selectedFormat === 'story'
                        ? 'bg-amber-400 text-black shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Story / TikTok</span>
                  </button>
                </div>
              </div>

              {/* Theme Palettes */}
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Colorway Vibe
                </span>
                <div className="flex flex-wrap gap-2">
                  {CARD_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        sfx.pop();
                        setSelectedStyle(style.id);
                      }}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border-2 border-black text-xs font-bold transition-transform cursor-pointer ${
                        selectedStyle === style.id
                          ? 'scale-105 ring-2 ring-black font-extrabold'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: style.cardBg, color: style.textColor }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black inline-block"
                        style={{ backgroundColor: style.accentColor }}
                      />
                      <span>{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Card Graphic Preview & Download */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 self-start">
              Live Card Render
            </span>

            {/* Preview Frame */}
            <div className="relative w-full flex items-center justify-center bg-slate-900/5 rounded-2xl border-2 border-dashed border-slate-300 p-4 min-h-[340px]">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl animate-bounce">🎨</span>
                  <p className="font-goofy font-bold text-sm text-slate-700">
                    Baking high-res graphic card...
                  </p>
                </div>
              ) : cardPreviewUrl ? (
                <div className="relative max-h-[420px] overflow-hidden rounded-xl retro-shadow border-2 border-black">
                  <img
                    src={cardPreviewUrl}
                    alt="Social Card Preview"
                    className="object-contain max-h-[380px] w-auto mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400">Card generation failed</p>
              )}
            </div>

            {/* Download and Copy Card Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleDownloadImage}
                disabled={!cardPreviewUrl || isGenerating}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-goofy font-bold text-sm transition-all active:scale-95 retro-shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save PNG</span>
              </button>

              <button
                onClick={handleCopyImage}
                disabled={!cardPreviewUrl || isGenerating}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-900 font-goofy font-bold text-sm transition-all active:scale-95 retro-shadow-sm cursor-pointer"
              >
                {copiedImage ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Image Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
