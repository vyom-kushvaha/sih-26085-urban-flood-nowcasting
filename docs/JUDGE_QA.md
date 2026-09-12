# Judge Q&A Preparation & Master Defense Sheet

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

# Urban Flood Nowcasting System — SIH26085 (FloodGuard AI)

---

## Final Team Rules for Q&A

### Rule 1 — Never invent an accuracy number
If asked: *"What is your accuracy?"*  
Say: *"We are validating it against historical observations. We will report measured metrics rather than claim an unsupported accuracy."*

### Rule 2 — Never call simulated data real
Say: *"This layer is simulated for prototype demonstration."*

### Rule 3 — Never claim to replace IMD/CWC/NDMA
Say: *"We complement existing information with an urban, local decision-support layer."*

### Rule 4 — Never overclaim AI
Say: *"The core system uses geospatial and runoff/drainage reasoning; ML is a calibration component where sufficient data exists."*

### Rule 5 — Explain every red zone
A judge should be able to ask: *"Why is this location red?"*  
And the team should answer immediately: *"Because the model is combining these specific factors: heavy rainfall + low elevation + drainage capacity limitations + blockage scenario."*

### Rule 6 — Know what is built
Before the presentation, every feature must be marked:
- **BUILT**
- **PARTIALLY BUILT**
- **SIMULATED**
- **PROPOSED**

---

## Core 40 Questions & Technical Answers

### Q1. What exactly is the problem you are solving?
**Short answer:** We are addressing the gap between rainfall/flood warnings and hyperlocal urban flood decision-making. Our system combines rainfall with terrain and drainage constraints to estimate which local areas and roads are more likely to experience water accumulation.  
**Detailed explanation:** A rainfall warning tells us that heavy rain may occur, but a municipality also needs to know where drainage may be overwhelmed and which locations require attention first.

---

### Q2. What is new in your solution?
**Answer:** Our focus is not simply AI-based flood prediction. We combine rainfall-driven runoff with local drainage constraints, including estimated drainage capacity and blockage scenarios, and present the result as an actionable municipal dashboard.  
*(Note: Never call this "first in India".)*

---

### Q3. Why do you need drainage information?
**Answer:** Because the same rainfall can produce different flooding outcomes depending on how quickly water can leave the area. If runoff exceeds effective drainage capacity, accumulation can increase.

---

### Q4. How do you model a blocked drain?
**Answer:** We represent blockage as a reduction in effective drainage capacity. For the prototype, effective capacity is calculated as `Effective Capacity = Base Capacity × (1 - Blockage Fraction)`. This is a scenario model that would be calibrated against real inspection data in a production deployment.

---

### Q5. What if you don't get real drainage data?
**Answer:** We have a fallback architecture. We can use mapped drainage geometry where available (e.g., OpenStreetMap) and use clearly labelled estimated or simulated capacity values for prototype demonstration. The dashboard will distinguish observed, derived, estimated, and simulated data.

---

### Q6. Isn't that fake data?
**Answer:** If simulated data is presented as real data, that would be a problem. We do not propose doing that. Simulated values are only for demonstrating the pipeline and scenario analysis. For real deployment, municipal drainage and inspection data would be required.

---

### Q7. Why not just use Google Flood Hub?
**Answer:** Google Flood Hub is an important existing flood-forecasting system. Our project is not trying to duplicate it. Our proposed focus is urban municipal decision support, especially the relationship between local rainfall, terrain, drainage constraints, blockage scenarios, and road-level operational decisions.

---

### Q8. Why not just use IMD warnings?
**Answer:** IMD provides essential meteorological warnings and nowcast products. We use such information as an upstream input rather than trying to replace it. Our proposed layer translates rainfall information into local urban flood-risk reasoning using terrain and drainage information.

---

### Q9. Why use AI/ML?
**Answer:** The initial risk engine can work with explainable physical/rule-based logic. ML is proposed as a calibration layer when enough historical labelled data becomes available. We do not want ML to become an unexplained black box.

---

### Q10. Why XGBoost?
**Answer:** XGBoost is a strong tabular-data baseline and can model nonlinear relationships between variables. But we would compare it with simpler baselines (such as Logistic Regression or Random Forest) and select it only if validation shows an improvement.

---

