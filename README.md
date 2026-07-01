# SOUNDS FUN™ — Interactive B2B Concept Store

An experimental, interactive mock web-store built as an example of a new
style of storefront. It's a single-page 3D "room" you explore with your mouse:
the space tilts toward your cursor, the merch floats and wobbles when you hover
it, and clicking any item opens a product card you can add to a cart.

It's a joke B2B store — every product is a piece of corporate synergy dressed up
as streetwear — but the interaction model is the real point. **Feel free to build
from it and make your own interactive store.**

Built with **Vite** and **strict TypeScript**, with **zero image assets** — every
object is an emoji, so the whole thing is tiny and fully self-contained.

---

## Features

- **Parallax room** — the concrete-lit purple room tilts on `rotateX`/`rotateY`
  toward the cursor, and each product drifts by an amount proportional to its
  `depth`, so near objects move more than far ones.
- **Hover-reactive merch** — objects idle-float out of sync, then wobble, scale,
  and glow with a springy ease on hover, popping a neon price tag.
- **Product modals** — click any item for its card (name, tagline, absurd
  "$/seat/mo" price) and an **Add synergy to cart** button.
- **Cart HUD + toasts** — a running item count that bumps on add, a total on
  checkout, and dismissable toast notifications.
- **Pure vibe styling** — flickering neon sign, scrolling marquee bands
  (`PROJECTS`, `PRESS`, `SYNERGY · SCALE · SHIP`), signage tiles, and a reflective
  floor — all CSS.
- **Accessible & keyboard-friendly** — products are real `<button>`s with focus
  outlines; `Esc` closes the modal.
- **No framework, no dependencies** — a tiny typed `el()` DOM helper builds the
  whole scene.

---

## Tech Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Build tool | [Vite](https://vitejs.dev) 5             |
| Language   | TypeScript 5 (`strict`, no `any`)        |
| UI         | Hand-rolled DOM + CSS (no framework)     |
| Assets     | Emoji only — no images                   |

---

## Getting Started

Requires [Node.js](https://nodejs.org) 18+.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check and build for production (outputs to dist/)
npm run build

# preview the production build locally
npm run preview
```

Then open **http://localhost:5173** and:

- **Move your mouse** to tilt the room.
- **Hover the merch** to make it wobble and reveal its price.
- **Click an item** to open its product card, then add it to the cart.

> **Windows note:** run `npm run dev` from *inside* the project folder using its
> normal path. Launching Vite with the folder's 8.3 short path (e.g. `MOCKB2~2`)
> makes it serve raw `.ts` files, which breaks the page.

---

## Project Structure

```
.
├── index.html          # entry HTML, mounts #app
├── src/
│   ├── main.ts         # builds the scene + wires all interactivity
│   ├── products.ts     # the merch data (edit this to change the store)
│   └── style.css       # the room, neon, animations, modal, HUD
├── package.json
└── tsconfig.json
```

---

## Customizing the Store

All the merch lives in [`src/products.ts`](src/products.ts) as a typed array.
Add, rename, reprice, or reposition items by editing the objects — each one is:

```ts
{
  id: 'soda',                 // unique id
  emoji: '🥤',                // the object shown in the room
  name: 'Disruptive Beverage',
  tagline: 'Cold brew for people who "circle back."',
  price: 42,                  // shown as $42 / seat / mo
  x: 60, y: 34,               // position, in % of the room
  size: 92,                   // base size in px
  depth: 0.55,                // 0 = far wall, 1 = in your face (drives parallax)
  wall: 'back',               // 'back' | 'right'
}
```

Colors and the overall mood are CSS variables at the top of
[`src/style.css`](src/style.css) (`--purple`, `--magenta`, `--neon`, …).

---

## License

Provided as an experimental example — build from it and make it your own.
