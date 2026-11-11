# Verify TahitiVoyage
Tahiti - An Exploration: static island map voyage.
## Launch
Any static file server from the repo root.
## Doctor
`python3 .cursor/skills/verify-tahiti-voyage/verify.py`
## Drive
Serves the static site and renders it in headless Chromium asserting the boot marker, welcome overlay, and zero JS console errors.
## Evidence
`.cursor/skills/verify-tahiti-voyage/evidence.json`
## Cleanup
Static server terminated after the render.
## Known boundaries
Render smoke only; scene quality and e2e suites not exercised here.

Render runs with live network: Leaflet loads from the unpkg CDN, so the render check needs internet access (the app shows a SYSTEM OFFLINE fallback without it).
