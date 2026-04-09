---
tags: []
keywords: []
importance: 53
recency: 1
maturity: draft
accessCount: 1
---
# Blog Post Layout Structural Summary

- **BlogPost.astro shell (blog_post_meta_footer_and_tags.md)**  
  - Assembles Navbar → ScrollIndicator → sticky hero header → content slot, overlays fixed meta footer above Footer, then renders Footer and runs hash-navigation script.  
  - Meta footer behavior: desktop/tablet keep 70px bottom offset with 280px max width and flush styling; mobile (<767px) switches to full-width row 53px above Footer (accounting for padding/border) with z-index 45; small mobile (<480px) reduces offset to 47px via tighter vertical padding.  
  - Tag chips: uppercase teal styling (9px/700 weight) with 3px×8px padding, rgba(0,212,170,0.15) background, 1px teal border; mobile pads shrink to 2px×6px while chips remain flex-wrap friendly.  
  - Hash-navigation: inline script running on DOMContentLoaded and astro:page-load removes `.active` from panels, adds it to the hash-target panel, smooth-scrolls when viewport <1024px, and dispatches `section-activated` CustomEvents for SectionNav sync; enforces Rule 3 along with fixed footer and tag rules (Rule 1/2) for consistent layout.

- **Topic overview (context.md)**  
  - Captures the combined pattern: fixed meta footer variants, teal responsive tag chips, and hash-navigation helper driving SectionNav.  
  - Highlights the dependency on Navbar, ScrollIndicator, SectionNav, and Footer plus hash script interactions.  
  - Signals relation to `ui/visual_effects/scroll_feedback_system.md` for downstream navigation feedback.

Readers can drill down into `blog_post_meta_footer_and_tags.md` for specific offsets, styling rules, and hash script logic, and into `context.md` for the overarching layout intent and relationships.