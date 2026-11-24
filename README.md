# morrow-cafe# MORROW CAFÉ (明日喫茶)
> A little pause from everything. Japanese minimalism meets European café warmth in the heart of Indiranagar, Bengaluru.

## Overview
MORROW CAFÉ is a refined, editorial frontend experience celebrating unhurried living, direct-trade single origin coffees, ceremonial Uji matcha, and 72-hour laminated heritage pastries.

## Aesthetic Vision: Kyoto Kissaten × European Salon de Thé
The brand draws inspiration from Kyoto's historic, contemplative kissaten culture merged with the tactile warmth of classic Parisian salons. Spaces are designed with honesty: honest cedar wood, hand-thrown ceramics, linen curtains, and natural sunlight filtering through maple leaves.

## Color Palette & Visual Identity
- **Warm Ivory (`#F5F2EA`)**: Warm paper-like canvas that prevents eye fatigue.
- **Charcoal (`#242720`)**: Deep organic charcoal typography instead of stark pitch black.
- **Muted Sage Green (`#A3AA91`)**: Botanical accents inspired by Japanese tea plantations.
- **Subtle Terracotta (`#BD785F`)**: Tactile warmth referencing fired Kasama pottery and baked crusts.

## Typography System
- **Display Headings**: *Cormorant Garamond* — classical, graceful editorial serif.
- **Contemporary Body**: *Plus Jakarta Sans* — geometric, highly legible modern grotesque.
- **Calligraphic Watermarks**: *Noto Serif JP* — authentic Japanese typography celebrating *Ma* (余白).

## The Philosophy of Ma (「間」)
In Japanese aesthetics, 'Ma' is the negative space that gives form to the whole. In our digital layouts, generous whitespace acts not as emptiness, but as a deliberate interval allowing each image and paragraph room to breathe.

## Single-Origin Slow Roasts
We extract drop-by-drop through hand-blown glass Dutch towers over twelve unhurried hours. This thermal-free extraction leaves harsh chlorogenic acids locked inside ground cell walls while liberating delicate floral esters and terpenes.

## Direct-Trade Farm Partnerships
Every micro-lot is sourced directly from generational farms across Chikmagalur, Yirgacheffe, Huila, and Boquete at prices well above Fair Trade minimums.

## Ceremonial Uji Matcha
Directly imported from Wazuka hills in Uji, Kyoto. Shrouded under woven reed screens three weeks before harvest to elevate L-theanine and chlorophyll, then ground on granite stone mills and whisked with bamboo chasen.

## 72-Hour Pastry Lamination
Our Swedish cardamom knots, Brittany kouign-amann, and beeswax canelés undergo slow cold fermentation with cultured lactic butter, creating fragile honeycomb interiors and shattering golden crusts.

## Architectural Zones
1. **The Omakase Coffee Bar**: 9-meter solid Hinoki cypress counter with low-noise Mahlkönig grinders.
2. **The Kyoto Courtyard**: Natural rain garden acoustics and filtered sunlight.
3. **The Reading Mezzanine**: 400-volume design monograph library without laptop chargers.

## Custom Cursor & Magnetic Interactions
Desktop users experience a custom dual-ring spring cursor with contextual states: expanding into a terracotta glow over links, and morphing into an ivory `VIEW` lens badge over imagery.

## Cinematic Motion Design
- Letter-by-letter brand entrance in the preloader.
- Word-by-word headline reveal in the Hero section.
- Framer Motion image clipping transitions (`clipPath: inset(...)`) with multi-depth scroll parallax.

## Interactive Menu & Search
Filter across `Coffee`, `Matcha`, `Breakfast`, and `Bakery` or search in real time across ingredients, roast profiles, and origins with instant empty states and filter reset shortcuts.

## Mini Order Tray & Subtotal Engine
Add items directly from cards or modal views, adjust quantities, toggle between *Dine-in Table* and *Counter Pickup*, and place simulated prototype orders with local storage persistence.

## Table Reservation System
Multi-step booking form validated for phone, email, and future calendar dates. Confirmed bookings generate reference codes stored in `localStorage.getItem('morrow_cafe_reservations')`.

## Concierge Inquiries
Dedicated contact panel supporting event, coffee supply, and media inquiries with real-time feedback and direct `tel:` and `mailto:` action links.

## Ambient Atmosphere & Live Clock
Floating vinyl player pill sharing the café's current jazz track (e.g., Bill Evans), synchronized with live Bengaluru Indian Standard Time (IST).

## Mobile First & Responsive Design
Tested across phone, tablet, and widescreen desktop viewports with a 44px touch target baseline and zero horizontal overflow (`overflow-x: clip`).

## Accessibility & Reduced Motion
Includes comprehensive ARIA dialog roles, focus management, and automatic disablement of transitions when `prefers-reduced-motion: reduce` is detected.

## Performance & Code Splitting
Configured with Vite 6 and Rollup manualChunks separating `vendor-react`, `vendor-framer`, and `vendor-icons` for instant initial load times and cache efficiency.
