# Drainage graph inspection

## Topology-only tracing

`POST /api/v1/drainage/topology` accepts `node_ids`, `edges` (each with `id`,
`upstream`, `downstream`), optional `confirmed_outfall_ids`, optional `start_node`,
and `direction` (`upstream` or `downstream`). It does not require elevations or
roughness. Missing/duplicate references and unknown trace nodes return 422.

The response includes weakly connected components, isolated nodes, branches,
terminals, confirmed-outfall reachability and an optional complete trace.
Cycle detection reports nodes in or downstream of cycles, not exclusively cycle
members. Traversals terminate even when cycles exist. Terminals are never inferred
to be outfalls. Supplied outfalls with outgoing edges are explicitly reported.

The municipal preparation script writes a reproducible `topology_request.json`
and detailed `topology_report.json` alongside the normalized source data. The
summary is included in `data/pilot/municipal_qa.json`.

`POST /api/v1/drainage/inspect` accepts a JSON network and returns topology QA
and a GeoJSON FeatureCollection. Input is not persisted. The interactive API
schema is available at `/docs` after restarting the backend.

## Reviewed municipal compilation

`POST /api/v1/drainage/municipal-model/compile` accepts a normalized municipal
extract (`data`) and a reviewed configuration (`config`). It keeps BMC source
geometry and pipe endpoint inverts, but requires evidence strings for datum,
asset status, section mapping and parameters; it never fills those values from
defaults. Missing or unresolved fields return `REVIEW_REQUIRED`. A
`GRAPH_VALIDATED_FOR_MODEL_REVIEW` result means only that the supplied review
configuration forms a structurally valid graph, not that survey evidence or
hydraulic performance has been independently certified.

Required network fields: `vertical_datum`, `nodes`, `edges`.
Every asset requires `id`, `source`, and `quality` (OBSERVED, DERIVED, ESTIMATED,
or SIMULATED). Nodes require `kind` (inlet/manhole/junction/outfall), `lat`, `lon`,
`ground_m`, `invert_m`. Edges require `upstream`, `downstream`, `length_m`,
`manning_n` and a section definition. The default `shape: circular` requires
`diameter_m`. `rectangular_closed` and `rectangular_open` require `width_m` and
`height_m` instead. Mixing diameter with rectangular dimensions is rejected.
All dimensions must be positive finite metres. Arch sections are unsupported.

All elevations must share the declared vertical datum. Edges may supply both
`upstream_invert_m` and `downstream_invert_m` to preserve surveyed pipe offsets
at junctions. Supplying just one is rejected. If omitted, both default to their
respective node bottoms for backward compatibility. Positive gravity slopes are
derived from these pipe endpoint levels and conduit length. Each endpoint must
lie between its node bottom and ground level. Node bottoms remain independent
storage reference levels; importing a pipe does not change them.

Malformed dimensions receive HTTP 422. Structurally readable graphs receive
HTTP 200 with `valid`, `errors`, component count and inlet-to-outfall reachability.
Missing references, duplicate IDs, cycles, nonpositive slopes and stranded nodes
make `valid` false. Disconnected components are counted; separate catchments that
each drain to an outfall are permitted.

GeoJSON edges are straight endpoint chords, explicitly marked DERIVED_ENDPOINT_CHORD.
They are debug geometry, not surveyed pipe alignments. QA does not imply hydraulic
capacity, flood prediction validity, or municipal data certification.

Run: `.venv/Scripts/python.exe -m pytest tests/test_drainage_graph.py -q`

## Pipe capacity

`POST /api/v1/drainage/capacity` accepts `{ "graph": <network>,
"blockage_pct": {"pipe-id": 50}, "demand_m3_s": {"pipe-id": 0.3} }`.
Both per-edge maps are optional. Unknown IDs, invalid topology and invalid
dimensions return HTTP 422. Omitted demand remains unevaluated, not zero flow.

The full-section gravity reference uses SI Manning Q=A R^(2/3) sqrt(S)/n,
with A=pi D²/4 and R=D/4. See the
[EPA SWMM hydraulics reference](https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100S9AS.txt).
Blockage linearly derates reference capacity; this is an explicit estimated
scenario parameter, not a physical sediment cross-section model. A blocked pipe
has zero effective capacity and a null demand/capacity ratio to avoid infinity.

Results include dimensions, reference velocity, capacity, excess supplied demand,
asset provenance and status. These are static per-pipe checks; downstream heads,
network continuity, pressure flow, storage and surface surcharge are not yet solved.
No existing flood-safe route validity is enabled by this endpoint.

### Rectangular section references

For both rectangular shapes, A = width * height. Closed-section wetted perimeter
is 2 * (width + height); open-section wetted perimeter is width + 2 * height.
R = A / wetted perimeter. The open case evaluates bankfull reference capacity,
not variable water-depth conveyance. Responses include `shape`,
`wetted_perimeter_m` and `capacity_basis`. The existing `full_flow_*` response
keys remain for compatibility; use `capacity_basis` to distinguish bankfull
open channels from full closed conduits.

This geometry uses the [USBR hydraulic-radius definition](https://www.usbr.gov/tsc/techreferences/mands/wmm/chap02_11.html).
Pressure flow and conduit overflow are not added by this change. The existing
lumped-storage timestepper uses the shape-specific reference capacity and retains
the same volume accounting and limitations.

BMC `RECT/OREC` source codes are preserved by the municipal importer. Confirm
their definitions before mapping to an open or closed model section. `ARCH`
is not replaced by a rectangle or equivalent circle.

## Time stepping prototype

`POST /api/v1/drainage/simulate` extends the capacity request with mandatory
`storage_area_m2` for every non-outfall node and `outfall_head_m` for every
outfall. Optional `initial_depth_m` and constant `inflow_m3_s` maps reference
storage nodes. `duration_s` defaults to 300 (maximum 10800); `step_s` defaults
to 1 (maximum 10). Independent pipe demand is rejected for this endpoint.

Explicit simultaneous transfers are limited by Manning reference capacity,
available donor volume and a degree-weighted head equalisation limit. Storage
head is invert plus volume/storage area. Excess above ground is conserved in
a per-node surcharge accounting bucket. Outputs include T+0, sampled node
states, cumulative edge transfers and total mass balance.

Raised pipe inlets cannot withdraw sump water below their upstream invert.
Each proposed transfer is bounded by the volume above that inlet (shared
conservatively by node degree), nominal capacity and head equalisation. The
downstream pipe invert also bounds the receiving head used in that comparison.
This does not add an entrance-loss model or partial-depth conduit hydraulics.
Inspection GeoJSON identifies `invert_source` as PIPE_ENDPOINTS or NODE_BOTTOMS.

This is a lumped storage prototype, not a calibrated dynamic-wave hydraulic
solver. Outfall heads are fixed; reverse flow, pipe momentum/storage and actual
surface reinjection are absent. Tests exercise dry/zero duration, blockage,
tailwater restriction, nonnegative storage and volume accounting. Real network
acceptance and Phase 3's analytical/validation exit gates remain open.
