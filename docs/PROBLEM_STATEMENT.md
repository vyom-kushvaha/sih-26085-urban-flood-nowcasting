# SIH26085 — Problem Statement Analysis

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


---

## 📋 Official Details

| Field | Value |
|-------|-------|
| **Problem Code** | SIH26085 |
| **Title** | Urban Flood Nowcasting System (Drainage and Rainfall Coupling) |
| **Track** | Software |
| **Theme** | Disaster Management |
| **Sponsoring Ministry** | Ministry of Earth Sciences (MoES) |
| **Prize** | ₹1,00,000 INR |
| **Deadline** | 20 September 2026 |

---

## 🎯 Problem Definition

> Build an AI/ML-based system for **real-time urban flood prediction (nowcasting)** by **coupling rainfall data** with **urban drainage network capacity**.

### Key Requirements:
1. **Real-time Data Integration**
   - Rainfall intensity & forecast data
   - Urban drainage network capacity
   - Water level sensors (if available)

2. **Coupled Modeling**
   - Rainfall-runoff modeling
   - Drainage overflow prediction
   - Urban topography & flood-prone zone mapping

3. **Nowcasting (0-6 Hours)**
   - Short-term flood risk prediction
   - Hyperlocal alerts (ward/block level)

4. **Alert & Dashboard System**
   - Real-time GIS-based flood risk maps
   - Automated alerts for municipality & citizens
   - SMS/WhatsApp/App-based early warnings

---

## 🔍 Problem Breakdown

### What is "Nowcasting"?

| Forecast Type | Time Range | Use Case |
|--------------|-----------|----------|
| **Nowcasting** | 0-6 hours | Immediate action, evacuation |
| Short-term | 6-48 hours | Preparation, resource mobilization |
| Medium-term | 2-7 days | Planning, early warning |
| Long-term | 7+ days | Climate planning |

**Our focus: Nowcasting (0-6 hours)** — Most critical for saving lives.

### What is "Coupling"?

```
Rainfall Data          Drainage Data
     ↓                      ↓
     └──────┬───────────────┘
            ↓
    COUPLED MODEL
    (Rainfall + Drainage)
            ↓
    Flood Risk Prediction
            ↓
    Alerts + Actions
```

**Coupling means:** Rainfall kitna hai + Drainage kitna le sakta hai = Overflow hoga ya nahi?

---

## 🏙️ Target City: Mumbai

### Why Mumbai?

| Factor | Mumbai Advantage |
|--------|-----------------|
| **Data Availability** | BMC has digitized drainage maps |
| **Rainfall Data** | IMD Mumbai radar, 2000+ rain gauges |
| **Flood History** | Well-documented (2005, 2017, 2019) |
| **Academic Research** | IIT Bombay, TISS studies available |
| **Judge Familiarity** | Everyone knows Mumbai floods |
| **Media Coverage** | High impact, relatable |

### Mumbai Flood-Prone Areas:

| Area | Elevation | Historical Floods |
|------|-----------|-------------------|
| Dharavi | 5-8m | Frequent |
| Dadar (Hindmata) | 10-15m | Heavy |
| Byculla | 2-5m | Severe |
| Parel | 5-10m | Frequent |
| Kurla | 5-8m | Frequent |
| Malad | 8-12m | Moderate |
| Andheri Subway | 3-5m | Severe |

---

## ⚡ Core Challenges

### 1. Data Availability
- Historical flood data poorly documented
- Drainage capacity data outdated
- Real-time sensor deployment limited

### 2. Computational Complexity
- 2D hydraulic modeling is compute-intensive
- Real-time requirement adds latency constraint

### 3. Accuracy vs Speed Trade-off
- Detailed physics = Slow
- Simplified model = Faster but less accurate
- **Solution: Diffusive-wave + ML hybrid**

### 4. Multi-Agency Integration
- IMD, Municipal Corp, Disaster Management
- Data sharing bureaucracy
- **Solution: Open APIs + modular architecture**

---

## 💡 Our Approach

### Innovation: Physics + ML Hybrid

```
Traditional Approach          Our Approach
├─ Physics only               ├─ Physics baseline (Diffusive-wave)
├─ Slow, accurate             ├─ Fast enough for nowcasting
└─ Hard to scale              ├─ ML calibration layer
                              └─ Scalable to any city
```

### Key Differentiators:

1. **Diffusive-Wave 2D Model** — Practical for real-time
2. **ML Calibration** — Historical data se accuracy improve
3. **Crowdsourced Validation** — Citizens report flooding
4. **City-Agnostic Framework** — Any city deployable
5. **Inclusive Design** — SMS/IVRS for non-smartphone users

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Prediction Accuracy | >80% for 0-3 hours |
| Alert Latency | <5 minutes |
| Spatial Resolution | Ward-level (1-2 km) |
| False Alarm Rate | <20% |
| System Uptime | >95% |

---

## 🔗 References

- [SIH 2026 Official Portal](https://sih.gov.in)
- [IMD Open Data](https://mausam.imd.gov.in)
- [BMC GIS Portal](https://gis.mumbai.gov.in)
- [Bhuvan ISRO](https://bhuvan.nrsc.gov.in)
- [OpenStreetMap](https://openstreetmap.org)

---

*Analysis prepared for Smart India Hackathon 2026*
