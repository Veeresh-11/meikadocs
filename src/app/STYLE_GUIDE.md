# SecureDocs Pricing Page - Style Guide

## 🎨 Color Palette

### Background & Surfaces
- **Primary Background**: `#0A0B0F` → `#10121A` (gradient)
- **Card Background (Default)**: `rgba(255, 255, 255, 0.03)` - 3% white overlay
- **Card Background (Hover)**: `rgba(255, 255, 255, 0.05)` - 5% white overlay
- **Card Background (Highlighted)**: Gradient from `rgba(79, 70, 229, 0.15)` via `rgba(79, 70, 229, 0.10)` to transparent
- **Border (Default)**: `rgba(255, 255, 255, 0.1)` - 10% white
- **Border (Highlighted)**: `rgba(79, 70, 229, 0.4)` - 40% indigo

### Text Colors
- **Primary Text**: `#FFFFFF` - High contrast white
- **Secondary Text**: `#B7BAC6` - Muted neutral for descriptions
- **Tertiary Text**: `#9EA3B0` - Lighter neutral for labels
- **Eyebrow Text (Highlighted)**: `#A5B4FC` - Indigo 300

### Accent Colors
- **Primary Accent**: `#4F46E5` - Indigo 600
- **Hover Accent**: `#5B6CFF` - Lighter indigo
- **Accent Glow**: `rgba(79, 70, 229, 0.2)` - 20% indigo for shadows

### Gradients
- **Top Band**: `linear-gradient(to bottom, rgba(79, 70, 229, 0.05), transparent)`
- **Bottom Band**: `linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent)`
- **Vignette**: `radial-gradient(circle, transparent, transparent, #0A0B0F)`

---

## 📝 Typography

### Font Family
- **Primary**: `Inter` (from Google Fonts CDN)
- **Fallback**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Font Sizes & Weights

#### Header Lockup
- **Eyebrow Label**: 
  - Size: `12px` (desktop) / `11px` (mobile)
  - Weight: `400` (Regular)
  - Transform: `uppercase`
  - Letter Spacing: `0.04em` (4%)
  - Color: Indigo 400

- **Main Title**:
  - Size: `60px` (XL) / `48px` (LG) / `36px` (Base)
  - Weight: `700` (Bold)
  - Tracking: `-0.02em` (tight)
  - Line Height: `1.1`

- **Ghost Link**:
  - Size: `14px`
  - Weight: `500` (Medium)
  - Tracking: `0.01em`

#### Pricing Cards
- **Card Eyebrow**:
  - Size: `12px`
  - Weight: `400`
  - Transform: `uppercase`
  - Letter Spacing: `0.04em`

- **Plan Name**:
  - Size: `26px` (desktop) / `24px` (mobile)
  - Weight: `700`

- **Price Value**:
  - Size: `36px` (desktop) / `32px` (mobile)
  - Weight: `800` (Extrabold)
  - Tracking: `-0.02em`

- **Price Context**:
  - Size: `13px` (desktop) / `12px` (mobile)
  - Weight: `500`
  - Color: `#9EA3B0`

- **Description**:
  - Size: `15px` (desktop) / `14px` (mobile)
  - Weight: `400`
  - Line Height: `1.6`
  - Color: `#B7BAC6`

- **Section Title**:
  - Size: `12px`
  - Weight: `400`
  - Transform: `uppercase`
  - Letter Spacing: `0.04em`
  - Color: `#9EA3B0`

- **Feature List Items**:
  - Size: `15px` (desktop) / `14px` (mobile)
  - Weight: `400`
  - Line Height: `1.5`
  - Color: `#B7BAC6`

- **CTA Button**:
  - Size: `15px` (desktop) / `14px` (mobile)
  - Weight: `600` (Semibold)

#### Tooltips
- **Body Text**:
  - Size: `14px`
  - Weight: `400`
  - Line Height: `1.6`
  - Color: `#B7BAC6`

---

## 📐 Spacing & Layout

### Grid
- **Columns**: 4 columns (desktop) / 2 columns (tablet) / 1 column (mobile)
- **Gap**: `32px` (LG) / `24px` (MD)
- **Max Width**: `1400px`

### Card Padding
- **Desktop**: `36px` (p-9)
- **Mobile**: `32px` (p-8)

### Section Padding
- **Top/Bottom**: `128px` (py-32) / `96px` (py-24) responsive
- **Left/Right**: Container-based with `32px` (px-8) / `16px` (px-4)

### Margins
- **Eyebrow → Title**: `24px` (mb-6)
- **Title → Description**: `8px` (mb-2) to `24px` (mb-6)
- **Price → Description**: `24px` (mb-6)
- **Description → Section Title**: `32px` (mb-8)
- **Features List**: `12px` (space-y-3) between items
- **Section Title → Features**: `16px` (mb-4)
- **Features → CTA**: `32px` (mb-8)

---

## 🎭 Shadows

### Card Shadows
- **Default**: None (relies on border and background)
- **Hover**: `0 20px 40px rgba(0, 0, 0, 0.3)`
- **Highlighted**: `0 20px 60px rgba(79, 70, 229, 0.2)`

### Button Shadows
- **White Variant**: `0 4px 16px rgba(255, 255, 255, 0.2)`
- **Indigo Variant**: `0 4px 16px rgba(79, 70, 229, 0.2)`

### Tooltip Shadow
- **Shadow**: `0 8px 32px rgba(0, 0, 0, 0.4)`

---

## 🔘 Border Radius

