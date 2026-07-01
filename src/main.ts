import './style.css';
import { PRODUCTS, type Product } from './products.ts';

/* ------------------------------------------------------------------
   Tiny DOM helper — typed, no framework.
------------------------------------------------------------------ */
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & { class?: string } = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  const { class: className, ...rest } = props;
  if (className) node.className = className;
  Object.assign(node, rest);
  for (const child of children) {
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/* A repeating marquee track (duplicated so the loop is seamless). */
function marquee(text: string, cls: string): HTMLElement {
  const line = ` ${text} · `.repeat(12);
  return el('div', { class: `band ${cls}` }, el('div', { class: 'track' }, el('span', {}, line), el('span', {}, line)));
}

/* ------------------------------------------------------------------
   Store state
------------------------------------------------------------------ */
const cart: Product[] = [];
let cartCountEl: HTMLElement;
let cartEl: HTMLElement;

function money(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

function addToCart(p: Product): void {
  cart.push(p);
  cartCountEl.textContent = String(cart.length);
  cartEl.classList.remove('bump');
  void cartEl.offsetWidth; // restart animation
  cartEl.classList.add('bump');
  toast(`Added “${p.name}” — ${money(p.price)}`);
}

/* ------------------------------------------------------------------
   Toasts
------------------------------------------------------------------ */
let toastLayer: HTMLElement;
function toast(msg: string): void {
  const t = el('div', { class: 'toast' }, msg);
  toastLayer.append(t);
  setTimeout(() => t.remove(), 3000);
}

/* ------------------------------------------------------------------
   Product modal
------------------------------------------------------------------ */
let modalBack: HTMLElement;
let modalBig: HTMLElement;
let modalTitle: HTMLElement;
let modalDesc: HTMLElement;
let modalPrice: HTMLElement;
let activeProduct: Product | null = null;

function openModal(p: Product): void {
  activeProduct = p;
  modalBig.textContent = p.emoji;
  modalTitle.textContent = p.name;
  modalDesc.textContent = p.tagline;
  modalPrice.textContent = money(p.price) + ' / seat / mo';
  modalBack.classList.add('open');
}
function closeModal(): void {
  modalBack.classList.remove('open');
  activeProduct = null;
}

/* ------------------------------------------------------------------
   Build the scene
------------------------------------------------------------------ */
const app = document.getElementById('app')!;

// HUD
cartCountEl = el('span', { class: 'count' }, '0');
cartEl = el('div', { class: 'cart' }, el('span', {}, '🛒 Cart'), cartCountEl);
cartEl.addEventListener('click', () => {
  if (cart.length === 0) return toast('Cart empty. Go touch some synergy.');
  const total = cart.reduce((s, p) => s + p.price, 0);
  toast(`${cart.length} item(s) · ${money(total)} — checkout is “coming Q5”.`);
});

const hud = el(
  'div',
  { class: 'hud' },
  el('div', { class: 'brand' }, ...[textB('SOUNDS'), sp(' '), textNeon('FUN™'), sp('  '), textDim('a b2b concept store')]),
  cartEl,
);

// The stage / room
const room = el('div', { class: 'room' });
const stage = el('div', { class: 'stage' }, room);

room.append(el('div', { class: 'wall' }));
room.append(el('div', { class: 'wall right' }));
room.append(el('div', { class: 'floor' }));

// Neon sign
const neon = el('div', { class: 'neon' });
neon.innerHTML = 'SOUNDS FUN<sup>™</sup>';
room.append(neon);

// Signage
room.append(sign('camera', '😊 SMILE', 'you’re on camera'));
room.append(sign('whatsup', "WHAT'S UP?", ''));

// Marquees
room.append(marquee('PROJECTS', 'b1'));
room.append(marquee('PRESS', 'b2'));
room.append(marquee('SYNERGY · SCALE · SHIP · DISRUPT · ALIGN', 'b3'));

// The figure (our silent B2B host)
room.append(el('div', { class: 'figure' }, '🧍'));

// Products
for (const p of PRODUCTS) {
  room.append(buildProduct(p));
}

// Modal
const closeBtn = el('button', { class: 'close', ariaLabel: 'Close' }, '✕');
closeBtn.addEventListener('click', closeModal);
modalBig = el('div', { class: 'big' });
modalTitle = el('h2');
modalDesc = el('p');
modalPrice = el('div', { class: 'price' });
const buyBtn = el('button', { class: 'buy' }, 'Add synergy to cart');
buyBtn.addEventListener('click', () => {
  if (activeProduct) addToCart(activeProduct);
  closeModal();
});
const modal = el('div', { class: 'modal' }, closeBtn, modalBig, modalTitle, modalDesc, modalPrice, buyBtn);
modalBack = el('div', { class: 'modal-back' }, modal);
modalBack.addEventListener('click', (e) => {
  if (e.target === modalBack) closeModal();
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());

// Toasts + hint
toastLayer = el('div', { class: 'toast-layer' });
const hint = el('div', { class: 'hint' }, 'MOVE YOUR MOUSE · HOVER THE MERCH · CLICK TO SHOP');

app.append(hud, stage, modalBack, toastLayer, hint);

/* ------------------------------------------------------------------
   Product element + interactions
------------------------------------------------------------------ */
function buildProduct(p: Product): HTMLElement {
  const glyph = el('span', { class: 'glyph' }, p.emoji);
  const tag = el('span', { class: 'tag' }, money(p.price));
  const btn = el('button', {
    class: 'product',
    ariaLabel: `${p.name}, ${money(p.price)}`,
    title: p.name,
  }, glyph, tag);

  btn.style.left = p.x + '%';
  btn.style.top = p.y + '%';
  btn.style.fontSize = p.size + 'px';
  btn.dataset.depth = String(p.depth);
  // stagger the idle float so they don't bob in sync
  glyph.style.animationDelay = (Math.random() * -4).toFixed(2) + 's';

  btn.addEventListener('click', () => {
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
    openModal(p);
  });
  return btn;
}

/* ------------------------------------------------------------------
   Parallax — the room tilts toward the cursor, and each product
   drifts by an amount proportional to its depth.
------------------------------------------------------------------ */
const productNodes = Array.from(document.querySelectorAll<HTMLElement>('.product'));

stage.addEventListener('pointermove', (e) => {
  const r = stage.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
  const ny = (e.clientY - r.top) / r.height - 0.5;

  room.style.transform = `rotateY(${nx * 6}deg) rotateX(${ny * -6}deg)`;

  for (const node of productNodes) {
    const depth = Number(node.dataset.depth) || 0.5;
    const shift = (depth - 0.4) * 40;
    node.style.marginLeft = (-nx * shift).toFixed(1) + 'px';
    node.style.marginTop = (-ny * shift).toFixed(1) + 'px';
  }
});

stage.addEventListener('pointerleave', () => {
  room.style.transform = 'rotateY(0) rotateX(0)';
  for (const node of productNodes) {
    node.style.marginLeft = '0';
    node.style.marginTop = '0';
  }
});

/* ------------------------------------------------------------------
   Small inline-text helpers for the brand lockup
------------------------------------------------------------------ */
function textB(t: string) { return el('b', {}, t); }
function textNeon(t: string) { const s = el('b', {}, t); s.style.color = 'var(--neon)'; return s; }
function textDim(t: string) { return el('span', {}, t); }
function sp(t: string) { return document.createTextNode(t); }

function sign(cls: string, big: string, small: string): HTMLElement {
  const node = el('div', { class: `sign ${cls}` }, big);
  if (small) { node.append(document.createElement('br'), el('small', {}, small)); }
  return node;
}
