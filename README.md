# Edgelands

An interactive map of entities — persons, organizations, and topics — extracted from *New York Times* articles on surveillance. Each point represents a named entity positioned in a two-dimensional space according to its co-occurrence patterns, revealing clusters of related actors and subjects.

Red marks emerging entities (increasing over time), blue marks disappearing ones. Zooming in reveals individual names and their article links; zooming out shows the broader landscape of clusters and trends.

Built as part of [Edgelands Institute](https://www.edgelands.institute)'s research on the increasing digitalization of security in cities — mapping who and what appears in public discourse around surveillance, and how that changes over time.

## Reference

Rodighiero, Dario, and Jean Daniélou. 2023. "Weather Map: A Diachronic Visual Model for Controversy Mapping." In *Zoomland: Exploring Scale in Digital History and Humanities*, edited by Florentina Armaselu and Andreas Fickers. De Gruyter. https://doi.org/10.1515/9783111317779-017

## Structure

```
src/
├── index.js          # Entry point — loads data, sets up Pixi.js app and viewport
├── data/
│   └── entities.csv  # 390 entities with coordinates, frequency, slope, and article URLs
├── draw/             # Rendering layers (each exports a function that adds a Pixi container)
│   ├── background.js # Background image
│   ├── contours.js   # Density contours
│   ├── keywords.js   # Topic labels
│   ├── clusters.js   # Cluster centers (H/L)
│   ├── elements.js   # Individual entity crosses and labels
│   └── fronts.js     # Bezier curves connecting opposing clusters
├── interface/
│   └── click.js      # Click handler — populates the detail panel
└── assets/           # Fonts, background image, CSS

data/                 # Raw data and Jupyter notebooks for preprocessing
```
