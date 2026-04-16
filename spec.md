# StationeryAtlas — Japanese Ballpoint Pen Database

## Problem
Fountain pens have Goulet Pens, JetPens, r/fountainpens (1.8M members).
Ballpoint pens have NOTHING. No dedicated curation site exists despite Japan
being the world's ballpoint pen powerhouse (Uni, Pilot, Zebra, Pentel, Tombow).

The #1 unmet need: **refill cross-compatibility** — "can I use Jetstream refills
in a Pilot pen?" gets asked repeatedly on Reddit with no definitive answer.

## Solution
Pivot StationeryAtlas from general stationery to **Japanese ballpoint pen
specialist**. Keep existing non-ballpoint data but make ballpoint the hero.

### Core features
1. **Pen Database** — 50+ ballpoint pens filterable by: brand, ink type, tip size,
   grip diameter, weight, price, left-handed friendliness
2. **Refill Compatibility DB** — world's first: which refills fit which pen bodies.
   3-tier rating: fits perfectly / fits with wobble / doesn't fit
3. **First-hand reviews** — owner visits Itoya Ginza, Maruzen, Loft for hands-on
   testing with photos (iPhone SE2)
4. **Comparison tool** — side-by-side spec comparison (2-3 pens at once)

### Killer differentiators (things AI can't replicate)
- Physical refill compatibility testing with photos
- In-store first-hand reviews from Japan
- Ink dry time tests for left-handed writers
- Grip diameter measurements for small hands
- Cold-weather ink performance tests

## Tech Stack
- GitHub Pages (static)
- Vanilla JS + Tailwind CSS
- data/pens.json + data/refills.json + data/compatibility.json
- GA4 + Clarity

## GitHub Repos
- humancronadmin/stationery-atlas (existing, pivot in place)

## MVP Scope
1. Replace homepage hero: "Japanese Ballpoint Pens, Decoded"
2. Create pens.json with 30 popular Japanese ballpoint pens (with ASINs)
3. Create refills.json with 20 common refill types
4. Create compatibility.json (start with brand-official data, expand with
   physical testing later)
5. Database page: filter by brand/ink type/tip size/grip diameter
6. 3 SEO articles:
   - "Japanese Ballpoint Pen Refill Compatibility Guide"
   - "Best Ballpoint Pens for Left-Handed Writers"
   - "Jetstream vs EnerGel: Which Japanese Pen Wins?"

## Data Sources
- Official brand specs (uni-mitsubishi.co.jp, pilot.co.jp, zebra.co.jp)
- Amazon product pages (for ASINs and prices)
- Physical testing at Itoya/Maruzen (owner's first-hand data)
- Reddit r/pens community knowledge (verified before inclusion)

## Revenue Model
- Amazon US affiliate (japantool-20): pen + refill purchases
- JetPens affiliate (if approved): specialty purchases
- Future: sponsored reviews, digital refill guide

## SEO Keywords
| Priority | Keyword | Est. Monthly Searches |
|---|---|---|
| Main | best japanese ballpoint pen | 1,200 |
| Main | uni-ball jetstream | 8,500 |
| Long-tail | ballpoint pen refill compatibility | 200 (LOW competition) |
| Long-tail | best pen for left-handed writers | 500 |
| Long-tail | jetstream vs energel | 800 |
| Long-tail | best ballpoint pen for small hands | 350 |

## What stays from current site
- Existing fountain pen / notebook / planner data remains accessible
- URL structure unchanged
- GA4 / Clarity / Schema markup stays
- CSS theme stays (minor color tweaks for ballpoint focus)

## Migration plan
1. New homepage with ballpoint hero section
2. pens.json replaces products.json as primary dataset
3. Old products.json renamed to legacy_products.json, still served on /database
4. New /ballpoint-db page as main attraction
5. /refill-guide page for compatibility database
