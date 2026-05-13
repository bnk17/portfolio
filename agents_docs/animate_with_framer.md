# 🌀 Framer Motion Animation Standards

Animate intentionally, not decoratively. All animations must enhance user understanding of state changes and must not impede task completion.

## 🛠 Performance & Intentionality

* **User-Centric Motion:** Animate to clarify functionality (e.g., an item opening, a form saving, an error occurring). If motion does not help the user, reconsider its necessity.
* **Prioritize Cheap Transforms:** Focus on properties that leverage hardware acceleration. Prefer transforms (`translateX()`, `scale()`) and `opacity()`. Limit expensive layouts that trigger reflow (like `width`, `height`, `left`).
* **Leverage `layoutId`:** For shared element transitions across components or views (e.g., product cards to product detail pages), prioritize Framer's `layoutId` feature for a seamless "shared element" experience.
* **Isolate Logic in Hooks:** Keep component logic clean by moving complex motion logic (staggering, conditional logic, exit handling) into dedicated custom hooks, linking back to `.claude/prompts/REACT_DESIGN_PATTERNS.md`. e.g., `useOnEnterAnimation()`.

---

## 📋 Review Checklist

When implementing or refactoring UI animation code, apply these specific checks and fixes:

| Issue | Fix |
| :--- | :--- |
| `transition: all` | Specify exact properties: e.g., `transition: transform 200ms ease-out` |
| `scale(0)` entry animation | Start from `scale(0.95)` with `opacity: 0` |
| `ease-in` on UI element | Switch to `ease-out` or custom curve |
| `transform-origin: center` on popover | Set to trigger location or use Radix/Base UI CSS variable |
| Animation on keyboard action | Remove animation entirely |
| Duration > 300ms on UI element | Reduce to 150-250ms |
| Hover animation without media query | Add `@media (hover: hover) and (pointer: fine)` |
| Keyframes on rapidly-triggered element | Use CSS transitions for interruptibility |
| Framer Motion `x`/`y` props under load | Use `transform: "translateX()"` for hardware acceleration |
| Same enter/exit transition speed | Make exit faster than enter (e.g., enter 2s, exit 200ms) |
| Elements all appear at once | Add stagger delay (30-80ms between items) |