# Remaining delivery milestones

As of 11 September 2026, **eight major delivery milestones remain open**.
This groups the original phases into product outcomes; it is not a count of
small code changes or an estimate of days. Tests prove specific implementation
behaviour, not overall product completion. No credible completion percentage or
delivery date can be assigned before resolving data-access/validation dependencies.

| # | Milestone | Existing foundation | Acceptance still required |
|---|---|---|---|
| 1 | Validated pilot terrain/domain | AOI, DTM manifest/checkpoint validation, municipal contours | Bare-earth DTM/checkpoints, compatible datum, catchment extent, runoff/land-cover inputs |
| 2 | Real drainage network integration | BMC assets downloaded, normalized existing/proposed separation, topology trace, section/pipe-offset contracts | Confirm shapes and as-built status, connect catchment, classify outfalls, supply hydraulic parameters, runnable import with survey alignment |
| 3 | Pilot-scale coupled hydraulics | Conservative small-grid surface/drain prototype, capacity/blockage/surcharge tests | Remove tiny-domain execution bottleneck, appropriate boundaries, missing sections, convergence/benchmark evidence |
| 4 | Operational rainfall pipeline | Timed frames, same-CRS conservative regridding, NWP snapshot | Mumbai DWR feed/access, adapters, freshness/failure handling and repeatable real-event bundle |
| 5 | Forecast products and GIS | Saved runs, depth/drain layers, frontend shell | Pilot depth grids, road exposure, synchronized time layers and complete end-to-end UI |
| 6 | Forecast-constrained road routing | OSM topology downloaded, route comparison prototype | Directed road graph, restrictions, forecast-depth intersections, calculated detours/no-route tests and UI integration |
| 7 | Independent model validation | Synthetic conservation tests and historical scenario scaffold | Observed event depths/rainfall, held-out metrics, calibration and published limitations |
| 8 | Operations and final delivery | Local serving, readiness API, basic deployment files | Persistent alerts/reports, server-side municipal auth/audit, scheduled execution, dependency failure drills, deployment and final demo |

Milestones can contain independent work; completion still requires their full
acceptance gates. Terrain, radar access and independent observations require
external data. See PILOT_DATA_ACQUISITION.md for the exact requests and sources.

## Current implementation step

Milestone 2: inspect the **existing** municipal network without assuming missing
hydraulic values. `/api/v1/drainage/topology` now accepts node/edge IDs and optional
confirmed outfalls and trace start. It returns connected components, isolation,
branching, terminal nodes, cycles and upstream/downstream traces.

The audited snapshot now includes a checksum-verified downstream closure from
the published existing links: 414 components (358 isolated nodes and 56 with
edges), 787 existing edges, 13 branch nodes and 62 terminal nodes. It has no
directed cycle. All 62 terminals need classification; none is assumed an
outfall. No confirmed outfall IDs were supplied, so all 1,193 nodes are reported
without a confirmed outfall path. This does not prove they lack physical
drainage. The closure is downstream-only: proposed links, AOI boundaries and
the missing upstream catchment can still affect the result.

This step advances milestone 2; it does not close it or reduce the remaining
milestone count. The next network task is tracing these components beyond the
provisional AOI and confirming outfall/boundary roles before hydraulic import.
