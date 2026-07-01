export interface Product {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  /** price in USD, absurd on purpose */
  price: number;
  /** position on the scene, in % of the room box */
  x: number;
  y: number;
  /** base size in px */
  size: number;
  /** parallax depth: 0 = far wall, 1 = right in your face */
  depth: number;
  /** which surface it lives on (affects the idle drift direction) */
  wall: 'back' | 'right';
}

/**
 * The "merch". This is a joke B2B store, so every product is a piece of
 * corporate synergy dressed up as streetwear. Emojis keep it asset-free.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'soda',
    emoji: '🥤',
    name: 'Disruptive Beverage',
    tagline: 'Cold brew for people who "circle back."',
    price: 42,
    x: 60,
    y: 34,
    size: 92,
    depth: 0.55,
    wall: 'back',
  },
  {
    id: 'hand',
    emoji: '🦾',
    name: 'The Handshake™',
    tagline: 'A B2B deal, now available as a physical arm.',
    price: 990,
    x: 68,
    y: 36,
    size: 88,
    depth: 0.6,
    wall: 'back',
  },
  {
    id: 'perfume',
    emoji: '🧴',
    name: 'Eau de Onboarding',
    tagline: 'Smells like a fresh Slack workspace.',
    price: 128,
    x: 74,
    y: 33,
    size: 74,
    depth: 0.62,
    wall: 'back',
  },
  {
    id: 'crystal',
    emoji: '🔮',
    name: 'Q4 Forecast Orb',
    tagline: 'Predicts revenue. Usually wrong. Very shiny.',
    price: 305,
    x: 38,
    y: 46,
    size: 96,
    depth: 0.5,
    wall: 'back',
  },
  {
    id: 'bear',
    emoji: '🧸',
    name: 'Stakeholder Bear',
    tagline: 'Emotional support for your standups.',
    price: 64,
    x: 47,
    y: 50,
    size: 90,
    depth: 0.52,
    wall: 'back',
  },
  {
    id: 'laptop',
    emoji: '💻',
    name: 'The Deck (Physical)',
    tagline: '"Let me just share my screen." Now IRL.',
    price: 218,
    x: 55,
    y: 49,
    size: 96,
    depth: 0.54,
    wall: 'back',
  },
  {
    id: 'statue',
    emoji: '🗿',
    name: 'Thought Leader Bust',
    tagline: 'For the founder who has "takes."',
    price: 540,
    x: 88,
    y: 40,
    size: 88,
    depth: 0.72,
    wall: 'right',
  },
  {
    id: 'bag',
    emoji: '🛍️',
    name: 'Synergy Tote',
    tagline: 'Carry your low-hanging fruit in style.',
    price: 55,
    x: 82,
    y: 60,
    size: 84,
    depth: 0.75,
    wall: 'right',
  },
  {
    id: 'diamond',
    emoji: '💎',
    name: 'Vested Equity',
    tagline: '4-year cliff. Looks great on a shelf.',
    price: 4000,
    x: 95,
    y: 62,
    size: 82,
    depth: 0.78,
    wall: 'right',
  },
  {
    id: 'chart',
    emoji: '📈',
    name: 'Up-And-To-The-Right',
    tagline: 'A graph that only goes one way. Framed.',
    price: 149,
    x: 96,
    y: 40,
    size: 78,
    depth: 0.7,
    wall: 'right',
  },
];
