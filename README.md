# Calm Grounds Coffee — website (pitch demo)

A sample site for **Calm Grounds Coffee**, a Cebu specialty-coffee pop-up brand — *crafted for quiet moments*.
Built by Waddle Labs to show how a site turns the brand's Facebook/IG following into pop-up foot traffic,
delivery orders, and private-event bookings.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · react-hook-form + zod. Deploy target: Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Requires Node 20.9+.

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, live "next pop-up" spotlight with countdown + `.ics`, venue marquee, signature drinks, three ways to get coffee, social block |
| `/pop-ups` | Upcoming timeline (status derived from dates), filters (All / This week / This month / Regulars), regular spots, past archive |
| `/menu` | Menu with sticky category tabs that follow the scroll |
| `/delivery` | How delivery works, Messenger CTA, order-request form, "Order via" platform links |
| `/events` | Private-event pitch, packages, gallery, booking inquiry form, FAQ |
| `/about` | Story, philosophy, contact |

## Editing content

Everything lives in typed files in **`src/content/`**. Components only read content through
`src/lib/content.ts`, so moving to Supabase or a CMS later means changing those getters, not the UI.

### Pop-ups — `src/content/popups.ts`

```ts
{
  id: "astra-weekend",                 // unique, URL-safe
  title: "Weekend at Astra",
  venue: "Astra Lifestyle Centre",
  city: "Cebu City",
  startDate: "2026-11-14T11:00:00+08:00", // ISO with Manila offset
  endDate:   "2026-11-15T20:00:00+08:00",
  hours: "11 AM – 8 PM",
  mapUrl: "https://maps.google.com/?q=Astra+Lifestyle+Centre+Cebu",
  partnerEvent: "Optional — shows an 'Event partner' label",
  note: "Optional one-liner, shown in handwriting",
}
```

- **Status is never stored.** "Happening now", "Upcoming", and "Past" are computed from the dates (Asia/Manila), and past events move into the archive automatically.
- The demo seeds dates *relative to today* with `manilaDate(daysFromToday, "HH:mm")`, so something is always live. Replace these with real ISO strings.
- Pages re-render hourly (`revalidate = 3600`), and badges and countdowns also re-check live in the browser.

**Regular spots:** `src/content/regulars.ts`, with a `schedule` string such as `"Every Sunday"`.

### Menu — `src/content/menu.ts`

Each item has `category` (`espresso | non-coffee | signatures | cold | food`), `name`, a one-line `description`,
`price` (whole pesos), and optional `tags` (`bestseller | new | iced | hot | oat-friendly`).
The home page shows the first four `signatures`.

### Other content

| File | Contents |
|---|---|
| `site.ts` | Email, socials, Messenger link, delivery-platform links (`enabled: false` hides one), **delivery model** |
| `packages.ts` | Event packages, event types, budget ranges |
| `faq.ts` | Events FAQ |
| `gallery.ts` | Instagram tiles + event gallery. Add `src: "/gallery/x.jpg"` to swap a line-art tile for a photo |
| `delivery-copy.ts` | "How it works" steps for each delivery model |

### Delivery model

Set `site.delivery.mode` to one of the following and `/delivery` adapts:

- `"preorder-batch"` (default): brewed in batches on set days
- `"self-delivery"`: the shop books Lalamove/Grab per order
- `"platform"`: points customers to GrabFood/foodpanda

## Forms

Both forms (booking inquiry and delivery order request) validate in the browser with zod (`src/lib/schema.ts`).
They submit through one function, `submitInquiry()` in `src/lib/submit-inquiry.ts`. Today it only logs the inquiry and returns success.

```ts
// TODO: wire to n8n webhook / Supabase
```

Errors are announced through `aria-live`, double submission is blocked, and success shows the animated mascot.

## Brand + motion system

- **Colors** (eyedropped from the mascot file): calm blue `#0E36F0`, cream `#FBEFE3`, deep ink `#0B1A5C`, milk `#FFFBF5`, latte `#E5C9AE`. They're defined as Tailwind tokens in `src/app/globals.css`, and sections switch themes with `data-theme="blue|cream|milk"`. Every text pairing passes WCAG AA. Latte is used only for decorative dividers.
- **Type:** Unbounded (display), DM Sans (body), Caveat (handwritten notes, used sparingly). Loaded via `next/font`.
- **Motion tokens:** `src/lib/motion.ts`, ease `cubic-bezier(0.22, 1, 0.36, 1)`. Reusable primitives in `src/components/motion/`: `Reveal`, `Stagger`, `Parallax`, `Marquee`, `SteamPaths`, `RollingDigit`, `ThemeSection`, and the page-transition system.
- **Page transitions:** a calm-blue curtain with the mascot. Back/forward stays instant and keeps native scroll restoration.
- **Reduced motion:** turns off Lenis, parallax, the marquee, and looping animations. Page transitions become a 150ms crossfade. Content is visible in the HTML by default, and only below-the-fold sections get hidden (then revealed) after hydration.

### Watermelon UI components

Adapted components carry a comment at the top of the file naming their source:

| File | Source |
|---|---|
| `components/ui/sliding-tabs.tsx` | `continuous-tabs` |
| `components/motion/rolling-digit.tsx` | `pagination` |
| `components/ui/accordion.tsx` | `faq-6` |
| `components/sections/packages.tsx` | `pricing-3` |
| `components/sections/footer.tsx` | `footer-16` |
| `components/ui/field.tsx` | `form-3` |
| `components/ui/status-badge.tsx` | `badge-1` |

All of them are re-themed to the brand tokens.

## Placeholders to replace before launch

| What | Where |
|---|---|
| Pop-up dates and venues (seeded relative to today) | `src/content/popups.ts` |
| Regular spots and schedules | `src/content/regulars.ts` |
| **All menu items and prices** | `src/content/menu.ts` |
| Event packages and rates | `src/content/packages.ts` |
| FAQ answers (space, power, travel fees, deposit) | `src/content/faq.ts` |
| Delivery coverage, lead time, minimum, cut-off, batch days, and which model to use | `src/content/site.ts` → `delivery` |
| Delivery-platform links (all but Lalamove disabled) | `src/content/site.ts` → `deliveryLinks` |
| Facebook page URL and Messenger username | `src/content/site.ts` |
| Production domain (used for canonical URLs, OG images, sitemap) | `src/content/site.ts` → `url` |
| Brand story and values copy | `src/app/about/page.tsx` |
| Instagram tiles and event gallery (line-art stand-ins for photos) | `src/content/gallery.ts` (+ add files to `public/gallery/`) |
| Wordmark (currently typeset in Unbounded; the real logo SVG isn't supplied yet) | `src/components/ui/logo.tsx`, header in `src/components/sections/header.tsx` |
| Form submission backend | `src/lib/submit-inquiry.ts` |
| Waddle Labs credit link | `src/components/sections/footer.tsx` |

The mascot (`public/brand/mascot.png`) is the client's artwork, used as supplied. Only a stray 2px dark edge on the right was cropped off.