- **Cards**: `16px` (rounded-2xl)
- **Buttons**: `12px` (rounded-xl)
- **Tooltips**: `12px` (rounded-xl)
- **Eyebrow Labels**: `9999px` (rounded-full)

---

## ✨ Motion & Animation

### Timing Functions
- **Primary Ease**: `cubic-bezier(0.22, 1, 0.36, 1)` - Smooth, elastic feel
- **Tooltip Ease**: `ease-out` - Quick and snappy

### Durations

#### Card Animations
- **Fade In + Slide Up**: `500ms`
- **Stagger Delay**: `120ms` between cards
- **Hover Transform**: `200ms`

#### Button Interactions
- **Hover Scale**: `200ms`
- **Tap Scale**: `200ms`
- **CTA Hover**: Scale to `1.05`
- **CTA Tap**: Scale to `0.98`

#### Tooltip
- **Fade In**: `80ms`
- **Scale**: `0.95` → `1.0`
- **Y Movement**: `4px` → `0px`

#### Ghost Link Arrow
- **Arrow Slide**: `200ms`
- **Tail Extend**: `200ms`
- **X Movement**: `0px` → `4px`
- **Tail Width**: `0px` → `12px`

### Transform Properties

#### Cards on Scroll
- **Initial**: `opacity: 0, y: 40px`
- **Animate**: `opacity: 1, y: 0px`

#### Cards on Hover
- **Y Transform**: `-4px`
- **Scale**: `1.02`

#### Buttons on Hover
- **Scale**: `1.05`

#### Buttons on Tap
- **Scale**: `0.98`

---

## ♿ Accessibility

### Focus States
- **Ring Color**: `#4F46E5` (Indigo 600)
- **Ring Width**: `2px`
- **Ring Offset**: `2px`
- **Offset Color**: `transparent`

### Color Contrast
- **Text on Dark Background**: WCAG AA+ compliant
  - White text (#FFFFFF) on dark background: 21:1 ratio
  - Secondary text (#B7BAC6) on dark background: 9.5:1 ratio

### Keyboard Navigation
- All interactive elements (buttons, links, tooltip triggers) are keyboard accessible
- Focus rings clearly indicate current focus
- Tooltips can be dismissed with `Escape` key

### ARIA Labels
- Tooltip triggers include `aria-label="More information"`
- Semantic HTML structure throughout

---

## 🎯 Component Variants

### PricingCard
**Default Variant**:
- Background: `rgba(255, 255, 255, 0.03)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- CTA: Indigo solid

**Highlighted Variant** (Team Plan):
- Background: Gradient from indigo to transparent
- Border: `2px solid rgba(79, 70, 229, 0.4)`
- Inner Glow: `shadow-2xl shadow-indigo-500/10`
- CTA: White solid with dark text
- Eyebrow Color: `#A5B4FC` (indigo-300)

### Button (CTA)
**White Solid**:
- Background: `#FFFFFF`
- Text: `#0A0B0F`
- Hover: `#F3F4F6` (gray-100)
- Shadow: `0 4px 16px rgba(255, 255, 255, 0.2)`
- Focus Ring: White

**Indigo Solid**:
- Background: `#4F46E5`
- Text: `#FFFFFF`
- Hover: `#4338CA` (indigo-700)
- Shadow: `0 4px 16px rgba(79, 70, 229, 0.2)`
- Focus Ring: Indigo 500

### Tooltip
**Default**:
- Background: `#1A1C24`
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Text: `#B7BAC6`
- Width: `288px` (w-72)
- Padding: `16px` (p-4)
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`
- Position: Above trigger, right-aligned
- Tail: SVG triangle with matching border

### Ghost Link with Arrow
**Default State**:
- Text: `#B7BAC6`
- Arrow: 20px x 20px icon
- Tail: `width: 0`

**Hover State**:
- Text: `#FFFFFF`
- Arrow: Slides `4px` right
- Tail: Extends to `12px` width
- Transition: `200ms`

---

## 📦 Export Assets

### Design Tokens (CSS Variables)
```css
/* Colors */
--bg-primary: #0A0B0F;
--bg-secondary: #10121A;
--text-primary: #FFFFFF;
--text-secondary: #B7BAC6;
--text-tertiary: #9EA3B0;
--accent-primary: #4F46E5;
--accent-hover: #5B6CFF;

/* Spacing */
--spacing-card: 36px;
--spacing-section: 128px;
--spacing-grid-gap: 32px;

/* Borders */
--border-radius-card: 16px;
--border-radius-button: 12px;
--border-radius-full: 9999px;

/* Shadows */
--shadow-card-hover: 0 20px 40px rgba(0, 0, 0, 0.3);
--shadow-card-highlighted: 0 20px 60px rgba(79, 70, 229, 0.2);
--shadow-tooltip: 0 8px 32px rgba(0, 0, 0, 0.4);

/* Animation */
--duration-card: 500ms;
--duration-button: 200ms;
--duration-tooltip: 80ms;
--ease-primary: cubic-bezier(0.22, 1, 0.36, 1);
```

---

## 🚀 Implementation Notes

1. **Staggered Card Animation**: Use `120ms` delay multiplier (index × 0.12s)
2. **Tooltip Dismissal**: Implement both blur and escape key handlers
3. **Hover Elevation**: Combine `translateY(-4px)` with `scale(1.02)` for depth
4. **Focus Management**: Ensure focus rings are visible on dark backgrounds
5. **Responsive Breakpoints**: 
   - Mobile: `< 768px`
   - Tablet: `768px - 1024px`
   - Desktop: `> 1024px`

---

**Last Updated**: December 2024  
**Version**: 1.0