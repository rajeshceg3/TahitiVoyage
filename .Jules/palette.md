## 2024-05-23 - Leaflet Marker Accessibility & Tooltips
**Learning:** Leaflet's `L.marker` by default creates a purely visual element. Adding `title` provides a native tooltip and basic accessibility, but `bindTooltip` allows for a much better, styled UX that fits the app's theme.
**Action:** Always combine `title` (for native/a11y) and `bindTooltip` (for delight) when adding markers to a map.

## 2024-05-24 - Active State Accessibility
**Learning:** Relying solely on CSS classes like `.active` to indicate state excludes screen reader users.
**Action:** Always pair visual `.active` classes with semantic attributes like `aria-current="true"` (for navigation/steps) or `aria-pressed="true"` (for toggles) to ensure the state is programmatically determinable.
