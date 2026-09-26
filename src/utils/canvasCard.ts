import { FactItem } from '../data/facts';

export interface CardStyleOption {
  id: string;
  name: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  subtextColor: string;
}

export const CARD_STYLES: CardStyleOption[] = [
  {
    id: 'retro-yellow',
    name: 'Retro Butter',
    bgColor: '#FFFBEB',
    cardBg: '#FEF08A',
    textColor: '#18181B',
    accentColor: '#F59E0B',
    subtextColor: '#713F12',
  },
  {
    id: 'bubblegum-pink',
    name: 'Bubblegum Pop',
    bgColor: '#FDF2F8',
    cardBg: '#FBCFE8',
    textColor: '#18181B',
    accentColor: '#EC4899',
    subtextColor: '#831843',
  },
  {
    id: 'mint-lime',
    name: 'Electric Matcha',
    bgColor: '#F0FDF4',
    cardBg: '#BBF7D0',
    textColor: '#18181B',
    accentColor: '#22C55E',
    subtextColor: '#14532D',
  },
  {
    id: 'cyber-cyan',
    name: 'Cyan Dopamine',
    bgColor: '#ECFEFF',
    cardBg: '#A5F3FC',
    textColor: '#18181B',
    accentColor: '#06B6D4',
    subtextColor: '#164E63',
  },
  {
    id: 'lavender-dream',
    name: 'Wobbly Grape',
    bgColor: '#FAF5FF',
    cardBg: '#E9D5FF',
    textColor: '#18181B',
    accentColor: '#A855F7',
    subtextColor: '#581C87',
  },
];

export async function generateSocialCardBlob(
  fact: FactItem,
  format: 'square' | 'story' = 'square',
  styleId: string = 'retro-yellow',
  dailyDateBadge?: string
): Promise<{ blob: Blob; dataUrl: string }> {
  const width = 1080;
  const height = format === 'square' ? 1080 : 1920;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Ensure fonts are ready
  try {
    await document.fonts.ready;
  } catch {
    // proceed
  }

  const style = CARD_STYLES.find((s) => s.id === styleId) || CARD_STYLES[0];

  // 1. Draw outer background
  ctx.fillStyle = style.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Draw subtle polka-dot grid pattern
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  const dotSpacing = 36;
  for (let x = 18; x < width; x += dotSpacing) {
    for (let y = 18; y < height; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Draw Main Pop Card with thick retro border & hard drop shadow
  const cardMarginX = 64;
  const cardMarginY = format === 'square' ? 70 : 140;
  const cardWidth = width - cardMarginX * 2;
  const cardHeight = height - cardMarginY * 2;
  const cardRadius = 36;
  const shadowOffset = 20;

  // Draw Hard Shadow
  ctx.fillStyle = '#000000';
  drawRoundedRect(
    ctx,
    cardMarginX + shadowOffset,
    cardMarginY + shadowOffset,
    cardWidth,
    cardHeight,
    cardRadius
  );
  ctx.fill();

  // Draw Card Body
  ctx.fillStyle = style.cardBg;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 10;
  drawRoundedRect(ctx, cardMarginX, cardMarginY, cardWidth, cardHeight, cardRadius);
  ctx.fill();
  ctx.stroke();

  // Content area inner coordinates
  const innerPadX = 56;
  let cursorY = cardMarginY + 68;

  // 3. Top Header: Tag Badge + Stamp
  const badgeX = cardMarginX + innerPadX;
  const badgeY = cursorY;
  const badgeText = `${fact.emoji} ${fact.topicLabel.toUpperCase()}`;

  ctx.font = 'bold 28px "Fredoka", sans-serif';
  const badgeWidth = ctx.measureText(badgeText).width + 36;
  const badgeHeight = 52;

  // Badge shadow
  ctx.fillStyle = '#000000';
  drawRoundedRect(ctx, badgeX + 4, badgeY + 4, badgeWidth, badgeHeight, 14);
  ctx.fill();

  // Badge fill
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 14);
  ctx.fill();
  ctx.stroke();

  // Badge text
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + 18, badgeY + badgeHeight / 2);

  // Top right stamp (either Fact of the Day stamp or quirky tag)
  const stampText = dailyDateBadge ? `⭐ ${dailyDateBadge.toUpperCase()}` : `★ ${fact.quirkyTag.toUpperCase()}`;
  ctx.font = 'bold 22px "Bungee", "Fredoka", sans-serif';
  const stampWidth = ctx.measureText(stampText).width + 30;
  const stampX = cardMarginX + cardWidth - innerPadX - stampWidth;
  const stampY = cursorY;

  ctx.save();
  ctx.translate(stampX + stampWidth / 2, stampY + badgeHeight / 2);
  ctx.rotate(0.03);
  ctx.fillStyle = dailyDateBadge ? '#FBBF24' : style.accentColor;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, -stampWidth / 2, -badgeHeight / 2, stampWidth, badgeHeight, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(stampText, 0, 0);
  ctx.restore();

  cursorY += badgeHeight + (format === 'square' ? 44 : 70);

  // 4. Headline (Goofy Bold Typography)
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#000000';
  ctx.font = '800 52px "Fredoka", "Plus Jakarta Sans", sans-serif';

  const headlineMaxWidth = cardWidth - innerPadX * 2;
  const headlineLines = wrapText(ctx, `"${fact.headline}"`, headlineMaxWidth);
  const headlineLineHeight = 64;

  for (const line of headlineLines) {
    ctx.fillText(line, cardMarginX + innerPadX, cursorY);
    cursorY += headlineLineHeight;
  }

  cursorY += format === 'square' ? 24 : 44;

  // 5. Fact Description Box (Clean white card inside)
  const descBoxY = cursorY;
  const descBoxWidth = cardWidth - innerPadX * 2;
  ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
  const factLines = wrapText(ctx, fact.fact, descBoxWidth - 48);
  const factLineHeight = 46;
  const descBoxHeight = factLines.length * factLineHeight + 48;

  // Box shadow
  ctx.fillStyle = '#000000';
  drawRoundedRect(
    ctx,
    cardMarginX + innerPadX + 6,
    descBoxY + 6,
    descBoxWidth,
    descBoxHeight,
    22
  );
  ctx.fill();

  // Box body
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5;
  drawRoundedRect(ctx, cardMarginX + innerPadX, descBoxY, descBoxWidth, descBoxHeight, 22);
  ctx.fill();
  ctx.stroke();

  // Draw fact text inside
  ctx.fillStyle = '#18181B';
  let factTextY = descBoxY + 28;
  for (const line of factLines) {
    ctx.fillText(line, cardMarginX + innerPadX + 24, factTextY);
    factTextY += factLineHeight;
  }

  // 6. Bottom App Signature Bar
  const footerY = cardMarginY + cardHeight - 64;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 28px "Bungee", "Fredoka", sans-serif';
  ctx.fillText('DECKOFFACTS.APP', cardMarginX + innerPadX, footerY);

  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = style.subtextColor;
  ctx.textAlign = 'right';
  ctx.fillText('Deck of Facts · Zero Repeats 🧠✨', cardMarginX + cardWidth - innerPadX, footerY + 4);

  // Return Blob and Data URL
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create canvas blob'));
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      resolve({ blob, dataUrl });
    }, 'image/png');
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = currentLine ? currentLine + ' ' + words[n] : words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(currentLine);
      currentLine = words[n];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
