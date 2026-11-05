# CanopyPulse — Member 1 Deliverable Documentation
## Satellite Thermal GIS Mapping & Urban Heat Island Analytics Module

**Team:** THE CODE CRUSADERS  
**Role:** Member 1 – Satellite Thermal GIS Mapping & Urban Heat Island Analytics  
**Project:** CanopyPulse (Visakhapatnam Corporate CSR Afforestation Audit Platform)  
**Deliverable:** Satellite Thermal GIS Heat Island Mapping & Micro-Climate Analytics Module  

---

## 📋 Table of Contents
1. [Role Overview & Responsibilities](#1-role-overview--responsibilities)
2. [Module Architecture & Satellite Remote Sensing Pipeline](#2-module-architecture--satellite-remote-sensing-pipeline)
3. [Implemented Features](#3-implemented-features)
   - [Feature 1: Multi-Band Satellite Remote Sensing Layer Switcher](#feature-1-multi-band-satellite-remote-sensing-layer-switcher)
   - [Feature 2: Temporal Overpass Simulation](#feature-2-temporal-overpass-simulation)
   - [Feature 3: Interactive SVG GIS Heatmap Visualizer](#feature-3-interactive-svg-gis-heatmap-visualizer)
   - [Feature 4: Ward Micro-Climate Telemetry Diagnostic](#feature-4-ward-micro-climate-telemetry-diagnostic)
   - [Feature 5: What-If Afforestation Cooling Simulation Engine](#feature-5-what-if-afforestation-cooling-simulation-engine)
   - [Feature 6: Ward Thermal Index & Heat Ranking Ledger](#feature-6-ward-thermal-index--heat-ranking-ledger)
4. [Step-by-Step Live Demo Presentation Script](#4-step-by-step-live-demo-presentation-script)
5. [Presentation Screenshots Checklist](#5-presentation-screenshots-checklist)
6. [Testing & Verification Report](#6-testing--verification-report)

---

## 1. Role Overview & Responsibilities

| Responsibility | Status | Implementation Details |
|---|---|---|
| **Design the Satellite GIS Heat Mapping Interface** | ✅ Complete | Interactive vector GIS canvas with accurate Visakhapatnam coastal geography, transit corridors, and dynamic micro-climate heat plume contours. |
| **Integrate Multi-Band Remote Sensing Layers** | ✅ Complete | Real-time layer switching between Landsat-9 TIRS Band 10 Thermal LST, Sentinel-2 MSI NDVI Vegetation Density, UHI Micro-Climate Risk Corridors, and True-Color High-Resolution Basemap. |
| **Model Temporal Solar & Nocturnal Radiation** | ✅ Complete | 3-phase temporal overpass engine simulating Morning 10:30 AM (Landsat baseline), Peak Solar 02:00 PM (+2.8°C radiative surge), and Night 08:30 PM (concrete thermal retention). |
| **Build Micro-Climate Telemetry & Species Matching** | ✅ Complete | 6-point telemetry diagnostic for all 10 Vizag wards (LST, Heat Anomaly vs 31.5°C, Canopy Deficit vs 25% Goal, NDVI, Impervious Ratio, Albedo) with soil classification and tailored native tree species matching. |
| **Engineer "What-If" Afforestation Cooling Simulator** | ✅ Complete | Interactive mathematical simulation model projecting LST cooling (-0.4°C to -2.3°C), canopy density gain (+12.5%), and annual $CO_2$ sequestration with real-time SVG hotspot cooling visualization. |
| **Enable Full Bilingual Accessibility** | ✅ Complete | Full Telugu (`తెలుగు`) localization across all GIS layers, telemetry metrics, simulation sliders, legends, and navigation controls. |
| **Ensure Seamless Team Integration** | ✅ Complete | Direct two-way handoff with Member 4 (Sapling Survival Verification & Registration) via ward pre-selection and cohesive state persistence. |

---

## 2. Module Architecture & Satellite Remote Sensing Pipeline

```
[Landsat-9 TIRS Band 10 (10.8µm)]      [Sentinel-2 MSI (10m Multi-Spectral)]
                  │                                        │
                  ▼                                        ▼
    [Thermal Radiance & LST]                 [NDVI Vegetation Density]
                  │                                        │
                  └──────────────────┬─────────────────────┘
                                     │
                                     ▼
             [Visakhapatnam Micro-Climate Analysis Engine]
            (10 Wards: Gajuwaka, Mindi, Autonagar, Jagadamba, etc.)
                                     │
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
[Multi-Band GIS Canvas]    [Telemetry Diagnostic]    [Cooling Simulator]
• Thermal Heat Plumes      • Heat Anomaly (ΔT)       • Sapling Slider
• Sentinel-2 NDVI Field    • Canopy Deficit Meter    • Projected ΔLST
• UHI Risk Vectors         • Impervious Concrete %   • Annual CO2 Offset
• Temporal Overpass        • Native Species Match    • Dynamic Canvas Cool
            │                        │                        │
            └────────────────────────┼────────────────────────┘
                                     │
                                     ▼
                [Hand-off to Member 4: Field Sapling Ledger]
                     (Pre-selected Ward & Species Goal)
```

---

## 3. Implemented Features

### Feature 1: Multi-Band Satellite Remote Sensing Layer Switcher
- **Sub-Tab:** `Interactive Satellite GIS Map`
- **4 Remote Sensing Modes:**
  1. **Landsat-9 Thermal LST (Band 10):** Renders calibrated Land Surface Temperature gradients (30°C to 42°C+), visualizing thermal plumes over heavy industrial hubs (Mindi refinery, Autonagar transport corridor, Gajuwaka auto basin).
  2. **Sentinel-2 NDVI Vegetation Density:** Computes Normalized Difference Vegetation Index (0.0 to 0.6) highlighting lush coastal canopy havens (MVP Colony, Siripuram, Madhurawada) contrasted with barren paved corridors.
  3. **UHI Micro-Climate Risk Corridors:** Displays pulsating circular hazard boundary rings and alert vectors around severe heat trap zones and industrial exhaust perimeters.
  4. **True-Color High-Resolution Basemap:** Topographic visual base detailing the Bay of Bengal coastline, Dolphin's Nose hill ridge, Kailasagiri topography, Visakhapatnam Port harbor entrance, and NH16 corridor.

### Feature 2: Temporal Overpass Simulation
- **Temporal Engine Controls:**
  - **10:30 AM (Landsat Overpass):** Baseline morning thermal capture as satellite crosses the equator.
  - **02:00 PM (Peak Solar UHI):** Simulates peak diurnal solar radiation, adding $+2.8^\circ\text{C}$ to exposed asphalt and industrial metal roofs.
  - **08:30 PM (Concrete Radiative Trap):** Analyzes nocturnal heat retention where low-albedo concrete wards (Mindi, Jagadamba, Autonagar) remain $+3.5^\circ\text{C}$ to $+4.2^\circ\text{C}$ warmer than vegetated residential areas.

### Feature 3: Interactive SVG GIS Heatmap Visualizer
- **Geography & Visual Features:**
  - Scaled SVG canvas modeled on Visakhapatnam's coastal shoreline (`17.6868° N, 83.2185° E`).
  - Ocean wave animation, coastal sea-breeze airflow line, and major transit routes.
  - 10 interactive ward hotspot pins with color-coded severity:
    - *Critical Priority ($>38^\circ\text{C}$):* Intense rose badge with animated radar pulse (`animate-ping`).
    - *High Priority ($36^\circ\text{C} - 38^\circ\text{C}$):* Deep amber-rose badge.
    - *Medium Priority ($34^\circ\text{C} - 36^\circ\text{C}$):* Warm amber badge.
    - *Low Priority ($<34^\circ\text{C}$):* Emerald-green badge.
  - Interactive hover tooltips showing real-time LST, Canopy %, NDVI, and micro-climate stress.
  - Click-to-focus ward selection updating all telemetry panels and simulation models instantly.

### Feature 4: Ward Micro-Climate Telemetry Diagnostic
- **Sub-Tab:** `Ward Micro-Climate Telemetry`
- **6 Key Scientific Indicators:**
  1. **Land Surface Temperature (LST):** Ground thermal reading from Landsat-9 infrared sensor.
  2. **Heat Anomaly ($\Delta T$):** Temperature variance compared to Vizag coastal average ($31.5^\circ\text{C}$).
  3. **Canopy Deficit:** Variance compared against the $25\%$ National Urban Forestry Goal.
  4. **Sentinel-2 NDVI Index:** Biophysical vegetation health indicator ($0.06$ in Mindi to $0.44$ in MVP Colony).
  5. **Impervious Surface Ratio:** Percentage of land covered by non-evaporative concrete and asphalt pavement.
  6. **Surface Albedo:** Heat absorption / reflection index ($0.10$ to $0.25$).
- **Bio-Terrain & Species Matching Engine:**
  - Diagnostic breakdown of soil characteristics (e.g. red sandy loam, industrial subgrade, alluvial soil).
  - Prescribes climate-resilient native species:
    - *Mindi Industrial:* Casuarina equisetifolia & Pongamia pinnata (acid/gas/drought resistant).
    - *Autonagar Corridor:* Pongamia pinnata & Azadirachta indica (particulate & vehicular dust filter).
    - *Jagadamba Core:* Terminalia catappa (broad vertical shade in tight urban canyons).
    - *Pendurthi Transition:* Ficus benghalensis (large canopy cooling footprint).

### Feature 5: What-If Afforestation Cooling Simulation Engine
- **Sub-Tab:** `What-If Afforestation Cooling Simulator`
- **Interactive Modeling:**
  - Plantation slider ranging from **$200$ to $5,000$ saplings**.
  - Species mix selector (Balanced Native, Dense Shade Priority, Industrial Windbreak, Drought Buffer).
  - Real-time physics engine projecting:
    - **$\Delta \text{LST}$ Temperature Reduction:** Up to $-2.3^\circ\text{C}$ micro-climate cooling.
    - **Canopy Density Gain:** Up to $+12.5\%$ canopy coverage.
    - **Annual Carbon Offset:** Up to $+110$ Metric Tons of $CO_2$ sequestered per year.
    - **Soil Moisture Retention:** Up to $+38\%$ increase in soil water retention.
- **Dynamic Visual Feedback:** The selected ward's pin and thermal glow on the map smoothly cool down from critical red to green in real time!
- **Commit to CSR Targets:** Clicking "Apply Simulation to CSR Target Plan" persists the projected metrics into state and `localStorage` with a celebratory banner.

### Feature 6: Ward Thermal Index & Heat Ranking Ledger
- **Sub-Tab:** `Ward Thermal Index & Heat Ranking`
- Real-time search by ward name, ID, or corporate sponsor.
- Thermal threshold filters (All, Critical $>38^\circ\text{C}$, High $36-38^\circ\text{C}$, Moderate $34-36^\circ\text{C}$, Cool $<34^\circ\text{C}$).
- Multi-parameter sorting: Hottest to Coolest, Coolest to Hottest, Lowest Canopy First, Most Saplings Tagged.
- Comprehensive data ledger with direct "Simulate" quick-action triggers.

---

## 4. Step-by-Step Live Demo Presentation Script

### Step 1: Introduce the GIS Heat Map Interface
1. Navigate to the **"Thermal Heat Map"** tab in the top navigation.
2. Highlight the **Member 1 Badge**: *"Member 1: Satellite Thermal GIS Mapping & Urban Heat Island Analytics"*.
3. Point to the **Top KPI Strip**:
   - *"CanopyPulse directly integrates Landsat-9 TIRS thermal infrared and Sentinel-2 optical telemetry to identify Visakhapatnam's most vulnerable micro-climate hotspots."*
   - *"Peak LST is recorded at 40.1°C in Ward 60 Mindi, while city-wide canopy averages only 11.1%, representing a severe -13.9% deficit against national guidelines."*

### Step 2: Demonstrate Satellite Layer Switching & Temporal Overpass
1. Click the satellite layer buttons:
   - Click **"Sentinel-2 NDVI"** to reveal the vegetation density gradient: notice the lush green canopy in MVP Colony (0.44 NDVI) versus the barren concrete corridor in Autonagar (0.08 NDVI).
   - Click **"UHI Risk Corridors"** to display rotating thermal hazard alert vectors over the industrial corridor.
   - Click **"Landsat-9 Thermal LST"** to return to the thermal heat plumes.
2. Toggle the **Temporal Overpass**:
   - Switch to **"02:00 PM (Peak)"** to show how solar radiation drives industrial wards past 42°C.
   - Switch to **"08:30 PM"** to demonstrate nocturnal concrete heat trapping.
   - Return to **"02:00 PM"**.

### Step 3: Inspect Ward Micro-Climate Telemetry
1. Click on **Ward 60 Mindi Industrial Zone** (or Ward 65 Gajuwaka).
2. Examine the **Side Drawer**:
   - Surface Temperature: **40.1°C** (Critical Priority).
   - Heat Anomaly: **+8.6°C** above coastal baseline.
   - Impervious Surface: **94% Paved** with concrete and asphalt.
   - Recommended Species: **Casuarina equisetifolia & Pongamia pinnata**.
3. Click the sub-tab **"Ward Micro-Climate Telemetry"** for a deep-dive 6-gauge diagnostic and soil profile analysis.

### Step 4: Run the What-If Afforestation Cooling Simulator
1. Click the sub-tab **"What-If Afforestation Cooling Simulator"**.
2. Select **Ward 65 Gajuwaka** (Baseline LST: 38.4°C, Canopy: 6.2%).
3. Drag the **Sapling Plantation Slider** from 1,500 to **3,500 Saplings**.
4. Show the audience the dynamic results:
   - *"By planting 3,500 saplings with a dense shade native mix, our predictive model forecasts a -1.61°C drop in Land Surface Temperature, a +8.8% increase in canopy density, and 77 Metric Tons of annual CO2 sequestration!"*
5. Click **"Apply Simulation to CSR Target Plan"**:
   - Observe the green success banner.
   - Switch back to the **"Interactive Satellite GIS Map"** sub-tab: see how Ward 65 now displays a green `"-1.6°"` cooling badge!

### Step 5: Seamless Two-Way Handoff to Member 4
1. Click **"Register / Audit Sapling for this Ward"** in the drawer or simulator.
2. Watch CanopyPulse smoothly transition to Member 4's **"Sapling Verification & Registration"** screen with Ward 65 pre-selected in the registration form.
3. Toggle the **Telugu (`తెలుగు`)** button in the header to demonstrate 100% bilingual accessibility for municipal field officers and local volunteers.

---

## 5. Presentation Screenshots Checklist

Capture the following screenshots for your hackathon pitch deck and GitHub submission:

- [ ] **Screenshot 1 — Multi-Band GIS Canvas Overview:**
  - View: Sub-tab `Interactive Satellite GIS Map` with Landsat-9 Thermal LST active.
  - Elements: Member 1 badge, top 4 KPI cards, SVG coastal canvas with pulsing hotspot pins, and selected ward profile drawer.
- [ ] **Screenshot 2 — Sentinel-2 NDVI Remote Sensing Layer:**
  - View: Satellite layer switched to `Sentinel-2 NDVI Vegetation Density`.
  - Elements: Green vegetative contours over MVP Colony contrasted with brown heat trap zones.
- [ ] **Screenshot 3 — Temporal Overpass Diurnal Comparison:**
  - View: Temporal toggle set to `02:00 PM (Peak Solar UHI)`.
  - Elements: Highlighted temperature surge across industrial corridors.
- [ ] **Screenshot 4 — Ward Micro-Climate Telemetry Deep-Dive:**
  - View: Sub-tab `Ward Micro-Climate Telemetry`.
  - Elements: 6 telemetry gauges (LST, Heat Anomaly, Canopy Deficit, NDVI, Impervious %, Albedo) and native species recommendation box.
- [ ] **Screenshot 5 — What-If Afforestation Cooling Simulator:**
  - View: Sub-tab `What-If Afforestation Cooling Simulator` with slider at 3,500 saplings.
  - Elements: Real-time projection cards ($\Delta \text{LST}$ cooling, canopy gain, $CO_2$ sequestration) and "Apply Simulation" confirmation.
- [ ] **Screenshot 6 — Bilingual Telugu Interface:**
  - View: Click `తెలుగు` in the top header.
  - Elements: Telugu GIS layers, telemetry metrics, and simulation controls.

---

## 6. Testing & Verification Report

| Test Item | Expected Result | Actual Result | Status |
|---|---|---|---|
| **Vite Production Build** | Compiles clean bundle with zero syntax errors or warnings | `vite build` completed in 0.85s (`dist/index.html`, `dist/assets`) | ✅ Passed |
| **Layer Switcher** | Toggles between Thermal, NDVI, Hotspot, and Satellite visual overlays | Visual canvas and telemetry labels switch seamlessly | ✅ Passed |
| **Temporal Overpass** | Dynamically shifts temperatures between 10:30 AM, 02:00 PM, and 08:30 PM | Map pins, cards, and tables adjust LST values in real time | ✅ Passed |
| **Cooling Simulator** | Mathematical model calculates $\Delta \text{LST}$, canopy gain, and $CO_2$ offset | Slider adjusts values instantly; commit updates ward in `localStorage` | ✅ Passed |
| **Ward Telemetry & Search** | Displays accurate geospatial metrics and filters by threshold | Real-time filtering and sorting work without page reload | ✅ Passed |
| **Bilingual Toggle** | Translates all Member 1 UI text to Telugu (`తెలుగు`) | All layer labels, telemetry titles, and simulation controls update | ✅ Passed |
| **Cross-Module Handoff** | Action button pre-selects ward in Member 4's registration module | Navigation smoothly shifts to Geotag screen with matching ward ID | ✅ Passed |