### Q11. How will you calculate accuracy?
**Answer:** We need labelled historical observations. Depending on the task, we can use precision, recall, F1-score, false-alarm rate, and spatial overlap. We will not claim an accuracy percentage without an actual test dataset.

---

### Q12. What if there is no historical data?
**Answer:** We can still demonstrate the system using scenario-based testing, but we must clearly distinguish demonstration from validation. Extensive performance claims require historical labelled data.

---

### Q13. Can your system predict six hours ahead?
**Answer:** The horizon depends on the availability and quality of rainfall forecasts and the model design. We can demonstrate a multi-hour timeline only for horizons supported by the underlying input data. We should not promise six-hour accuracy independently of forecast quality.

---

### Q14. Why use DEM?
**Answer:** Elevation and derived slope help identify low-lying areas and potential surface-flow pathways. Terrain is therefore an important factor in estimating where runoff may accumulate.

---

### Q15. What happens if the DEM is too coarse?
**Answer:** Local road-level drainage features may not be captured accurately. We therefore treat DEM resolution as a limitation and would use higher-resolution elevation data (e.g., Cartosat/LiDAR) for a production deployment.

---

### Q16. How does the dashboard help a municipal officer?
**Answer:** It prioritizes locations. Instead of only showing rainfall, it can show high-risk zones, drainage stress, blockage scenarios, affected roads, and the factors contributing to the risk.

---

### Q17. What is the most important dashboard feature?
**Answer:** The risk map alone is not enough. The most important feature is the combination of **location + time + reason + recommended inspection priority**.

---

### Q18. What if a road is flooded but your system did not predict it?
**Answer:** That is a false negative and an important validation case. We would record the observation, identify which input or model component failed, and use it for calibration. In production, the system should also complement official warnings and field reports rather than operate as the sole safety authority.

---

### Q19. What if your system gives too many alerts?
**Answer:** That can create alert fatigue. We therefore need calibrated thresholds, severity levels, and explanations. The system should prioritize actionable alerts rather than simply maximizing the number of warnings.

---

### Q20. Can this work in another city?
**Answer:** The software architecture is transferable, but the model should not be assumed to transfer perfectly. Each city has different terrain, drainage infrastructure, rainfall characteristics, and historical flood patterns, so local calibration and validation are required.

---

### Q21. Why use PostgreSQL + PostGIS?
**Answer:** Because this system is heavily geospatial. PostGIS allows us to store and query geographic objects such as roads, drainage segments, boundaries, and risk zones efficiently.

---

### Q22. Why FastAPI?
**Answer:** It provides a lightweight Python backend suitable for exposing data-processing and prediction functionality through APIs, while also fitting naturally with the Python-based geospatial and ML stack.

---

### Q23. Why React?
**Answer:** The municipal dashboard is a map-heavy web interface. React provides component-based UI development and works well with mapping and visualization libraries like Leaflet.

---

### Q24. What if real-time data stops?
**Answer:** The system should show data freshness and quality. It can fall back to the latest valid data or scenario mode, but it must clearly indicate that live data is unavailable rather than silently pretending it is current.

---

### Q25. What if the drainage is physically damaged rather than blocked?
**Answer:** The same framework can represent reduced effective capacity. In a production system, condition information would ideally come from inspection records or physical sensors.

---

### Q26. Can you detect a blocked drain automatically?
**Answer:** Not reliably from rainfall and DEM alone. Automatic blockage detection would require additional observations such as inspection data, water-level sensors, CCTV/computer vision, or citizen reports. Our prototype represents blockage as an input/scenario rather than falsely claiming automatic detection.

---

### Q27. What is your biggest technical challenge?
**Answer:** Data quality, especially detailed and current drainage capacity and condition data. The modelling itself is manageable; obtaining reliable local infrastructure data is the harder deployment problem.

---

### Q28. What is your biggest weakness?
**Answer:** The prototype may initially depend on estimated or simulated drainage information where real municipal data is unavailable. We address this by explicitly labelling the data and designing the system so that real municipal data can replace the assumptions later.

---

### Q29. What part is actually AI?
**Answer:** The ML component is the optional calibration/prediction layer. The broader system also contains geospatial processing and physics-inspired/rule-based reasoning. We should not label every component as AI.

---

### Q30. What happens if the AI is wrong?
**Answer:** The system is decision support, not an autonomous emergency authority. Predictions should include data-quality/uncertainty information and be combined with official warnings and human review for operational decisions.

