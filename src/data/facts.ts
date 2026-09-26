export interface SchematicData {
  diagramType:
    | 'timeline-marathon'
    | 'nerve-detour'
    | 'optical-cup'
    | 'typewriter-qwerty'
    | 'entasis-columns'
    | 'mpemba-convection'
    | 'dilatancy-grains'
    | 'saccade-clock'
    | 'dive-reflex'
    | 'generic-specimen';
  badge: string;
  caption: string;
  accentBg: string;
  symbol: string;
  metricLabel?: string;
  metricValue?: string;
  tags?: string[];
}

export interface FactItem {
  id: string;
  topic: 'history' | 'human-body' | 'literature' | 'science' | 'other';
  topicLabel: string;
  emoji: string;
  headline: string;
  fact: string;
  mindBlownRating: number;
  quirkyTag: string;
  palette: {
    bg: string;
    cardBg: string;
    border: string;
    accent: string;
    text: string;
    pillBg: string;
    stampColor: string;
  };
  shareQuote: string;
  schematic: SchematicData;
}

export const TOPICS = [
  { id: 'all', label: 'All', emoji: '✨', description: 'Complete library of rare curiosities' },
  { id: 'history', label: 'History', emoji: '👑', description: 'Unbelievable documented past events' },
  { id: 'human-body', label: 'Human Body', emoji: '🧠', description: 'Anatomical quirks & neurological glitches' },
  { id: 'literature', label: 'Literature', emoji: '📚', description: 'Scandals, hidden manuscripts & word origins' },
  { id: 'science', label: 'Science', emoji: '🔬', description: 'Counterintuitive physics & bizarre chemistry' },
  { id: 'other', label: 'Other', emoji: '⚡', description: 'Material anomalies, design history & inventions' },
] as const;

export type TopicId = (typeof TOPICS)[number]['id'];

