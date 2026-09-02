-- Urban Flood Nowcasting System (SIH26085)
-- PostgreSQL + PostGIS Database Schema Definition

-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Cities Table
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    bbox_min_lat DOUBLE PRECISION NOT NULL,
    bbox_min_lon DOUBLE PRECISION NOT NULL,
    bbox_max_lat DOUBLE PRECISION NOT NULL,
    bbox_max_lon DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Index for Cities
CREATE INDEX IF NOT EXISTS idx_cities_geom ON cities USING GIST(geom);


-- 2. Wards Table
CREATE TABLE IF NOT EXISTS wards (
    id SERIAL PRIMARY KEY,
    city_id INT REFERENCES cities(id) ON DELETE CASCADE,
    ward_name VARCHAR(100) NOT NULL,
    ward_code VARCHAR(20),
    base_capacity_mm_hr DOUBLE PRECISION DEFAULT 35.0,
    geom GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Index for Wards
CREATE INDEX IF NOT EXISTS idx_wards_geom ON wards USING GIST(geom);


-- 3. Drainage Segments Table (OSM/Imported Drains)
CREATE TABLE IF NOT EXISTS drainage_segments (
    id SERIAL PRIMARY KEY,
    osm_id BIGINT,
    osm_type VARCHAR(20),
    name VARCHAR(150),
    waterway_type VARCHAR(50) NOT NULL,
    design_capacity_mm_hr DOUBLE PRECISION DEFAULT 35.0,
    source VARCHAR(100) DEFAULT 'OSM GeoJSON',
    geom GEOMETRY(LineString, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Index for Drainage Segments
CREATE INDEX IF NOT EXISTS idx_drainage_segments_geom ON drainage_segments USING GIST(geom);


-- 4. Weather Observations Table
CREATE TABLE IF NOT EXISTS weather_observations (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    rainfall_mm_hr DOUBLE PRECISION NOT NULL,
    temp_c DOUBLE PRECISION,
    humidity_pct DOUBLE PRECISION,
    condition VARCHAR(100),
    source VARCHAR(100) NOT NULL,
    is_mock BOOLEAN DEFAULT FALSE,
    observed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    geom GEOMETRY(Point, 4326)
);

-- Spatial Index for Weather Observations
CREATE INDEX IF NOT EXISTS idx_weather_obs_geom ON weather_observations USING GIST(geom);


-- 5. Risk Calculations Log Table
CREATE TABLE IF NOT EXISTS risk_calculations (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    rainfall_mm_hr DOUBLE PRECISION NOT NULL,
    blockage_pct DOUBLE PRECISION NOT NULL,
    risk_score DOUBLE PRECISION NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    water_depth_cm DOUBLE PRECISION NOT NULL,
    nearest_drain_name VARCHAR(150),
    nearest_drain_distance_m DOUBLE PRECISION,
    data_quality_label VARCHAR(150),
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    geom GEOMETRY(Point, 4326)
);

-- Spatial Index for Risk Calculations
CREATE INDEX IF NOT EXISTS idx_risk_calc_geom ON risk_calculations USING GIST(geom);


-- 6. Citizen Reports Table
CREATE TABLE IF NOT EXISTS citizen_reports (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    water_depth_reported_cm DOUBLE PRECISION NOT NULL,
    description TEXT,
    photo_url TEXT,
    status VARCHAR(30) DEFAULT 'PENDING_VERIFICATION',
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    geom GEOMETRY(Point, 4326)
);

-- Spatial Index for Citizen Reports
CREATE INDEX IF NOT EXISTS idx_citizen_reports_geom ON citizen_reports USING GIST(geom);


-- 7. DEM Metadata Table (File & Raster Coverage Reference)
CREATE TABLE IF NOT EXISTS dem_metadata (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(150) NOT NULL UNIQUE,
    filepath TEXT NOT NULL,
    min_lon DOUBLE PRECISION NOT NULL,
    max_lon DOUBLE PRECISION NOT NULL,
    min_lat DOUBLE PRECISION NOT NULL,
    max_lat DOUBLE PRECISION NOT NULL,
    width_pixels INT NOT NULL,
    height_pixels INT NOT NULL,
    pixel_scale_x DOUBLE PRECISION NOT NULL,
    pixel_scale_y DOUBLE PRECISION NOT NULL,
    bounds_geom GEOMETRY(Polygon, 4326),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Index for DEM Bounding Box
CREATE INDEX IF NOT EXISTS idx_dem_bounds_geom ON dem_metadata USING GIST(bounds_geom);
