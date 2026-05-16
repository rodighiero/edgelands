# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm start          # dev server at http://localhost:5173 (hot reload)
npm run build      # production build → /docs
```

No lint or test scripts are configured.

## Architecture

**Edgelands** is a zoomable, interactive map for exploring New York Times news entities (persons, orgs, tags) extracted from articles on a surveillance-related corpus. Built with Pixi.js (WebGL rendering) + D3 (geometry/data) + pixi-viewport (pan/zoom).

### Data flow

`src/data/entities.csv` (390 entities with x/y coords, cluster IDs, slope, frequency, URLs) → loaded in `src/index.js` → coordinates scaled to viewport → rendered as layered Pixi.js containers.

### Rendering layers (added in order)

All layers live in `src/draw/`:

| Module | What it draws |
|--------|--------------|
| `background.js` | Static background PNG sprite |
| `contours.js` | D3 density contours from person/org positions |
| `keywords.js` | Tag labels sized by frequency, with overlap detection |
| `clusters.js` | Cluster center labels ('H' = high slope, 'L' = low slope) |
| `elements.js` | Per-entity crosses + labels |
| `fronts.js` | Bezier curves connecting overlapping clusters |

### Zoom-based visibility

Layers fade in/out based on zoom level: contours, clusters, fronts, and keywords fade out when zoomed in; individual elements fade in. Logic is in `src/index.js` (viewport `zoomed` event listener).

### Color encoding

- **Red** `0xA6242F` — emerging entities (slope > 0)
- **Blue** `0x385DA6` — disappearing entities (slope < 0)
- **Gray** `0x999999` — tags/neutral elements

### Interactivity

`src/interface/click.js` — handles entity clicks; populates the `#focus` sidebar panel with name, type, frequency, slope, Wikipedia link, yearly bar chart (Unicode blocks), and article URLs.

### Data pipeline

`data/` contains three Jupyter notebooks that produce `src/data/entities.csv`:

1. **1-Download.ipynb** — fetches full article text via the Internet Archive (Wayback Machine)
2. **2-Tag.ipynb** — classifies articles using the NYT news labeler API
3. **3-Analyze.ipynb** — extracts named entities (persons, orgs, GPE) with spaCy, computes co-occurrence frequencies and trends

### Build output

Vite builds to `/docs` (used for GitHub Pages deployment). `index.html` at the repo root is the entry point and contains the UI overlay markup (title, legend). `vite.config.js` sets `base: '/edgelands/'` for correct asset paths on GitHub Pages and treats `.fnt` and `.csv` files as static URL assets.
