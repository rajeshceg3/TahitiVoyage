# Mobile Voyage regression

Run against a local Python-served copy (started by the test):

    NODE_PATH=/path/to/node_modules node verification/mobile.cjs

Needs Playwright and Chrome (`CHROME_PATH` overrides `/usr/bin/google-chrome`). `URL` selects the existing deployment; `WIDTHS` defaults to `320,390,1280`; `REDUCED=1` checks reduced motion; `SHOTS` sets the screenshot directory.

Checks all 12 places across all three islands, complete story text, previous/next, panel bounds, initial inert panels, Escape, focus return/trapping, six guided-tour steps and finish/restart/Escape, visible attribution, page overflow and runtime errors. Writes map, Voyage panel, detail/start/end and tour frames for visual inspection. Scenes, basemap, camera flights and marker pulse remain unchanged.

The repository has a Playwright config but no committed test suite or package manifest. This regression adds a runnable suite without claiming the absent legacy tests ran.
