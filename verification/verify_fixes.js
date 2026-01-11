const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the app
  await page.goto('http://localhost:8080');

  // Wait for overlay to disappear or handle it
  try {
      // It might be already gone if session storage persisted from previous runs in the same browser context?
      // No, new context.
      const overlay = page.locator('#welcome-overlay');
      if (await overlay.isVisible()) {
          await overlay.click();
      }
      await overlay.waitFor({ state: 'hidden' });
  } catch (e) { console.log('Overlay issue', e); }

  // Screenshot the main view
  await page.screenshot({ path: 'verification/verification.png' });

  // Verify Overlay Logic: reload page. Overlay should NOT appear (display: none or hidden immediately)
  await page.reload();
  const overlay2 = page.locator('#welcome-overlay');

  // Check if it's hidden immediately (we can check computed style or class)
  // In our fix: if (hasSeenOverlay) ... style.display = 'none';
  const isHidden = await overlay2.evaluate(el => getComputedStyle(el).display === 'none' || el.classList.contains('hidden'));

  if (!isHidden) {
      console.error('Regression: Overlay appeared on second visit!');
      process.exit(1);
  } else {
      console.log('Verification Passed: Overlay hidden on second visit.');
  }

  await browser.close();
})();
