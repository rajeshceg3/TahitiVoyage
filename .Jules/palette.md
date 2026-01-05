## 2024-05-23 - Leaflet Marker Accessibility & Tooltips
**Learning:** Leaflet's `L.marker` by default creates a purely visual element. Adding `title` provides a native tooltip and basic accessibility, but `bindTooltip` allows for a much better, styled UX that fits the app's theme.
**Action:** Always combine `title` (for native/a11y) and `bindTooltip` (for delight) when adding markers to a map.

## 2024-05-24 - Active State Accessibility
**Learning:** Relying solely on CSS classes like `.active` to indicate state excludes screen reader users.
**Action:** Always pair visual `.active` classes with semantic attributes like `aria-current="true"` (for navigation/steps) or `aria-pressed="true"` (for toggles) to ensure the state is programmatically determinable.

## 2024-05-25 - Scroll vs. Focus Navigation
**Learning:** Mapping arrow keys to manually scroll a container (e.g., `scrollBy`) is an anti-pattern for lists of interactive items. It moves the viewport but leaves keyboard focus behind, disorienting users.
**Action:** When implementing arrow key navigation for lists/docks, always move the *focus* (e.g., `.focus()`). Browsers automatically scroll the focused element into view, ensuring the viewport and focus stay synchronized.

## 2024-05-26 - Keyboard Navigation & Tabbing Fatigue
**Learning:** While ensuring elements are focusable is good, having a focusable container (`tabindex="0"`) wrapping a list of focusable items creates a redundant tab stop. Furthermore, leaving all items in the tab sequence (`tabindex="0"`) for a long list causes 'tabbing fatigue'.
**Action:** Implement the 'Roving Tabindex' pattern: make the container non-focusable (or `tabindex="-1"`) and ensure only the *active* item in the list has `tabindex="0"`, managing focus via arrow keys.

## 2024-05-27 - Reduced Motion in Leaflet
**Learning:** Large, sweeping map animations (like `flyTo`) can trigger vestibular disorders. Standard CSS `prefers-reduced-motion` queries don't automatically affect JS-driven animations in libraries like Leaflet.
**Action:** Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before triggering map animations. If true, set `duration` to `0` or use `setView` to provide an instant, safe transition.
