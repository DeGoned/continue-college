# Imperial Technical Design System

### 1. Overview & Creative North Star
**Creative North Star: The Academic Monument**
Imperial Technical is a design system that marries the gravitas of traditional academia with the precision of modern industrial technology. It rejects the "softness" of consumer web design in favor of **Architectural Brutalism**—using sharp corners, massive typographic scales, and high-contrast layouts.

The system breaks the standard "web template" feel through:
- **Intentional Asymmetry:** Utilizing geometric clip-paths and off-center layouts (e.g., the "Geometric Panel").
- **Background Typography:** Using massive, low-opacity serif text as a decorative textural layer behind content.
- **Cinematic Scale:** Drastic shifts between tiny 9px labels and 120px display headers to create a sense of importance and "Editorial Authority."

### 2. Colors
The palette is rooted in "SZTU Blue" (#00479d) and "Navy" (#0a1f44), balanced against an expansive use of stark white and surgical silver-greys.

- **The "No-Line" Rule:** Sectioning is achieved through shifts between `surface` (#ffffff) and `surface_container_low` (#f8fafc). Avoid 1px solid borders for layout containers.
- **Surface Hierarchy:** Use `surface_container` for interactive cards and `surface_container_high` for subtle hover states.
- **The "Glass & Gradient" Rule:** Navigation and mega-menus must use high-blur Glassmorphism (Backdrop Blur: 24px-40px) with 90-98% opacity to maintain a "frozen glass" premium feel.
- **Tonal Depth:** Depth is created by "stacking" white cards over off-white backgrounds with extremely soft, large-radius shadows.

### 3. Typography
The system utilizes a high-contrast pairing of **Noto Serif SC** (for authority and heritage) and **Inter** (for technical clarity).

- **Display (8rem / 120px):** Noto Serif SC, Bold. Reserved for hero titles. Tight tracking (-0.05em).
- **Headline Large (3.75rem / 60px):** Noto Serif SC, Bold. Used for section starts.
- **Title/Body (1rem / 16px):** Inter, Light to Regular. High line-height (1.625) for readability.
- **Labels (9px - 11px):** Inter, Bold. Always uppercase with extreme tracking (0.4em to 0.6em). Used for "breadcrumbs" of intent above headers.

### 4. Elevation & Depth
Elevation is not about "lifting" elements off the page with heavy shadows, but rather "layering" them like architectural sheets.

- **The Layering Principle:** Use `surface_container_low` (#f8fafc) for the base page, and `surface` (#ffffff) for active content modules.
- **Shadow Ground Truth:**
  - `shadow-sm`: Used for primary buttons and small cards.
  - `shadow-lg`: Reserved for glass navigation.
  - `shadow-2xl`: Used only for overlapping geometric panels to create a 3D perspective effect.
- **Geometric Panels:** Use `clip-path` (polygon) to create non-rectangular containers that suggest forward motion and technical precision.

### 5. Components
- **Buttons:** Sharp 2px border-radius. Primary buttons use a shadow-glow of the primary color (`shadow-primary/20`).
- **Cards:** "Metallic Light" style—using a 135-degree linear gradient from white to silver-blue with a 10% primary-color border.
- **Mega Menus:** Full-width glass panels with intentional internal vertical borders (`border-primary/5`) for columns.
- **Bento Grids:** Use a mosaic-style grid with variable row/column spans (2x2, 1x2) to create visual interest in news and gallery sections.

### 6. Do's and Don'ts
- **Do:** Use "Label + Headline" combinations. Every major title should be preceded by a 10px uppercase tracking label.
- **Do:** Use grayscale filters on images by default, transitioning to full color only on hover/interaction.
- **Don't:** Use rounded corners larger than 4px (except for the "Bento Mask Circle"). This is a precision-based system.
- **Don't:** Use solid black (#000000). Use `deep-black` (#0f172a) to maintain tonal richness.
- **Do:** Lean into "Background Typography"—repeating the section name in 200px+ font sizes at 3% opacity.