export const CURATED_FACTS: FactItem[] = [
  // --- HISTORY ---
  {
    id: 'hist-1',
    topic: 'history',
    topicLabel: 'History',
    emoji: '🏃‍♂️',
    headline: 'The 1904 Olympic Marathon was absolute chaos',
    fact: 'The first runner drove 11 miles in a car as a prank, while the official gold medalist won after trainers injected him with rat poison and raw brandy, causing him to hallucinate across the finish line.',
    mindBlownRating: 5,
    quirkyTag: 'Olympic Mayhem',
    palette: {
      bg: 'bg-amber-50',
      cardBg: 'bg-amber-100',
      border: 'border-amber-950',
      accent: 'bg-amber-400',
      text: 'text-amber-950',
      pillBg: 'bg-amber-200',
      stampColor: '#d97706',
    },
    shareQuote: 'The 1904 Olympic Marathon winner was fueled by rat poison and brandy, while another runner hitchhiked in an automobile.',
    schematic: {
      diagramType: 'timeline-marathon',
      badge: 'ARCHIVAL ROUTE MAP',
      caption: 'St. Louis 1904: Dirt track, automobile hitchhiking, and strychnine injections.',
      accentBg: 'bg-amber-200',
      symbol: '🏎️',
      metricLabel: 'Strychnine dose',
      metricValue: '1.0 mg',
      tags: ['St. Louis 1904', '90°F Heat', '1 Water Station'],
    },
  },
  {
    id: 'hist-2',
    topic: 'history',
    topicLabel: 'History',
    emoji: '🏴‍☠️',
    headline: 'Julius Caesar insulted his pirate kidnappers into raising his ransom',
    fact: 'When Mediterranean pirates demanded 20 silver talents for his release, 25-year-old Caesar laughed at the low price, forced them to demand 50, bossed them around for a month, and then hunted them down and executed them upon release.',
    mindBlownRating: 5,
    quirkyTag: 'Audacious Audacity',
    palette: {
      bg: 'bg-indigo-50',
      cardBg: 'bg-indigo-100',
      border: 'border-indigo-950',
      accent: 'bg-indigo-400',
      text: 'text-indigo-950',
      pillBg: 'bg-indigo-200',
      stampColor: '#4f46e5',
    },
    shareQuote: 'Kidnapped by pirates asking 20 talents, Julius Caesar laughed, forced them to ask 50, and tracked them down once freed.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'HISTORICAL CHRONICLE',
      caption: '75 BCE Pharmacusa: Caesar insisted 20 talents insulted his stature.',
      accentBg: 'bg-indigo-200',
      symbol: '⚔️',
      metricLabel: 'Ransom demanded',
      metricValue: '50 Talents',
      tags: ['75 BCE', 'Aegean Sea', 'Plutarch Records'],
    },
  },
  {
    id: 'hist-3',
    topic: 'history',
    topicLabel: 'History',
    emoji: '💨',
    headline: 'London’s "Great Stink" shut down Parliament and built the sewer system',
    fact: 'In July 1858, sewage fermenting in the Thames created a stench so violent that Parliament soaked its curtains in chemicals and fled the building—passing emergency laws in 18 days to construct London’s 1,100-mile modern sewer network.',
    mindBlownRating: 5,
    quirkyTag: 'Olfactory Crisis',
    palette: {
      bg: 'bg-stone-50',
      cardBg: 'bg-stone-200',
      border: 'border-stone-950',
      accent: 'bg-stone-400',
      text: 'text-stone-950',
      pillBg: 'bg-stone-300',
      stampColor: '#57534e',
    },
    shareQuote: 'In 1858, sewage in the Thames smelled so bad that politicians fled Parliament and passed emergency laws in 18 days to build modern sewers.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'CIVIC ENGINEERING',
      caption: 'Thames 1858: 18-day emergency legislation built 1,100 miles of brick sewers.',
      accentBg: 'bg-stone-300',
      symbol: '🏛️',
      metricLabel: 'Sewer network length',
      metricValue: '1,100 Miles',
      tags: ['July 1858', 'River Thames', 'Bazalgette Design'],
    },
  },
  {
    id: 'hist-4',
    topic: 'history',
    topicLabel: 'History',
    emoji: '⚙️',
    headline: 'The Antikythera Mechanism was an ancient Greek analog computer',
    fact: 'Recovered from a 2,000-year-old shipwreck, this device uses 30+ precision differential bronze gears to compute solar eclipses and planetary orbits—clockwork technology that vanished until 14th-century Europe.',
    mindBlownRating: 5,
    quirkyTag: 'Ancient Computing',
    palette: {
      bg: 'bg-teal-50',
      cardBg: 'bg-teal-100',
      border: 'border-teal-950',
      accent: 'bg-teal-400',
      text: 'text-teal-950',
      pillBg: 'bg-teal-200',
      stampColor: '#0d9488',
    },
    shareQuote: 'The 2,000-year-old Antikythera Mechanism is a Greek clockwork computer with 30+ gears that predicted planetary orbits.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'ANCIENT MECHANISM',
      caption: 'Circa 150 BCE: 30 interlocking bronze differential gears decoded via 3D CT scan.',
      accentBg: 'bg-teal-200',
      symbol: '🧭',
      metricLabel: 'Differential gears',
      metricValue: '30+ Bronze',
      tags: ['150 BCE', 'Greek Astronomy', 'Eclipse Prediction'],
    },
  },
  {
    id: 'hist-5',
    topic: 'history',
    topicLabel: 'History',
    emoji: '💃',
    headline: 'The Dancing Plague of 1518 compelled hundreds to dance until collapse',
    fact: 'Over 400 people in Strasbourg began dancing feverishly in the city square for weeks without music, unable to stop until dozens collapsed from heart attacks and exhaustion in an outbreak of mass psychogenic illness.',
    mindBlownRating: 5,
    quirkyTag: 'Psychogenic Mystery',
    palette: {
      bg: 'bg-rose-50',
      cardBg: 'bg-rose-100',
      border: 'border-rose-950',
      accent: 'bg-rose-400',
      text: 'text-rose-950',
      pillBg: 'bg-rose-200',
      stampColor: '#e11d48',
    },
    shareQuote: 'In 1518, 400 people in Strasbourg danced uncontrollably for weeks on wooden stages until physical collapse.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'HISTORICAL EPIDEMIC',
      caption: 'Strasbourg 1518: Civic authorities hired musicians hoping fatigue would cure it.',
      accentBg: 'bg-rose-200',
      symbol: '🎭',
      metricLabel: 'Afflicted citizens',
      metricValue: '400+ People',
      tags: ['July 1518', 'Strasbourg', 'Mass Psychogenic'],
    },
  },
  {
    id: 'hist-6',
    topic: 'history',
    topicLabel: 'History',
    emoji: '🥕',
    headline: 'Carrots were purple and yellow until 17th-century Dutch tribute',
    fact: 'Carrots were naturally dark purple and yellow for millennia until Dutch growers in the late 1500s selectively bred sweet mutant orange roots as a patriotic tribute to William of Orange.',
    mindBlownRating: 4,
    quirkyTag: 'Botanical Statecraft',
    palette: {
      bg: 'bg-orange-50',
      cardBg: 'bg-orange-100',
      border: 'border-orange-950',
      accent: 'bg-orange-400',
      text: 'text-orange-950',
      pillBg: 'bg-orange-200',
      stampColor: '#ea580c',
    },
    shareQuote: 'Carrots were naturally purple and yellow until Dutch farmers bred orange carrots as a tribute to William of Orange.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'CULTIVAR HISTORY',
      caption: 'Dutch Golden Age: Orange beta-carotene mutants cultivated as House of Orange homage.',
      accentBg: 'bg-orange-200',
      symbol: '🌿',
      metricLabel: 'Original pigment',
      metricValue: 'Anthocyanin',
      tags: ['16th Century', 'Netherlands', 'Selective Breeding'],
    },
  },

  // --- HUMAN BODY ---
  {
    id: 'hb-1',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '👁️',
    headline: 'Your immune system has no idea your eyes exist',
    fact: 'Your eyes have "immune privilege" behind a blood-ocular barrier. If traumatic injury causes eye proteins to leak into the bloodstream, your immune system discovers them for the first time and can attack both eyes as foreign parasites.',
    mindBlownRating: 5,
    quirkyTag: 'Immune Privilege',
    palette: {
      bg: 'bg-purple-50',
      cardBg: 'bg-purple-100',
      border: 'border-purple-950',
      accent: 'bg-purple-400',
      text: 'text-purple-950',
      pillBg: 'bg-purple-200',
      stampColor: '#9333ea',
    },
    shareQuote: 'Your immune system doesn’t know your eyes exist; if eye proteins leak into the blood, your antibodies can attack your own eyesight.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'IMMUNE PRIVILEGE SCHEMA',
      caption: 'Blood-Retinal Barrier: Protects sensitive photoreceptors from inflammatory destruction.',
      accentBg: 'bg-purple-200',
      symbol: '👁️',
      metricLabel: 'Immunological status',
      metricValue: 'Privileged',
      tags: ['Sympathetic Ophthalmia', 'Retinal Barrier', 'Autoimmunity'],
    },
  },
  {
    id: 'hb-2',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '🦒',
    headline: 'Your vocal cord nerve loops 3 feet down around your heart’s aorta',
    fact: 'The nerve connecting your brainstem to your vocal cords takes a 3-foot detour into your chest, loops underneath your aorta, and runs back up to your throat—an evolutionary fish relic that stretches 15 feet long in giraffes.',
    mindBlownRating: 5,
    quirkyTag: 'Evolutionary Detour',
    palette: {
      bg: 'bg-emerald-50',
      cardBg: 'bg-emerald-100',
      border: 'border-emerald-950',
      accent: 'bg-emerald-400',
      text: 'text-emerald-950',
      pillBg: 'bg-emerald-200',
      stampColor: '#059669',
    },
    shareQuote: 'Your vocal cord nerve takes a 3-foot detour down to loop under your aorta before heading back up to your neck.',
    schematic: {
      diagramType: 'nerve-detour',
      badge: 'ANATOMICAL SCHEMATIC',
      caption: 'Recurrent Laryngeal Nerve: Tracing the evolutionary detour around the aortic arch.',
      accentBg: 'bg-emerald-200',
      symbol: '🫀',
      metricLabel: 'Detour distance',
      metricValue: '3 Feet',
      tags: ['Recurrent Laryngeal', 'Aortic Loop', 'Fish Ancestry'],
    },
  },
  {
    id: 'hb-3',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '🎞️',
    headline: 'You are functionally blind for 40 minutes every day',
    fact: 'Whenever your eyes flick between focal points (saccades), your brain shuts down visual processing and retroactively pastes the next still image backward in time to prevent motion blur, creating ~40 minutes of daily blindness.',
    mindBlownRating: 5,
    quirkyTag: 'Neural Editing',
    palette: {
      bg: 'bg-cyan-50',
      cardBg: 'bg-cyan-100',
      border: 'border-cyan-950',
      accent: 'bg-cyan-400',
      text: 'text-cyan-950',
      pillBg: 'bg-cyan-200',
      stampColor: '#0891b2',
    },
    shareQuote: 'Your brain edits out motion blur every time your eyes flick, making you functionally blind for ~40 minutes every day.',
    schematic: {
      diagramType: 'saccade-clock',
      badge: 'NEUROLOGY TIMELINE',
      caption: 'Saccadic suppression: Visual cortex blocks blur during 3–4 eye movements per second.',
      accentBg: 'bg-cyan-200',
      symbol: '⏱️',
      metricLabel: 'Daily blur blackout',
      metricValue: '~40 Mins',
      tags: ['Saccades', 'Chronostasis', 'Visual Cortex'],
    },
  },
  {
    id: 'hb-4',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '🤿',
    headline: 'Dipping your face in cold water triggers an aquatic survival mode',
    fact: 'Submerging your face in cold water activates the Mammalian Dive Reflex: your heart rate instantly drops by up to 50%, peripheral blood vessels clamp shut, and your spleen pumps extra oxygenated red blood cells into circulation.',
    mindBlownRating: 4,
    quirkyTag: 'Deep Sea Reflex',
    palette: {
      bg: 'bg-sky-50',
      cardBg: 'bg-sky-100',
      border: 'border-sky-950',
      accent: 'bg-sky-400',
      text: 'text-sky-950',
      pillBg: 'bg-sky-200',
      stampColor: '#0284c7',
    },
    shareQuote: 'Cold water on your face triggers the Mammalian Dive Reflex: heart rate plummets 50% and your spleen releases extra oxygen reserves.',
    schematic: {
      diagramType: 'dive-reflex',
      badge: 'PHYSIOLOGY MATRIX',
      caption: 'Trigeminal nerve stimulation initiates instantaneous bradycardia and spleen contraction.',
      accentBg: 'bg-sky-200',
      symbol: '🌊',
      metricLabel: 'Heart rate change',
      metricValue: '-50% BPM',
      tags: ['Trigeminal Nerve', 'Bradycardia', 'Spleen Pulse'],
    },
  },
  {
    id: 'hb-5',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '🚶',
    headline: 'Swinging your arms while walking saves 12% of your legs’ energy',
    fact: 'Arm swinging acts as a mechanical counter-pendulum that cancels the rotational torque of your twisting pelvis. Walking with your arms pinned to your sides forces your leg muscles to burn 12% more metabolic energy.',
    mindBlownRating: 4,
    quirkyTag: 'Biomechanic Torque',
    palette: {
      bg: 'bg-lime-50',
      cardBg: 'bg-lime-100',
      border: 'border-lime-950',
      accent: 'bg-lime-400',
      text: 'text-lime-950',
      pillBg: 'bg-lime-200',
      stampColor: '#65a30d',
    },
    shareQuote: 'Swinging your arms while walking cancels pelvic twist torque and saves 12% of your leg muscles’ energy.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'BIOMECHANICS SCHEMA',
      caption: 'Kinetic balance: Upper torso counter-oscillations neutralize rotational ground torque.',
      accentBg: 'bg-lime-200',
      symbol: '⚖️',
      metricLabel: 'Metabolic savings',
      metricValue: '12% Energy',
      tags: ['Gait Analysis', 'Pelvic Torque', 'Pendulum Physics'],
    },
  },
  {
    id: 'hb-6',
    topic: 'human-body',
    topicLabel: 'Human Body',
    emoji: '🌶️',
    headline: 'Spicy heat is a neurological thermal hallucination',
    fact: 'Chili peppers have zero actual heat. Capsaicin chemically binds to TRPV1 nerve receptors that normally detect scalding temperatures above 43°C (109°F), tricking your brain into treating the food like an open flame.',
    mindBlownRating: 4,
    quirkyTag: 'Sensory Hijacking',
    palette: {
      bg: 'bg-red-50',
      cardBg: 'bg-red-100',
      border: 'border-red-950',
      accent: 'bg-red-400',
      text: 'text-red-950',
      pillBg: 'bg-red-200',
      stampColor: '#dc2626',
    },
    shareQuote: 'Capsaicin has no real heat; it chemically hijacks TRPV1 nerve channels calibrated to detect boiling burns over 43°C.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'NEURAL INTERACTION',
      caption: 'Capsaicin binds to TRPV1 ion channels calibrated for scalding temperatures >43°C.',
      accentBg: 'bg-red-200',
      symbol: '🔥',
      metricLabel: 'Activation threshold',
      metricValue: '>43°C / 109°F',
      tags: ['TRPV1 Receptor', 'Capsaicinoid', 'Sensory Deception'],
    },
  },

  // --- LITERATURE ---
  {
    id: 'lit-1',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🫀',
    headline: 'Mary Shelley kept her husband’s calcified heart in her writing desk',
    fact: 'When poet Percy Bysshe Shelley drowned in 1822, his calcified heart refused to burn during cremation. Mary Shelley preserved it wrapped in silk inside her portable mahogany desk for nearly 30 years until her death.',
    mindBlownRating: 5,
    quirkyTag: 'Gothic Devotion',
    palette: {
      bg: 'bg-rose-50',
      cardBg: 'bg-rose-100',
      border: 'border-rose-950',
      accent: 'bg-rose-400',
      text: 'text-rose-950',
      pillBg: 'bg-rose-200',
      stampColor: '#e11d48',
    },
    shareQuote: 'Percy Shelley’s calcified heart refused to burn on a beach pyre; Mary Shelley kept it inside her writing desk for 29 years.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'LITERARY PROVENANCE',
      caption: '1822–1851: Kept wrapped in silk alongside the manuscript of Adonaïs.',
      accentBg: 'bg-rose-200',
      symbol: '📜',
      metricLabel: 'Years preserved',
      metricValue: '29 Years',
      tags: ['1822 Gulf of Spezia', 'Mary Shelley', 'Calcification'],
    },
  },
  {
    id: 'lit-2',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🔮',
    headline: 'Arthur Conan Doyle believed Houdini had real dematerializing powers',
    fact: 'Despite Harry Houdini demonstrating that his escape stunts were mechanical illusions, Sherlock Holmes author Sir Arthur Conan Doyle insisted Houdini was a magical medium dematerializing his physical atoms through solid walls.',
    mindBlownRating: 5,
    quirkyTag: 'Literary Rivalry',
    palette: {
      bg: 'bg-violet-50',
      cardBg: 'bg-violet-100',
      border: 'border-violet-950',
      accent: 'bg-violet-400',
      text: 'text-violet-950',
      pillBg: 'bg-violet-200',
      stampColor: '#7c3aed',
    },
    shareQuote: 'Arthur Conan Doyle was convinced Harry Houdini didn’t use tricks, but possessed psychic powers to dematerialize through walls.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'ARCHIVAL CORRESPONDENCE',
      caption: '1920s Spiritualist clash: The author of ultra-logical Sherlock Holmes vs master skeptic.',
      accentBg: 'bg-violet-200',
      symbol: '🗝️',
      metricLabel: 'Conan Doyle belief',
      metricValue: 'Dematerialize',
      tags: ['Spiritualism', 'Houdini Debunk', 'Sherlock Holmes'],
    },
  },
  {
    id: 'lit-3',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🐻',
    headline: 'Lord Byron kept a live pet bear in his Cambridge dorm room',
    fact: 'When Cambridge rules strictly banned pet dogs from dormitories in 1805, Lord Byron found a loophole in the rulebook, purchased a live tame bear, housed it in his room, and requested it be granted college fellowship.',
    mindBlownRating: 5,
    quirkyTag: 'Byronic Defiance',
    palette: {
      bg: 'bg-amber-50',
      cardBg: 'bg-amber-100',
      border: 'border-amber-950',
      accent: 'bg-amber-400',
      text: 'text-amber-950',
      pillBg: 'bg-amber-200',
      stampColor: '#d97706',
    },
    shareQuote: 'Forbidden from keeping dogs at Cambridge, Lord Byron bought a live bear, kept it in his dorm, and petitioned for it to be a fellow.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'COLLEGIATE STATUTE',
      caption: 'Trinity College 1805: Cambridge statutes forbade canines but omitted ursids.',
      accentBg: 'bg-amber-200',
      symbol: '🎓',
      metricLabel: 'Statute loophole',
      metricValue: 'No Dog Rule',
      tags: ['Cambridge 1805', 'Trinity College', 'Byronic Wit'],
    },
  },
  {
    id: 'lit-4',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🔍',
    headline: 'Agatha Christie vanished for 11 days, sparking a 1,000-officer manhunt',
    fact: 'In December 1926, Agatha Christie vanished after her car was found abandoned near a quarry. Following a massive search with airplanes and bloodhounds, she was found living under an alias at a luxury spa hotel.',
    mindBlownRating: 5,
    quirkyTag: 'Real-Life Mystery',
    palette: {
      bg: 'bg-zinc-100',
      cardBg: 'bg-zinc-200',
      border: 'border-zinc-950',
      accent: 'bg-yellow-400',
      text: 'text-zinc-950',
      pillBg: 'bg-zinc-300',
      stampColor: '#52525b',
    },
    shareQuote: 'In 1926, Agatha Christie vanished for 11 days after her abandoned car sparked a 1,000-officer nationwide search.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'POLICE DISPATCH',
      caption: 'Surrey Downs 1926: First British police missing-person search utilizing airplanes.',
      accentBg: 'bg-zinc-300',
      symbol: '🚗',
      metricLabel: 'Search personnel',
      metricValue: '1,000 Officers',
      tags: ['Dec 1926', 'Harrogate Spa', 'Unsolved Amnesia'],
    },
  },
  {
    id: 'lit-5',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🌱',
    headline: 'Frankenstein’s creature was an articulate vegetarian scholar',
    fact: 'In Mary Shelley’s original 1818 novel, the creature is not a mute brute. He is an eloquent intellectual who reads John Milton’s *Paradise Lost* and eats an exclusively vegetarian diet of nuts and berries out of respect for animal life.',
    mindBlownRating: 4,
    quirkyTag: 'Literary Revisionism',
    palette: {
      bg: 'bg-teal-50',
      cardBg: 'bg-teal-100',
      border: 'border-teal-950',
      accent: 'bg-teal-400',
      text: 'text-teal-950',
      pillBg: 'bg-teal-200',
      stampColor: '#0d9488',
    },
    shareQuote: 'In Mary Shelley’s original novel, Frankenstein’s creature is an articulate vegetarian scholar who reads Milton’s Paradise Lost.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'TEXTUAL RESTORATION',
      caption: '1818 First Edition: "My food is not that of man; the acorn and berry afford me sufficient nourishment."',
      accentBg: 'bg-teal-200',
      symbol: '📖',
      metricLabel: 'Creature curriculum',
      metricValue: 'Paradise Lost',
      tags: ['1818 Edition', 'Milton & Plutarch', 'Moral Philosophy'],
    },
  },
  {
    id: 'lit-6',
    topic: 'literature',
    topicLabel: 'Literature',
    emoji: '🖋️',
    headline: 'Shakespeare invented over 1,700 everyday English words',
    fact: 'William Shakespeare coined or first recorded over 1,700 words we use daily by modifying prefixes and Latin roots, including "swagger", "eyeball", "bedazzled", "lonely", "uncomfortable", and "alligator".',
    mindBlownRating: 4,
    quirkyTag: 'Linguistic Architecture',
    palette: {
      bg: 'bg-fuchsia-50',
      cardBg: 'bg-fuchsia-100',
      border: 'border-fuchsia-950',
      accent: 'bg-fuchsia-400',
      text: 'text-fuchsia-950',
      pillBg: 'bg-fuchsia-200',
      stampColor: '#c026d3',
    },
    shareQuote: 'Shakespeare invented over 1,700 words we use daily, including "swagger", "eyeball", "bedazzled", and "lonely".',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'LEXICOGRAPHY RECORD',
      caption: 'First Folio 1623: Transmuting everyday Anglo-Saxon and Norman roots into modern vocabulary.',
      accentBg: 'bg-fuchsia-200',
      symbol: '✒️',
      metricLabel: 'Coined vocabulary',
      metricValue: '1,700+ Words',
      tags: ['Early Modern English', 'Wordplay', 'Etymology'],
    },
  },

  // --- SCIENCE ---
  {
    id: 'sci-1',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '🧊',
    headline: 'Under specific conditions, hot water freezes faster than cold',
    fact: 'The Mpemba Effect confirms that hot water can freeze faster than cold water because strong thermal convection currents and relaxed hydrogen bonding accelerate localized evaporation and ice nucleation.',
    mindBlownRating: 5,
    quirkyTag: 'Thermodynamic Paradox',
    palette: {
      bg: 'bg-cyan-50',
      cardBg: 'bg-cyan-100',
      border: 'border-cyan-950',
      accent: 'bg-cyan-400',
      text: 'text-cyan-950',
      pillBg: 'bg-cyan-200',
      stampColor: '#0891b2',
    },
    shareQuote: 'Hot water can freeze faster than cold water due to convection currents and hydrogen bonding (the Mpemba Effect).',
    schematic: {
      diagramType: 'mpemba-convection',
      badge: 'THERMODYNAMICS SCHEMATIC',
      caption: 'Mpemba Effect: Accelerated buoyant convection loops and covalent hydrogen bond relaxation.',
      accentBg: 'bg-cyan-200',
      symbol: '❄️',
      metricLabel: 'Discovered by',
      metricValue: 'Erasto Mpemba',
      tags: ['Convection Loops', 'Hydrogen Bonds', 'Supercooling'],
    },
  },
  {
    id: 'sci-2',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '🏆',
    headline: 'The Roman Lycurgus Cup contains 4th-century nanotechnology',
    fact: 'The 4th-century Roman Lycurgus Cup turns from green to radiant red when backlit because Roman artisans embedded 70-nanometer gold and silver nanoparticles, manipulating quantum surface plasmon resonance 1,600 years before modern physics.',
    mindBlownRating: 5,
    quirkyTag: 'Ancient Nanotech',
    palette: {
      bg: 'bg-emerald-50',
      cardBg: 'bg-emerald-100',
      border: 'border-emerald-950',
      accent: 'bg-emerald-400',
      text: 'text-emerald-950',
      pillBg: 'bg-emerald-200',
      stampColor: '#059669',
    },
    shareQuote: 'The 4th-century Roman Lycurgus Cup changes color using 70-nanometer gold/silver nanoparticles—ancient nanotechnology.',
    schematic: {
      diagramType: 'optical-cup',
      badge: 'QUANTUM OPTICS DIAGRAM',
      caption: 'Surface Plasmon Resonance: 70nm colloidal gold/silver particles scatter green in direct light, transmit red in backlight.',
      accentBg: 'bg-emerald-200',
      symbol: '✨',
      metricLabel: 'Colloidal particle size',
      metricValue: '70 nm',
      tags: ['4th Century Rome', 'Plasmon Resonance', 'Dichroic Glass'],
    },
  },
  {
    id: 'sci-3',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '🍳',
    headline: 'Water droplets hover on steam cushions at extreme heat',
    fact: 'Above 193°C (379°F), the Leidenfrost Effect causes water droplets to float on an instantaneous microscopic cushion of steam, allowing them to glide across a scorching pan like frictionless hovercrafts for minutes.',
    mindBlownRating: 4,
    quirkyTag: 'Thermal Hovercraft',
    palette: {
      bg: 'bg-amber-50',
      cardBg: 'bg-amber-100',
      border: 'border-amber-950',
      accent: 'bg-amber-400',
      text: 'text-amber-950',
      pillBg: 'bg-amber-200',
      stampColor: '#d97706',
    },
    shareQuote: 'Above 193°C, water droplets don’t boil—they hover on a steam cushion (the Leidenfrost Effect) like friction-free pucks.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'FLUID MECHANICS',
      caption: 'Leidenfrost Point: 0.1mm insulating vapor layer prevents liquid contact with scorching surface.',
      accentBg: 'bg-amber-200',
      symbol: '💨',
      metricLabel: 'Threshold point',
      metricValue: '193°C / 379°F',
      tags: ['Vapor Layer', 'Hovercraft Physics', 'Thermal Barrier'],
    },
  },
  {
    id: 'sci-4',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '🏖️',
    headline: 'Why wet beach sand dries instantly around your foot',
    fact: 'When you step on wet beach sand, it looks instantly dry because of Reynolds Dilatancy: the mechanical pressure shifts packed sand grains apart, expanding void spaces that vacuum surface water downward like a sponge.',
    mindBlownRating: 4,
    quirkyTag: 'Granular Physics',
    palette: {
      bg: 'bg-yellow-50',
      cardBg: 'bg-yellow-100',
      border: 'border-yellow-950',
      accent: 'bg-yellow-400',
      text: 'text-yellow-950',
      pillBg: 'bg-yellow-200',
      stampColor: '#ca8a04',
    },
    shareQuote: 'Wet beach sand looks dry when you step on it because pressure spreads the grains apart, sucking surface water downward.',
    schematic: {
      diagramType: 'dilatancy-grains',
      badge: 'GRANULAR MECHANICS',
      caption: 'Reynolds Dilatancy: Shear strain forces dense granular spheres apart, suctioning pore water into expanded voids.',
      accentBg: 'bg-yellow-200',
      symbol: '⏳',
      metricLabel: 'Physics law',
      metricValue: 'Reynolds 1885',
      tags: ['Granular Dilatancy', 'Pore Volume', 'Capillary Tension'],
    },
  },
  {
    id: 'sci-5',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '🍟',
    headline: 'Potato chips are acoustically tuned to crunch above 63 decibels',
    fact: 'Food labs acoustically engineer snack chips to snap above 63 decibels with high-frequency harmonics because the human brain uses sound pitch as its primary subconscious signal of freshness.',
    mindBlownRating: 4,
    quirkyTag: 'Acoustic Food Science',
    palette: {
      bg: 'bg-orange-50',
      cardBg: 'bg-orange-100',
      border: 'border-orange-950',
      accent: 'bg-orange-400',
      text: 'text-orange-950',
      pillBg: 'bg-orange-200',
      stampColor: '#ea580c',
    },
    shareQuote: 'Potato chips are engineered to crunch at 63+ decibels because human brains equate acoustic pitch with freshness.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'PSYCHOACOUSTIC DATA',
      caption: 'Sensory laboratories monitor chewing decibel levels and harmonic frequency peaks.',
      accentBg: 'bg-orange-200',
      symbol: '🔊',
      metricLabel: 'Target crunch sound',
      metricValue: '>63 dB',
      tags: ['Sonic Crispness', 'Harmonic Pitch', 'Freshness Cue'],
    },
  },
  {
    id: 'sci-6',
    topic: 'science',
    topicLabel: 'Science',
    emoji: '⚛️',
    headline: 'Enzymes in your body use quantum tunneling to sustain life',
    fact: 'Biological enzymes accelerate vital metabolic reactions by enabling subatomic protons and electrons to quantum-tunnel directly through energetic barriers, teleporting through obstacles rather than surmounting them.',
    mindBlownRating: 5,
    quirkyTag: 'Quantum Biology',
    palette: {
      bg: 'bg-purple-50',
      cardBg: 'bg-purple-100',
      border: 'border-purple-950',
      accent: 'bg-purple-400',
      text: 'text-purple-950',
      pillBg: 'bg-purple-200',
      stampColor: '#9333ea',
    },
    shareQuote: 'Living cells depend on quantum tunneling: enzymes move subatomic particles through reaction barriers to power metabolism.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'QUANTUM BIOLOGY',
      caption: 'Wave function penetration allows metabolic enzymes to transfer protons through electrostatic potential hills.',
      accentBg: 'bg-purple-200',
      symbol: '⚛️',
      metricLabel: 'Mechanism',
      metricValue: 'Wave Tunneling',
      tags: ['Enzyme Catalysis', 'Proton Transfer', 'Quantum Wave'],
    },
  },

  // --- OTHER ---
  {
    id: 'oth-1',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '⌨️',
    headline: 'The QWERTY keyboard was designed to stop typewriter jams',
    fact: 'Christopher Sholes created the QWERTY layout in 1873 to physically separate common letter pairs across the circular basket, preventing swinging mechanical typebars from colliding and jamming together.',
    mindBlownRating: 4,
    quirkyTag: 'Mechanical Heritage',
    palette: {
      bg: 'bg-zinc-100',
      cardBg: 'bg-zinc-200',
      border: 'border-zinc-950',
      accent: 'bg-yellow-400',
      text: 'text-zinc-950',
      pillBg: 'bg-zinc-300',
      stampColor: '#52525b',
    },
    shareQuote: 'QWERTY was designed in 1873 to separate common letters so mechanical typewriter arms wouldn’t collide and jam.',
    schematic: {
      diagramType: 'typewriter-qwerty',
      badge: 'MECHANICAL SCHEMATIC',
      caption: '1873 Circular Typebar Basket: Spacing common English bigrams (TH, ER, IN) prevents mechanical arm clash.',
      accentBg: 'bg-zinc-300',
      symbol: '⌨️',
      metricLabel: 'Patented in',
      metricValue: '1873',
      tags: ['Sholes & Glidden', 'Typebar Clashing', 'Universal Layout'],
    },
  },
  {
    id: 'oth-2',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '🚢',
    headline: 'Standard shipping containers cut cargo loading costs by 97%',
    fact: 'Standardizing steel intermodal shipping containers in 1956 dropped the cost of loading maritime cargo from $5.86 per ton to 16 cents per ton and shortened dock turnaround from days to hours, sparking modern global trade.',
    mindBlownRating: 5,
    quirkyTag: 'Logistics Revolution',
    palette: {
      bg: 'bg-blue-50',
      cardBg: 'bg-blue-100',
      border: 'border-blue-950',
      accent: 'bg-blue-400',
      text: 'text-blue-950',
      pillBg: 'bg-blue-200',
      stampColor: '#2563eb',
    },
    shareQuote: 'Standardized shipping containers cut cargo loading costs from $5.86 to 16 cents per ton, sparking global trade.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'GLOBAL LOGISTICS METRIC',
      caption: '1956 Ideal X maiden voyage: The standardized 20-foot and 40-foot intermodal steel revolution.',
      accentBg: 'bg-blue-200',
      symbol: '🚢',
      metricLabel: 'Cost drop per ton',
      metricValue: '$5.86 → $0.16',
      tags: ['1956 Containerization', 'Malcolm McLean', 'Intermodal Freight'],
    },
  },
  {
    id: 'oth-3',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '🎨',
    headline: 'Artists used "Mummy Brown" paint made of real mummies until 1964',
    fact: 'European oil painters routinely used a rich pigment made by grinding authentic Egyptian mummies. The paint was sold until 1964, when a historic London color manufacturer announced they had simply run out of mummies.',
    mindBlownRating: 5,
    quirkyTag: 'Macabre Art History',
    palette: {
      bg: 'bg-stone-50',
      cardBg: 'bg-stone-200',
      border: 'border-stone-950',
      accent: 'bg-amber-600',
      text: 'text-stone-950',
      pillBg: 'bg-stone-300',
      stampColor: '#78350f',
    },
    shareQuote: 'European painters used a popular pigment made from ground Egyptian mummies until the manufacturer ran out of mummies in 1964.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'ART PIGMENT ARCHIVE',
      caption: 'Roberson & Co. London: Mummia pigment was favored by Pre-Raphaelites before commercial exhaustion in 1964.',
      accentBg: 'bg-stone-300',
      symbol: '🏺',
      metricLabel: 'Sold commercially until',
      metricValue: '1964',
      tags: ['Caput Mortuum', 'Pre-Raphaelites', 'Roberson Archive'],
    },
  },
  {
    id: 'oth-4',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '🏛️',
    headline: 'Parthenon columns swell in the center to correct an optical illusion',
    fact: 'Every column on the Parthenon has a deliberate convex bulge (entasis) in the middle. Without this swelling, human optical perspective distortion would make straight vertical columns appear pinched and concave.',
    mindBlownRating: 4,
    quirkyTag: 'Optical Architecture',
    palette: {
      bg: 'bg-amber-50',
      cardBg: 'bg-amber-100',
      border: 'border-amber-950',
      accent: 'bg-amber-400',
      text: 'text-amber-950',
      pillBg: 'bg-amber-200',
      stampColor: '#b45309',
    },
    shareQuote: 'Parthenon columns bulge outward in the center (entasis) to prevent the human eye from seeing them as pinched inward.',
    schematic: {
      diagramType: 'entasis-columns',
      badge: 'ARCHITECTURAL OPTICS',
      caption: 'Entasis curvature: Subtle 1.7cm outward swelling counteracts human retinal pin-cushion distortion.',
      accentBg: 'bg-amber-200',
      symbol: '🏛️',
      metricLabel: 'Optical correction',
      metricValue: '+1.7 cm Swell',
      tags: ['432 BCE Athens', 'Entasis Bulge', 'Perspective Illusion'],
    },
  },
  {
    id: 'oth-5',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '📦',
    headline: 'Bubble wrap was invented as 3D living room wallpaper',
    fact: 'Inventors sealed plastic shower curtains together in 1957 intending to sell them as trendy textured wallpaper. After homeowners rejected bubbly walls, IBM realized the material could cushion mainframe computers during transport.',
    mindBlownRating: 4,
    quirkyTag: 'Accidental Packaging',
    palette: {
      bg: 'bg-cyan-50',
      cardBg: 'bg-cyan-100',
      border: 'border-cyan-950',
      accent: 'bg-cyan-300',
      text: 'text-cyan-950',
      pillBg: 'bg-cyan-200',
      stampColor: '#0891b2',
    },
    shareQuote: 'Bubble wrap was invented in 1957 as textured wallpaper for living rooms before IBM used it to cushion mainframe computers.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'INDUSTRIAL INVENTIONS',
      caption: '1957 Fielding & Chavannes: From rejected living room wallpaper to IBM 1401 electronic packaging.',
      accentBg: 'bg-cyan-200',
      symbol: '📦',
      metricLabel: 'Original product',
      metricValue: '3D Wallpaper',
      tags: ['1957 Invention', 'Sealed Air Corp', 'Mainframe Transport'],
    },
  },
  {
    id: 'oth-6',
    topic: 'other',
    topicLabel: 'Other',
    emoji: '🍯',
    headline: '3,000-year-old honey in Egyptian tombs is still edible',
    fact: 'Archeologists unsealed millennia-old clay pots of honey in Egyptian pharaoh tombs that remain edible. Honey’s low moisture (<18%), acidic pH (~3.5), and natural bee enzymes create an antimicrobial environment that prevents biological decay.',
    mindBlownRating: 5,
    quirkyTag: 'Immortal Chemistry',
    palette: {
      bg: 'bg-yellow-50',
      cardBg: 'bg-yellow-100',
      border: 'border-yellow-950',
      accent: 'bg-amber-400',
      text: 'text-yellow-950',
      pillBg: 'bg-yellow-200',
      stampColor: '#b45309',
    },
    shareQuote: 'Sealed 3,000-year-old honey found in Egyptian pharaoh tombs is still completely edible due to its acidity and low moisture.',
    schematic: {
      diagramType: 'generic-specimen',
      badge: 'ARCHAEOLOGICAL CHEMISTRY',
      caption: 'Pharaoh Tombs: Osmotic pressure, gluconic acid, and hydrogen peroxide prevent microbial growth indefinitely.',
      accentBg: 'bg-yellow-200',
      symbol: '🍯',
      metricLabel: 'Chemical pH',
      metricValue: '~3.5 Acidic',
      tags: ['Low Moisture (<18%)', 'Hydrogen Peroxide', 'Perpetual Stability'],
    },
  }
];

