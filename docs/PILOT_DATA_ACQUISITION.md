# Pilot data acquisition — 11 September 2026

Public data was downloaded for the provisional Hindmata–Dadar AOI. Local source
files are under `data/raw/pilot_downloads/`, excluded from Git. Each acquisition
has its own timestamped folder, manifest, source URL and SHA-256 hashes. The
machine-readable audit is `data/pilot/municipal_qa.json`.

`GET /api/v1/data/readiness` checks the audited municipal artifacts on disk
against recorded sizes and SHA-256 hashes. It returns missing/corrupt file states,
recorded counts, quality issues and outstanding validation requirements without
exposing local paths or raw municipal geometry. `operational_ready` remains false:
download integrity is not a survey or model validation gate. This endpoint covers
municipal downloads; it does not verify weather freshness, radar or terrain.

| Dataset | Downloaded | Current use / limitation |
|---|---:|---|
| BMC storm manholes | 947 in AOI + 43 referenced nodes | All existing extracted drain endpoints now resolve to node IDs. |
| BMC storm drains | 1,017 | 575 labelled Existing; 442 labelled Proposal excluded from normalized existing network. |
| BMC Contour_20CM | 1,152 lines | Elevations present, 18.2–34.6 in source units. Not a validated bare-earth DTM. |
| OSM roads/waterways | 896 ways, 3,407 nodes | Raw node topology retained; road restrictions and flood exposure integration pending. |
| Open-Meteo precipitation | 48 hourly values | Actual NWP response, not radar. Time-limited snapshot; refresh before use. |

## Evidence and source interpretation

The BMC catalogue is at:
https://prsrvgisapp.mcgm.gov.in/server/rest/services/mcgm/MCGMGIS_Departments_Master_All_Layers/MapServer

Layers 6, 7 and 301 supply the manholes, drains and contours respectively. Queries
first enumerate intersecting object IDs, then fetch all those IDs in batches and
check exact identity/uniqueness to detect partial downloads. Node supplements
query the 43 missing node IDs without assuming an AOI edge is an outfall.

BMC field aliases explicitly identify conduit length in metres, width/height in
millimetres, and upstream/downstream invert in **mTHD**. The importer converts
dimensions to metres and preserves THD as the declared invert datum. The manhole
ground-level alias does not declare a datum. No guessed elevation offset is used.

Existing sections: 407 CIRC, 93 RECT, 37 ARCH, 38 OREC. The backend now supports
circular and explicitly open/closed rectangular reference sections. BMC code
definitions still need confirmation before automatic mapping; arch sections
remain unsupported. Two records have adverse invert slopes
(OBJECTIDs 15565, 18302); three are flat (17784, 18033, 18327). These are retained
and reported for investigation, never silently reversed or discarded.

All extracted existing dimensions are positive and invert fields are numeric.
These checks establish attribute availability, not survey accuracy or current
physical condition. The extracted area is not a complete verified catchment.

Raw municipal files remain local because public query access does not establish
redistribution terms. No municipal data or requests were published or submitted.

## Remaining external requirements

1. **Terrain and benchmark evidence:** bare-earth DTM covering the catchment at
   0.5–2 m, acquisition date, vertical datum and independent checkpoints (target
   RMSE <=0.30 m). Alternatively obtain the originating survey behind the contours,
   including ground classification, breaklines and accuracy report. A 20 cm contour
   interval alone is not proof of 20 cm elevation accuracy. See TERRAIN_DATA_REQUEST.md.
2. **Hydraulic metadata:** confirm THD relation to ground/contour datum, as-built
   status/date, conduit shape definitions, outfalls/tide heads, roughness and inlet/
   manhole storage/capture parameters. Public drain geometry and dimensions are now
   available; these remaining fields were not supplied by the downloaded schema.
3. **Mumbai DWR input:** quantitative georeferenced rainfall or calibrated radar
   scans with timestamps, accumulation/rate semantics, coverage and quality flags.
   The official IMD portal exposes a request form, not an anonymous Mumbai rainfall
   bundle found during this inspection:
   https://radarapi.imd.gov.in/dsp/frontend/add_record/frontend/Radar_Data_Request
   Use institutional access through the SIH problem owner/IMD as needed. No request
   or payment was submitted. MOSDAC's TERLS radar product is for Thumba, so it is not
   a Mumbai substitute: https://www.mosdac.gov.in/3d-volumetric-terls-dwrproduct
4. **Independent observations:** time-stamped rain gauges and flood depths/extents,
   location/datum and event dates for held-out validation. News scenarios alone do
   not establish forecast accuracy.

## Reproduce

From repository root:

```powershell
.\.venv\Scripts\python.exe scripts\acquire_pilot_data.py --source bmc
.\.venv\Scripts\python.exe scripts\acquire_pilot_data.py --source osm
.\.venv\Scripts\python.exe scripts\acquire_pilot_data.py --source weather
.\.venv\Scripts\python.exe scripts\prepare_municipal_pilot.py data\raw\pilot_downloads\20260911T180629429642Z_bmc --report data\pilot\municipal_qa.json
.\.venv\Scripts\python.exe scripts\acquire_pilot_data.py --source bmc-node-references --input-directory data\raw\pilot_downloads\20260911T180629429642Z_bmc
.\.venv\Scripts\python.exe scripts\prepare_municipal_pilot.py data\raw\pilot_downloads\20260911T180629429642Z_bmc --supplement data\raw\pilot_downloads\20260911T181006663823Z_bmc-node-references --report data\pilot\municipal_qa.json
.\.venv\Scripts\python.exe scripts\prepare_municipal_pilot.py data\raw\pilot_downloads\20260911T180629429642Z_bmc --supplement data\raw\pilot_downloads\20260911T181006663823Z_bmc-node-references --downstream data\raw\pilot_downloads\20260911T183534970452Z_bmc-downstream --report data\pilot\municipal_qa.json
```

New acquisitions create new timestamped folders; substitute the printed paths.
Preparation verifies source checksums and creates `normalized_existing_drainage.json`
inside the source folder. It is an import intermediate, not a runnable hydraulic
model. Missing roughness, boundary conditions and ground datum remain explicit.
The optional `--downstream` input checksum-verifies and de-duplicates the published
downstream closure before normalizing it. Its terminal nodes are not treated as
outfalls until survey evidence classifies their boundary role.

OpenStreetMap source/attribution: https://www.openstreetmap.org/copyright
Open-Meteo time semantics: https://open-meteo.com/en/docs — hourly precipitation
is the sum for the preceding hour, with the timestamp at that interval's end.
