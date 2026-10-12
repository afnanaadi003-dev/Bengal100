# Bengal100 — Plan & Notes

**Bengal100** — a dreamy, cinematic, mobile-first web platform celebrating 100 beautiful faces of the Bengal film & fashion industry (70% Bangla film industry 🇧🇩, 30% Kolkata/Trapwood 🇮🇳 mix). This v1 ships a launch wave of 5 headline icons; the platform is built data-driven so the remaining 95 can be added without touching design/code structure.

## What ships in this build
- **Editable-free, publishable platform** — single-file `index.html` (no build step, no CMS for the public). Deploy → live.
- **Brand-style logo** — "Bengal100" mark (lotus-petal star in a film-reel ring).
- **Cinematic feed** — dark dreamy hero, aurora glow orbs, grain, floating petals; posts rendered like film frames.
- **5 icons with full profiles**: Bidya Sinha Mim, Jaya Ahsan, Pori Moni (Porimoni), Nabila, Parno Mittra.
  - profile cover + avatar, type badge (e.g. "Leading Lady of Two Bengals", "The Ramp Dream")
  - **Spark react** (a brand-new ✨ lightning-star icon — not the usual heart)
  - **Follow** button with follower count
  - career **timeline** (year → milestone)
  - **Notable works** chips
  - 5-image **gallery + 4 image post frames**
  - **Brand collaborations** — every actress has a *different set* of collab brands; brand chips click into **brand pages**
  - **Share Thoughts** — public comment box + comment list per profile
- **Brands page** — 8 collab brands with their own pages (bio, vibe, collaborated icons, collaboration story).
- **Admin profile** — "The Foundry Story · Bengal100 Studio":
  - admin photo (placeholder image you can swap for your own photo — see below)
  - admin **timeline** with your **3 story photos** (placeholders ready to swap)
  - the big **announcement post** — Bengal100 Talent Collab so actresses get paid, joyful collabs (earnable income)
  - follow + comments
- **Everything clickable/active**: nav, cards, modals, chips, buttons, comment send, share (Web Share API + copy-link fallback), back-to-top, mobile bottom bar.
- **Fully responsive**: mobile bottom nav, tablet grid, desktop cinema layout; tested breakpoints 360 / 768 / 1200 px.

## Data structure (all in one place in `index.html`)
```js
celebrities[] -> { id, name, tag, type, city, avatar, cover, bio,
                   follow, sparks, timeline[], works[], gallery[],
                   brands[], posts[], comments[] }
brands[]      -> { id, name, tag, bio, vibe, members[] }
feedPosts[]   -> { author (celeb/admin), text, imgs[], time }
```

## Photo & image policy (live-publishable, no copying)
- Real photos cannot be scraped/copied from Instagram → copyrighted. For a publishable site we use **aesthetic placeholder frames (picsum seeds)** that always render — every image, avatar and cover has a graceful fallback (gradient + initials) if a URL ever fails.
- **Ready-to-swap**: each `celebrities[]` entry has `avatar`, `cover`, `gallery` URLs. Replace the picsum URLs with **studio-licensed / permission-granted images** (official press kits, agency portraits, or verified accounts that grant usage) and the entire site (profiles, gallery, feed, covers) updates with **zero code changes**.
- **Admin**: swap `ADMIN.avatar` + the 3 `admin.timeline` photo URLs with your own photos — same one-line changes.
- Brand collabs ship with dreamy fictional brand names ("collab story" slots) so no real-world brand/person pairings are falsely implied.

## Publishing / "make it live"
- The site is a static file → hosts free on **Netlify Drop / GitHub Pages / Vercel**, or any host.
- Comments & follows persist in the visitor's browser (localStorage). For server-side shared comments later, add a small backend (Supabase/Firebase) — the UI functions are already wired for it.

## Files
- `plan.md` — this document
- `index.html` — the full site (HTML + CSS + JS in one portable file)
