# Mumbai display boundary

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

The map uses the union of 24 BMC administrative wards for Greater Mumbai (Mumbai City and Mumbai Suburban), rather than the smaller Mumbai City district alone. This replaces the previous hand-drawn polygon.

- Source: [Sanjana Krishnan, Mumbai spatial data](https://github.com/sanjanakrishnan/mumbai_spatial_data), `BMC_admin_wards.geojson`, retrieved 11 September 2026.
- License: CC BY 4.0, as specified by the source repository for datasets without another source attribution.
- Original: `data/raw/boundaries/BMC_admin_wards.geojson`.
- Display asset: `frontend/mumbai-boundary.geojson`.
- Rebuild: install `shapely==2.1.2`, then run `python scripts/build_mumbai_boundary.py` from the project root.

Ward polygons are dissolved without simplifying their coordinates. The display retains disconnected islands and holes. The same geometry controls colour clipping and the 3 CSS px dark border, with a 5 px white contrast halo. Internal ward lines are removed. Offshore sea remains desaturated outside the source polygon.

This is a community-published administrative dataset, not a freshly surveyed or legally certified coastline. Coastal changes, source inaccuracies and water included within administrative wards may remain. The border identifies city context, not validated flood-model coverage. Flood-risk APIs and their existing coverage checks are unchanged.
