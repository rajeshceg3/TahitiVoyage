## 2024-05-23 - Leaflet Marker Accessibility & Tooltips
**Learning:** Leaflet's `L.marker` by default creates a purely visual element. Adding `title` provides a native tooltip and basic accessibility, but `bindTooltip` allows for a much better, styled UX that fits the app's theme.
**Action:** Always combine `title` (for native/a11y) and `bindTooltip` (for delight) when adding markers to a map.
