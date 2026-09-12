# Light basemap

The Leaflet map uses MapLibre GL through the Leaflet binding to render an
OpenFreeMap vector basemap. Existing route geometry, markers, forecast layers,
and cooperative gestures remain Leaflet layers and controls.

`frontend/light-map-style.json` is adapted from OpenFreeMap's Positron style:
https://tiles.openfreemap.org/styles/positron

Integration and customization reference: https://openfreemap.org/quick_start/

The local style uses white land, blue water, muted parks and blue-grey major
roads. Minor roads start at style zoom 13; building footprints and minor street
labels start at style zoom 16. These are vector style zooms (the Leaflet binding
accounts for the different tile sizes). Existing symbol collision rules avoid
overlapping labels. Mumbai's boundary is a thin separate overlay.

Keep OpenFreeMap, OpenMapTiles and OpenStreetMap attribution visible. The vector
service, sprites and fonts require internet access. If WebGL initialization or
initial map loading fails, the app falls back to the standard OSM street map
and displays a notice. Styling does not change route safety assessment.
