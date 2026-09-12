# High-Resolution Terrain Plan

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


## Decision

The pilot needs a **bare-earth Digital Terrain Model (DTM)**, not a resampled 30 m DEM and not an uncorrected surface model containing roofs and trees.

The target specification for street and society-road flood modelling is:

- pilot extent: 1–3 km² in one hydraulically connected Mumbai catchment;
- horizontal grid spacing: 0.5–2 m;
- vertical RMSE: preferably 0.15–0.30 m and always reported from checkpoints;
- projected coordinate system in metres;
- hydrologically conditioned surface with road crowns, kerbs, walls, culverts, inlets and drainage breaklines retained;
- source date, acquisition method, license, no-data mask and quality report stored with the raster.

Grid spacing and elevation accuracy are separate. A 1 m raster created by interpolating the existing 30 m CartoDEM remains 30 m source information and must not be described as a 1 m accurate DEM.

## Source assessment

| Source | Nominal grid | Suitability |
|---|---:|---|
| Current CartoDEM | 30 m | Regional context only; existing tiles also need datum/georeferencing QA. |
| Free ALOS AW3D30 | ~30 m DSM | No material terrain-resolution improvement over the current source. |
| Commercial AW3D Standard | 2.5–5 m DSM | Useful as context, but its quoted height accuracy and above-ground objects are insufficient for kerb, road-grade and inlet-scale hydraulics. |
| Survey of India or government high-resolution products | Product dependent | Request through the eligible institution; inspect license and checkpoint accuracy before acceptance. |
| Municipal aerial LiDAR or photogrammetry | Sub-metre to metre class | Preferred existing source if BMC provides the DTM, point cloud, breaklines and metadata. |
| New drone or LiDAR survey with RTK/DGPS control | 0.5–2 m deliverable | Preferred pilot fallback when authoritative high-resolution data cannot be obtained. Requires flight and area permissions and surveyed checkpoints. |

Official references used for this decision:

- JAXA describes the free AW3D30 dataset as approximately 30 m resolution: <https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/>.
- JAXA describes the original AW3D product as a 5 m product distributed commercially: <https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d_e.htm>.
- AW3D Standard lists 2.5 m and 5 m product resolutions: <https://www.aw3d.jp/en/products/standard/>.
- Survey of India lists a 10 m DTM/DEM through its online portal and separately describes 3–5 m ORI/DEM availability for eligible government use: <https://onlinemaps.surveyofindia.gov.in/AboutPortal.aspx> and <https://surveyofindia.gov.in/pages/availability-of-ori-and-dem>.
- BMC's 3D city-model tender specifies aerial photogrammetry, airborne/terrestrial/mobile LiDAR, DTM and DSM deliverables, supporting an institutional request for the existing survey outputs: <https://www.mcgm.gov.in/irj/go/km/docs/documents/Tenders/ETH/ETH_8000054009_231023.pdf>.

## Acquisition sequence

1. Freeze a 1–3 km² pilot catchment. The default candidate is Hindmata–Dadar because it is already represented in the prototype; the boundary must follow drainage connectivity rather than an arbitrary rectangle.
2. Submit data requests to BMC and the relevant government or academic partner for the existing Mumbai LiDAR or aerial-survey DTM, classified point cloud, road levels, storm-drain survey and benchmark metadata.
3. In parallel, obtain three or more independent RTK/DGPS checkpoints and road cross-sections at low points, junctions and drain inlets.
4. If authoritative terrain is unavailable in time, commission or conduct a permitted drone-photogrammetry or LiDAR survey for the pilot. Use ground-control points and independent checkpoints.
5. Classify ground returns, remove buildings and vegetation, preserve hydraulic barriers and openings, burn verified drainage structures, fill only artificial pits, and export the conditioned DTM as Cloud Optimized GeoTIFF.
6. Produce a QA report containing horizontal resolution, vertical RMSE/LE90, datum, acquisition date, voids, transformations and license. Reject a raster whose accuracy cannot be independently checked.

## Repository integration contract

Place licensed source data outside Git when redistribution is prohibited. Configure its path through an environment variable and keep only metadata, checksums, a small redistributable test fixture and processing scripts in the repository.

The terrain loader must fail closed when the raster is missing, outside coverage, has invalid CRS or datum, or returns no-data. It must not replace invalid elevation with a plausible default. Every API result must include terrain source, resolution, acquisition date, validation status and an `OBSERVED`, `MODELLED`, `ESTIMATED` or `SIMULATED` provenance label.

## Acceptance gate

High-resolution terrain is accepted only when:

- independent checkpoints confirm the stated vertical accuracy;
- road crowns, kerbs, underpasses and major flow barriers are visible in derived profiles;
- all raster values and units pass automated range and no-data checks;
- drainage inlets and outfalls align within the declared horizontal tolerance;
- a known rainfall event produces no unexplained mass gain and observed waterlogging locations are used for validation rather than training alone.
