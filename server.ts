import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';

// Server-side initialization
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/gemini/generate-fact', async (req, res) => {
  try {
    const { topic = 'all', dailyContext = 'any', tone = 'mind-blown', avoidTitles = [] } = req.body;

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server.',
        fallback: true,
      });
    }

    const topicPromptMap: Record<string, string> = {
      history: 'Wild, bizarre, hilarious, or surprising real historical events, quirky figures, ancient customs, or shocking origins of things we use daily.',
      'human-body': 'The human body, quirky anatomy, brain glitches, strange biology, sensory illusions, sleep quirks, or why we make weird noises/reflexes.',
      literature: 'Literature, books, famous authors, wacky origins of everyday slang/words, weird grammatical quirks, or wild backstories of classic tales.',
      science: 'Everyday physical science, kitchen chemistry, animal behavior, home appliances, strange acoustic quirks, or everyday natural phenomena.',
      other: 'Everyday habits, coffee, snacks, food science, domestic inventions, pets, and funny modern life oddities.',
      all: 'A totally unexpected, delightfully weird topic spanning either history, human body glitches, everyday science mysteries, weird literature origins, or quirky daily habits.',
    };

    const tonePromptMap: Record<string, string> = {
      'mind-blown': 'Shocking, mind-bending, eye-opening reality check that makes people stop and say "no way".',
      'unhinged-goofy': 'Comedic, mildly unhinged, playful, energetic humor with sassy modern commentary.',
      'snackable-wisdom': 'Crisp, witty, fascinating party-trick fact you can drop in casual conversation.',
      'explain-like-im-5': 'Zero jargon, delightfully simple, high-impact and instantly understandable.',
    };

    const targetTopicDesc = topicPromptMap[topic] || topicPromptMap['all'];
    const targetToneDesc = tonePromptMap[tone] || tonePromptMap['mind-blown'];
    const avoidNote = avoidTitles && avoidTitles.length > 0 
      ? `Do NOT repeat or closely resemble these facts: ${avoidTitles.slice(0, 10).join(', ')}.`
      : '';

    const prompt = `
Generate ONE super engaging, 100% verified, delightfully fun and quirky fact.
Target Topic: ${targetTopicDesc}
Target Vibe/Tone: ${targetToneDesc}
Daily Life Context: ${dailyContext !== 'any' ? `Relate directly to: ${dailyContext}` : 'Must directly connect to something regular humans experience in daily modern life (e.g. morning routine, snacking, weird body feelings, phone habits, elevator rides, showering).'}.
${avoidNote}

Rules:
1. It MUST be 100% scientifically or historically verified (no myths or debunked folklore).
2. It MUST NOT be dry or complicated. Zero academic snoozing.
3. It MUST be directly relatable to everyday human life.
4. Keep the text punchy, energetic, and witty.
`;

    let responseText: string | undefined;

    // Call gemini-3.8-flash with up to 2 attempts for resilience
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: `You are the ultimate fun fact generator. You tell mind-boggling, verified trivia that connects deeply with daily modern life, delivered in a playful, goofy, charmingly witty voice with zero dry fluff.`,
            temperature: 0.9,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                topic: {
                  type: Type.STRING,
                  description: 'One of: history, human-body, literature, science, other',
                },
                topicLabel: {
                  type: Type.STRING,
                  description: 'History, Human Body, Literature, Science, or Other',
                },
                emoji: {
                  type: Type.STRING,
                  description: 'Single high-energy matching emoji',
                },
                headline: {
                  type: Type.STRING,
                  description: 'Catchy, humorous, slightly goofy title (under 12 words)',
                },
                fact: {
                  type: Type.STRING,
                  description: '2 to 3 sentences explaining the fact with punchy clarity',
                },
                dailyConnection: {
                  type: Type.STRING,
                  description: 'Explicit real-world situation where a human experiences this in everyday life',
                },
                goofyTakeaway: {
                  type: Type.STRING,
                  description: 'A hilarious 1-liner to tell someone today',
                },
                mindBlownRating: {
                  type: Type.INTEGER,
                  description: 'Rating from 4 to 5',
                },
                quirkyTag: {
                  type: Type.STRING,
                  description: '2-3 word witty badge (e.g. Body Glitch, Kitchen Mystery, History Drama)',
                },
                shareQuote: {
                  type: Type.STRING,
                  description: 'Punchy 1-2 sentence viral quote perfectly formatted for sharing on social media',
                },
                colorTheme: {
                  type: Type.STRING,
                  description: 'One of: cyan, amber, orange, rose, lime, violet, emerald, yellow, purple, pink, teal, blue',
                },
              },
              required: [
                'topic',
                'topicLabel',
                'emoji',
                'headline',
                'fact',
                'dailyConnection',
                'goofyTakeaway',
                'mindBlownRating',
                'quirkyTag',
                'shareQuote',
                'colorTheme',
              ],
            },
          },
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Attempt ${attempt} on gemini-3.8-flash failed:`, err?.message || err);
        if (attempt === 1) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    }

    if (!responseText) {
      throw new Error('Empty response received from Gemini model');
    }

    const parsed = JSON.parse(responseText);
    const colorTheme = parsed.colorTheme || 'amber';

    const colorPalettes: Record<string, {
      bg: string;
      cardBg: string;
      border: string;
      accent: string;
      text: string;
      pillBg: string;
      stampColor: string;
    }> = {
      cyan: { bg: 'bg-cyan-50', cardBg: 'bg-cyan-100', border: 'border-cyan-950', accent: 'bg-cyan-400', text: 'text-cyan-950', pillBg: 'bg-cyan-200', stampColor: '#0891b2' },
      amber: { bg: 'bg-amber-50', cardBg: 'bg-amber-100', border: 'border-amber-950', accent: 'bg-amber-400', text: 'text-amber-950', pillBg: 'bg-amber-200', stampColor: '#d97706' },
      orange: { bg: 'bg-orange-50', cardBg: 'bg-orange-100', border: 'border-orange-950', accent: 'bg-orange-400', text: 'text-orange-950', pillBg: 'bg-orange-200', stampColor: '#ea580c' },
      rose: { bg: 'bg-rose-50', cardBg: 'bg-rose-100', border: 'border-rose-950', accent: 'bg-rose-400', text: 'text-rose-950', pillBg: 'bg-rose-200', stampColor: '#e11d48' },
      lime: { bg: 'bg-lime-50', cardBg: 'bg-lime-100', border: 'border-lime-950', accent: 'bg-lime-400', text: 'text-lime-950', pillBg: 'bg-lime-200', stampColor: '#65a30d' },
      violet: { bg: 'bg-violet-50', cardBg: 'bg-violet-100', border: 'border-violet-950', accent: 'bg-violet-400', text: 'text-violet-950', pillBg: 'bg-violet-200', stampColor: '#7c3aed' },
      emerald: { bg: 'bg-emerald-50', cardBg: 'bg-emerald-100', border: 'border-emerald-950', accent: 'bg-emerald-400', text: 'text-emerald-950', pillBg: 'bg-emerald-200', stampColor: '#059669' },
      yellow: { bg: 'bg-yellow-50', cardBg: 'bg-yellow-100', border: 'border-yellow-950', accent: 'bg-yellow-400', text: 'text-yellow-950', pillBg: 'bg-yellow-200', stampColor: '#ca8a04' },
      purple: { bg: 'bg-purple-50', cardBg: 'bg-purple-100', border: 'border-purple-950', accent: 'bg-purple-400', text: 'text-purple-950', pillBg: 'bg-purple-200', stampColor: '#9333ea' },
      pink: { bg: 'bg-pink-50', cardBg: 'bg-pink-100', border: 'border-pink-950', accent: 'bg-pink-400', text: 'text-pink-950', pillBg: 'bg-pink-200', stampColor: '#db2777' },
      teal: { bg: 'bg-teal-50', cardBg: 'bg-teal-100', border: 'border-teal-950', accent: 'bg-teal-400', text: 'text-teal-950', pillBg: 'bg-teal-200', stampColor: '#0d9488' },
      blue: { bg: 'bg-blue-50', cardBg: 'bg-blue-100', border: 'border-blue-950', accent: 'bg-blue-400', text: 'text-blue-950', pillBg: 'bg-blue-200', stampColor: '#2563eb' },
    };

    const palette = colorPalettes[colorTheme] || colorPalettes['amber'];

    const formattedFact = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      topic: parsed.topic || topic || 'science',
      topicLabel: parsed.topicLabel || 'Everyday Science',
      emoji: parsed.emoji || '✨',
      headline: parsed.headline,
      fact: parsed.fact,
      dailyConnection: parsed.dailyConnection,
      goofyTakeaway: parsed.goofyTakeaway,
      mindBlownRating: parsed.mindBlownRating || 5,
      quirkyTag: parsed.quirkyTag || 'Fresh AI Nugget',
      palette,
      shareQuote: parsed.shareQuote,
      isAiGenerated: true,
    };

    res.json({ fact: formattedFact });
  } catch (error: any) {
    console.error('Error generating fact via Gemini:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate fact with AI',
      fallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
