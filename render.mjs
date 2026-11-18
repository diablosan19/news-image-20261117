// Renders page.html at exactly 1024x1024 into entry.png using headless Chromium.
// Run from ~/workspace/makefun (where playwright-core is installed):
//   node entry-news17/render.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + join(here, 'page.html'), { waitUntil: 'load' });
await page.waitForTimeout(200);
await page.screenshot({ path: join(here, 'entry.png'), type: 'png' });
await browser.close();
console.log('wrote entry.png');
