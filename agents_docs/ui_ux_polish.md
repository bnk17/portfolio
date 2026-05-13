# ✨ UI/UX Polish & Micro-Interactions

Follow these principles to ensure the interface feels natural, professional, and "premium."

## 1. Typography & Text
- **Crispy Text:** Always apply `antialiased` (Tailwind) to the body or main wrapper to ensure cleaner font rendering on macOS.
- **Text Wrapping:** Use `text-wrap: balance` for headings to avoid orphans, and `text-wrap: pretty` for long paragraphs.
- **Tabular Numbers:** For counters, prices, or shifting data, use `tabular-nums` (Tailwind) to prevent layout jitter.

## 2. Geometry & Spacing
- **Concentric Border Radius:** When nesting elements, maintain visual balance using the formula: `Outer Radius = Inner Radius + Padding`.
- **Optical Alignment:** Align items visually, not just geometrically. For example, add slight negative margins to icons (like "Play" buttons) so they appear centered to the human eye.
- **Shadows over Borders:** Prefer subtle multi-layered box-shadows over solid borders for a sense of depth. 
  *Example:* `box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)`.

## 3. Motion & Transitions
- **Interruptible Animations:** Favor CSS transitions over keyframe animations for interactive elements (like dropdowns) so they can be "interrupted" if the user changes their mind.
- **Staggered Entry:** When revealing lists or sections, stagger the entry with a slight delay (e.g., 50-100ms) for each child element using `opacity`, `blur`, and `translateY`.
- **Subtle Exits:** Exit animations should be faster and more subtle than entry animations (less distance traveled).
- **Icon Context:** Animate icons (scale/opacity) when they toggle states (e.g., Copy -> Checkmark).

## 4. Visual Overlays
- **Image Outlines:** Add a 1px white or black outline with 10% opacity inside images (`outline-offset: -1px`) to give them a defined edge on different backgrounds.