---

### Q31. Why should a municipality trust your system?
**Answer:** Not because we claim perfect accuracy. Trust should come from transparent inputs, explainable risk factors, measurable validation, data-quality indicators, and an audit trail of why a risk was generated.

---

### Q32. What is your MVP?
**Answer:** A working web dashboard that takes rainfall and geospatial/drainage inputs, calculates explainable local flood risk, displays the risk on a map, and identifies drainage/road locations requiring attention.

---

### Q33. If you only have four days, what will you actually demonstrate?
**Answer:** We should demonstrate one complete vertical flow rather than many incomplete modules: `Input → Processing → Risk Calculation → Map → Dashboard → Explanation`. Additional features are presented as future scope.

---

### Q34. Why not build IoT sensors immediately?
**Answer:** Sensors improve real-world observability, but deploying a reliable sensor network requires hardware, calibration, power, connectivity, and maintenance. For SIH, we can demonstrate the software architecture first and show sensor integration as the next phase.

---

### Q35. How will citizen reports help?
**Answer:** They can provide local observations that may be useful for validation. However, citizen reports are noisy, so they should be quality-controlled and should not automatically become ground truth.

---

### Q36. How do you prevent fake citizen reports?
**Answer:** Possible controls include location verification, timestamps, duplicate detection, multiple independent reports, moderation, and confidence scoring. A report should be treated as an observation with uncertainty, not absolute truth.

---

### Q37. What is your fallback if ML doesn't work?
**Answer:** The core system can operate with the explainable baseline risk engine. ML is a calibration layer, not a single point of failure.

---

### Q38. What makes this production-ready?
**Answer:** The architecture is designed with production concerns such as data provenance, geospatial storage, API separation, validation, monitoring, and modularity. However, the SIH prototype itself should not be described as production-ready until it has undergone real-world validation and operational testing.

---

### Q39. What would you do with government access?
**Answer:** We would replace estimated infrastructure information with authoritative municipal data, integrate official weather/flood feeds, validate the model against historical incidents, and conduct a controlled pilot.

---

### Q40. Give your solution in one sentence.
**Answer:** **FloodGuard AI converts rainfall and urban geospatial/drainage conditions into explainable, location-specific flood-risk information so authorities can identify where flooding may occur, why it may occur, and which locations need attention first.**

---

## Rapid-Fire Q&A (15 Seconds per Answer)

| Question | One-line Answer |
|---|---|
| **Problem?** | Hyperlocal urban flood-risk decision support. |
| **Main input?** | Rainfall + terrain + drainage + exposure. |
| **Main output?** | Explainable location-level flood risk. |
| **Why drainage?** | Rainfall impact depends on drainage capacity. |
| **Blockage?** | Modelled as reduced effective drainage capacity. |
| **AI?** | Used mainly for calibration when labelled data exists. |
| **Dashboard?** | Risk map + timeline + causes + priority locations. |
| **Database?** | PostgreSQL + PostGIS. |
| **Backend?** | FastAPI. |
| **Frontend?** | React + TypeScript + Leaflet. |
| **GIS?** | Leaflet + geospatial Python tools. |
| **Validation?** | Historical/observed flood locations and scenario testing. |
| **Biggest challenge?** | Reliable local drainage data. |
| **Biggest limitation?** | Data quality and validation availability. |
| **IoT?** | Future/extension phase. |
| **Production?** | Requires municipal data and real-world validation. |
| **Existing systems?** | IMD, CWC and other flood-warning platforms exist. |
| **Difference?** | Local drainage-aware municipal decision support. |
| **Accuracy?** | Only claim measured metrics from real validation. |
| **City transfer?** | Architecture transfers; local calibration is required. |

---

## Questions the Team Should Ask the Judges / Mentors

1. What level of spatial resolution would be considered operationally useful for the target municipality?
2. Which official rainfall data source should be preferred for the final prototype?
3. Is municipal drainage capacity data available for the selected demonstration city?
4. What historical flood labels are available for validation?
5. Should the prototype prioritize ward-level or road-level prediction?
6. Which authority would be the primary operational user?
7. What alert lead time is most useful for the target use case?
8. Which data source can be treated as authoritative for flood observations?
9. What deployment constraints should be considered for government infrastructure?
10. Which existing system should the prototype be benchmarked against?
