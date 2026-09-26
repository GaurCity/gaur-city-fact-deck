export interface CategoryTheme {
  id: string;
  label: string;
  name: string;
  borderColor: string;      // Tailwind border class for the accent border
  borderHex: string;        // Hex for canvas/custom styling
  topStripeBg: string;      // Top accent stripe
  badgeBg: string;          // Topic pill background
  badgeText: string;        // Topic pill text color
  accentBg: string;         // Light tint background
  dotColor: string;         // Small dot/indicator color
  activeTabClass: string;   // Active tab button styling
  tagBg: string;            // Secondary tag background
  tagText: string;          // Secondary tag text
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  history: {
    id: 'history',
    label: 'History',
    name: 'Historical Archives',
    borderColor: 'border-red-500',
    borderHex: '#EF4444',
    topStripeBg: 'bg-red-500',
    badgeBg: 'bg-red-100 border-red-950 text-red-950',
    badgeText: 'text-red-950',
    accentBg: 'bg-red-50/40',
    dotColor: 'bg-red-500',
    activeTabClass: 'bg-red-400 text-black border-black',
    tagBg: 'bg-red-950',
    tagText: 'text-red-200',
  },
  'human-body': {
    id: 'human-body',
    label: 'Human Body',
    name: 'Anatomical Quirks',
    borderColor: 'border-purple-500',
    borderHex: '#A855F7',
    topStripeBg: 'bg-purple-500',
    badgeBg: 'bg-purple-100 border-purple-950 text-purple-950',
    badgeText: 'text-purple-950',
    accentBg: 'bg-purple-50/40',
    dotColor: 'bg-purple-500',
    activeTabClass: 'bg-purple-400 text-black border-black',
    tagBg: 'bg-purple-950',
    tagText: 'text-purple-200',
  },
  literature: {
    id: 'literature',
    label: 'Literature',
    name: 'Literary Oddities',
    borderColor: 'border-emerald-500',
    borderHex: '#10B981',
    topStripeBg: 'bg-emerald-500',
    badgeBg: 'bg-emerald-100 border-emerald-950 text-emerald-950',
    badgeText: 'text-emerald-950',
    accentBg: 'bg-emerald-50/40',
    dotColor: 'bg-emerald-500',
    activeTabClass: 'bg-emerald-400 text-black border-black',
    tagBg: 'bg-emerald-950',
    tagText: 'text-emerald-200',
  },
  science: {
    id: 'science',
    label: 'Science',
    name: 'Scientific Mysteries',
    borderColor: 'border-blue-500',
    borderHex: '#3B82F6',
    topStripeBg: 'bg-blue-500',
    badgeBg: 'bg-blue-100 border-blue-950 text-blue-950',
    badgeText: 'text-blue-950',
    accentBg: 'bg-blue-50/40',
    dotColor: 'bg-blue-500',
    activeTabClass: 'bg-blue-400 text-black border-black',
    tagBg: 'bg-blue-950',
    tagText: 'text-blue-200',
  },
  other: {
    id: 'other',
    label: 'Other',
    name: 'Curious Artifacts',
    borderColor: 'border-amber-500',
    borderHex: '#F59E0B',
    topStripeBg: 'bg-amber-500',
    badgeBg: 'bg-amber-100 border-amber-950 text-amber-950',
    badgeText: 'text-amber-950',
    accentBg: 'bg-amber-50/40',
    dotColor: 'bg-amber-500',
    activeTabClass: 'bg-amber-400 text-black border-black',
    tagBg: 'bg-amber-950',
    tagText: 'text-amber-200',
  },
};

export function getCategoryTheme(topic: string): CategoryTheme {
  return CATEGORY_THEMES[topic] || CATEGORY_THEMES.other;
}
