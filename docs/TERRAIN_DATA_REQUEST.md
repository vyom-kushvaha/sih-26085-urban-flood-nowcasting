# High-Resolution Terrain Data Request

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


## Requested pilot

Hindmata–Dadar/Wadala analysis AOI supplied in `data/pilot/hindmata_dadar_aoi.geojson`, approximately 2.6 km². The AOI is provisional and should be replaced with the authoritative storm-water catchment boundary when available.

## Requested deliverables

1. Bare-earth DTM GeoTIFF or Cloud Optimized GeoTIFF at 0.5–2 m posting.
2. Classified LAS/LAZ point cloud and hydraulic breaklines when redistribution permits.
3. Road crown, kerb, underpass, culvert, wall, inlet, manhole and outfall survey layers.
4. Explicit horizontal CRS and vertical datum tied to Mumbai/Survey of India benchmarks.
5. Acquisition date, sensor/platform and processing report.
6. Independent RTK/DGPS checkpoint file with observed height, raster height and residual.
7. Stated vertical RMSE/LE90 and horizontal accuracy.
8. License and redistribution restrictions.

## Acceptance target

- terrain type: bare-earth DTM;
- grid spacing: no greater than 2 m;
- preferred vertical RMSE: no greater than 0.30 m;
- complete pilot coverage with no unexplained voids;
- independent checkpoint report;
- road crowns, kerbs and hydraulic openings preserved.

## Suggested request recipients

- Brihanmumbai Municipal Corporation departments holding the Mumbai 3D city/LiDAR survey outputs;
- Survey of India through an eligible government or academic partner;
- SIH problem-statement owner, MoES/NCMRWF, for institutional access;
- an authorised survey provider if existing data cannot be released.

The project should receive the terrain file through an approved storage channel. Restricted raw data will remain outside Git; only the manifest, checksum, QA report and redistributable fixture will be committed.
