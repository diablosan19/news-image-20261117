# The World in One Day — Tuesday 17 November 2026

[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/diablosan19/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/diablosan19/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

A one-page newspaper front page that sums up the world news of **Tuesday
17 November 2026** in a single 1024×1024 image (`entry.png`). A reader who
missed the day should be able to reconstruct it from this page alone: the date
is the biggest thing on the page after the title, the lead story dominates,
and six more stories fill a grid — each with a small illustration, a short
headline and a one-line caption.

## The stories

- **Lead — Ukraine strikes the Crimean Bridge again.** A second day of
  strikes on the Kerch Bridge drops part of the road span into the sea;
  Zelenskyy calls it an "unprecedented operation", and Russia answers with
  missile strikes on bridges in Kyiv. The illustration shows the broken span.
- **Middle East — Iran drones hit US radar.** Revolutionary Guard drones
  strike a US radar system at Sheikh Isa Air Base in Bahrain, the third attack
  in days; the US strikes an IRGC missile site on Qeshm Island.
- **Diplomacy — Trump–Xi–Putin summit set.** The first-ever trilateral summit
  is confirmed for Shenzhen on Thursday 19 November.
- **Asia — Japan scrambles fighter jets.** Tokyo protests after two suspected
  Russian aircraft violate its airspace.
- **Gaza — Allies urge: open Gaza crossings.** The UK, Australia, Canada and
  Italy jointly press Israel to open crossings for humanitarian aid.
- **Space — Vulcan rocket fails in flight.** ULA's Vulcan suffers its first
  total failure, destroying 40 Amazon Leo satellites; the same day, the
  Euclid telescope's first major data release maps 900 million galaxies.
- **Sport — India take the ODI series 3–1.** India beat New Zealand by 22 runs
  to seal the series, and MS Dhoni announces his retirement as an IPL player —
  he will mentor Chennai Super Kings from 2027.

Stories were chosen for breadth: war in Europe, the Middle East, great-power
diplomacy, East Asia, humanitarian policy, space science and sport. Nothing on
the page is speculation presented as fact — the one unverified claim of the
day (an alleged Iranian "dirty bomb" plot) was deliberately left out rather
than printed without its "alleged" label.

## Sources

All stories are drawn from the day's verified reports as collected in the
**Just Security Early Edition**, the **Asas Press World News Digest** and the
**Open Chronicle**, all dated 17 November 2026.

## How it is made

The page is hand-built HTML/CSS with inline SVG illustrations — no downloaded
images, no external fonts or network assets — in `page.html`. It is rendered
to a pixel-exact 1024×1024 PNG with headless Chromium:

```
node entry-news17/render.mjs   # run from ~/workspace/makefun
```

`main.ts` (Node, standard library only) validates the finished image — file
size at most 1 MiB and dimensions read from the PNG/JPEG header within
1024×1024 — and only then copies it to `MAKEFUN_OUTPUT_DIR` (or `/output`).
