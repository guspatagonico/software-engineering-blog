---
title: Glassy Navigation Layout
tags: []
related: [ui/visual_effects/matrix_background.md]
keywords: []
importance: 62
recency: 1
maturity: draft
accessCount: 4
createdAt: '2026-04-07T02:53:40.887Z'
updatedAt: '2026-04-07T02:53:40.887Z'
---
## Raw Concept
**Task:**
Describe the glass navigation layout that applies blur/backdrop filters to the header, mobile overlay, and footer while relying on theme-aware tokens.

**Changes:**
- Applied backdrop-filter blur glass surface to Navbar and Footer for both light and dark themes.
- Introduced mobile navigation overlay/drawer that reuses glass variables with staggered link reveal timings.
- Extended tokens.css with --glass-bg, --glass-bg-mobile, and --overlay-bg values for light and dark themes so overlay styles stay consistent.

**Files:**
- src/components/Navbar.astro
- src/components/Footer.astro
- src/styles/tokens.css

**Flow:**
Render Navbar with glass background and sticky positioning -> toggle mobile nav toggle to show overlay and drawer both styled by the glass variables -> show footer with matching glass surface and social links.

**Timestamp:** 2026-04-07

**Author:** Gustavo Adrián Salvini

## Narrative
### Structure
Navbar.astro defines the top bar with glass background, alignment for links, ThemeToggle, hamburger for mobile, overlay triggers, and script to manage open/close states. The mobile drawer stays hidden until the toggle sets aria-expanded true, then the overlay and panel become visible with matching glass blur, animated links, and close controls. Footer.astro mirrors the glass treatment for contact icons while tokens.css centralizes the --glass-bg, --glass-bg-mobile, and --overlay-bg colors per theme, keeping the entire shell cohesive.

### Dependencies
Navbar and Footer depend on tokens.css variables (--glass-bg, --glass-bg-mobile, --overlay-bg) to provide theme-specific RGBA backdrops and overlay shades. The mobile drawer relies on JavaScript hooks to toggle data-visible attributes and html/body classes so CSS transitions can animate based on those attributes.

### Highlights
Glass surfaces use backdrop-filter blur with saturate(180%), sticky positioning, and border lines to delineate sections. The mobile navigation overlay uses a 0.25s ease transition for visibility while the drawer uses 0.3s cubic-bezier and staggered link reveal delays (0.05s to 0.2s). Footer contact buttons keep consistent border colors that highlight with --teal on hover.

### Rules
Rule 1: Glass surfaces must pull their colors from the shared tokens so light/dark modes stay aligned. Rule 2: Mobile drawer visibility is driven by data-visible attributes and the nav-open body class so the overlay and drawer animate together.

## Facts
- **glass_backdrop_usage**: Navbar and footer surfaces rely on backdrop-filter: blur(12px) saturate(180%) while staying sticky at the top and bottom of the viewport. [project]
- **theme_glass_variables**: Mobile overlay, drawer, and desktop surfaces all reference --glass-bg, --glass-bg-mobile, and --overlay-bg so light and dark themes share the same logic with different colors. [project]
- **mobile_drawer_animation**: The mobile drawer is 280px wide, slides from the right, and staggers link reveal delays from 0.05s to 0.2s for tactile sensation. [project]
