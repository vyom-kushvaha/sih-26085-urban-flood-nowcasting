# CartoDEM Negative-Elevation Diagnosis

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


## Finding

The four CartoDEM rasters are not proven corrupt. The principal failure is a **vertical-datum mismatch in the application**.

NRSC's CartoDEM product documentation specifies WGS84 ellipsoidal heights in metres, a 30 m posting for these files and an elevation accuracy of 8 m LE90. The current `DEMProcessor` treats raster values as metres above mean sea level and rejects values below -15 m. That interpretation is invalid for ellipsoidal heights.

Ellipsoidal height and orthometric elevation are different quantities. A geoid model is required to transform the CartoDEM height before comparing it with road levels, drainage invert levels or mean-sea-level elevations. A guessed constant offset is not acceptable.

Official CartoDEM reference: <https://bhuvan-app3.nrsc.gov.in/data/download/tools/document/CartoDEMReadme_v1_u1_23082011.pdf>

## Reproduced evidence

The QA command inspected four 3600 × 3600 GeoTIFF tiles. Their measured pixel spacing is approximately 29–31 m.

| Checkpoint | Raw raster height |
|---|---:|
| Hindmata | -49.927 m |
| Sion Circle | -63.069 m |
| Kurla LBS | -63.773 m |
| Andheri Subway | -56.646 m |

The consistent negative magnitude across Mumbai is compatible with ellipsoidal heights being interpreted as orthometric elevations. It does not establish the correct local conversion by itself.

## Required correction

1. Record the source vertical CRS explicitly.
2. Select an authoritative geoid or local Mumbai vertical datum compatible with surveyed road and drain levels.
3. Transform ellipsoidal height `h` to orthometric height `H` using the chosen geoid undulation `N` and the documented relationship `H = h - N`.
4. Validate the transformed raster against independent Survey of India, municipal or RTK/DGPS benchmarks.
5. Preserve the original raster and create a separate derived DTM with transformation metadata and accuracy statistics.

## Decision

Do not use the existing fallback value of 15 m as observed terrain. Do not apply an arbitrary +50 m or +60 m correction. Even after a correct datum transformation, the 30 m DSM and its stated accuracy remain unsuitable for street/society-road hydraulic claims; it is useful only for regional context and comparison.