export const GOOFY_TONES = [
  { id: 'mind-blown', label: '🤯 Mind Blown', desc: 'Mind-bending reality checks' },
  { id: 'deep-lore', label: '📜 Deep Lore', desc: 'Forgotten archive mysteries' },
  { id: 'snackable', label: '🍿 Snackable', desc: 'Punchy intellectual trivia' },
];

/**
 * Deterministically computes the Fact of the Day for any date.
 * Every user visiting on that day sees the exact same featured fact!
 */
export function getFactOfTheDay(date: Date = new Date()): {
  fact: FactItem;
  dateKey: string;
  formattedDate: string;
  dayIndex: number;
} {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  // Deterministic DJB2 hash of the YYYY-MM-DD string
  let hash = 5381;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) + hash) + dateKey.charCodeAt(i);
  }
  const index = Math.abs(hash) % CURATED_FACTS.length;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return {
    fact: CURATED_FACTS[index],
    dateKey,
    formattedDate,
    dayIndex: index,
  };
}

/**
 * Returns facts for the past N days so users can catch up on previous daily facts
 */
export function getRecentDailyFacts(count = 7): Array<{
  fact: FactItem;
  dateKey: string;
  formattedDate: string;
  isToday: boolean;
  relativeLabel: string;
}> {
  const list = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const result = getFactOfTheDay(d);
    
    let relativeLabel = result.formattedDate;
    if (i === 0) relativeLabel = 'Today';
    else if (i === 1) relativeLabel = 'Yesterday';
    else if (i < 7) {
      relativeLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    list.push({
      fact: result.fact,
      dateKey: result.dateKey,
      formattedDate: result.formattedDate,
      isToday: i === 0,
      relativeLabel,
    });
  }

  return list;
}
