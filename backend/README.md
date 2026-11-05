# CanopyPulse Backend & Database Management
**Deliverable for Member 3 – Backend & Database**

This service provides database storage and REST APIs for the **CanopyPulse** platform:
- Creating and managing plantation records (Visakhapatnam 10 wards & micro-climate profiles)
- Storing individual sapling records with unique IDs (`SAP-VIZ-XXXX`) and **Growth Profiles** (height, stage, canopy spread)
- Managing locations, dates, GPS coordinates, and accuracy radiuses
- Managing photo references and storing uploaded field photos to disk
- Maintaining and updating sapling survival statuses (`Healthy`, `Drought Stressed`, `Needs Tree Guard`, `Dead`)
- **Pit Hole Detection & Planting Spots:** Storing detected open pits with depth, width, soil suitability, and AI-recommended species
- **Micro-Climate Species Recommender:** Algorithmic matching of native species based on ward LST (°C) and urban heat density
- **Community Adoption & Planting:** Endpoints for citizens and eco-clubs to adopt and plant trees in open pits
- **Community Watering & Care Alerts:** Real-time alert generation and maintenance logging for community volunteers
- Connecting the Executive CSR Compliance Dashboard to real-time data & official CSV export

---

## 📁 Directory Structure

```
backend/
├── data/
│   └── canopypulse_db.json     <-- Persistent database storage (atomic write)
├── uploads/                    <-- Uploaded field photos directory
├── server.js                   <-- REST API server (runs standalone on port 5000)
├── db.js                       <-- Database Management System engine & seed data
├── seed.js                     <-- Database seeder / benchmark reset utility
├── package.json                <-- Backend configuration & scripts
└── README.md                   <-- Documentation
```

---

## 🚀 Running the Backend

From the `CanopyPulse` project root:
```bash
npm run server
```
Or directly inside `backend/`:
```bash
node server.js
```
The server will start at `http://localhost:5000`.

To reseed the database to initial benchmark data:
```bash
npm run seed
```

---

## 🗄️ Database Schema

### 1. `wards` Table (Plantation & Micro-Climate Records)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Ward code (e.g. `'W65'`, `'W60'`) |
| `name` | `string` | Full name (e.g. `'Ward 65 Gajuwaka'`) |
| `lst` | `number` | Land Surface Temperature in °C (e.g. `38.4`) |
| `canopy` | `number` | Canopy coverage % (e.g. `6.2`) |
| `priority` | `string` | `'Critical Priority'`, `'High Priority'`, `'Medium Priority'`, `'Low Priority'` |
| `tagged` | `number` | Total saplings recorded in this ward |
| `survival` | `number` | Verified survival rate % |
| `sponsor` | `string` | CSR Sponsor (HPCL, RINL Vizag Steel, NTPC Simhadri, etc.) |
| `lat`, `lng` | `number` | Latitude and longitude coordinates |
| `description` | `string` | Micro-climate description |

### 2. `saplings` Table (Individual Sapling & Growth Records)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique record ID (e.g. `'SAP-VIZ-0001'`) |
| `ward_id` | `string` | Foreign key referencing `wards.id` |
| `species` | `string` | Native species (e.g. `'Pongamia pinnata'`) |
| `photo_url` | `string` | Relative path to uploaded photo (e.g. `'/uploads/SAP-VIZ-0001_173000.jpg'`) |
| `latitude`, `longitude` | `number` | Geotagged coordinates (e.g. `17.6888`, `83.2012`) |
| `gps_accuracy` | `number` | Accuracy radius in meters (e.g. `4.0`) |
| `growth_stage` | `string` | Growth stage (e.g. `'Sapling (6-8 months, ~4.1 ft)'`) |
| `canopy_spread_ft` | `number` | Canopy width in feet (e.g. `2.3`) |
| `survival_status` | `string` | `'Healthy'`, `'Drought Stressed'`, `'Needs Tree Guard'`, `'Dead'` |
| `confidence_score`| `number` | Gemini Vision AI confidence (e.g. `0.96`) |
| `action_required` | `string` | Volunteer field instructions |
| `audited_at` | `ISO Date` | Timestamp of audit |
| `auditor_name` | `string` | Auditor or community volunteer name |

### 3. `pits` Table (Planting Spots / Pit Holes)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique pit ID (e.g. `'PIT-VIZ-101'`) |
| `ward_id` | `string` | Ward location |
| `latitude`, `longitude` | `number` | GPS coordinates |
| `depth_cm`, `width_cm` | `number` | Dimensions of pit |
| `soil_condition` | `string` | e.g. `'Red Loamy Soil (GVMC Pre-dug Pit)'` |
| `suggested_species` | `string` | AI-suggested native species for this ward |
| `species_reasoning` | `string` | Climate and micro-cooling justification |
| `status` | `string` | `'Ready for Planting'`, `'Adopted by Rotary Eco Club'` |
| `detected_at` | `ISO Date` | Timestamp when pit was detected |
| `adopted_by` | `string` | Citizen or club who adopted the pit |

---

## 📡 REST API Reference

### 1. `GET /api/wards`
Returns all 10 Visakhapatnam wards with up-to-date tagged counts and survival rates.

### 2. `GET /api/saplings`
Returns all sapling records with growth tracking. Supports `?ward=W65`, `?status=Healthy`, `?species=Neem`.

### 3. `POST /api/saplings`
Creates and stores a new sapling audit record with growth stage and health metrics.

### 4. `GET /api/pits`
Returns all registered planting pit holes ready for community plantation drives.

### 5. `POST /api/pits`
Registers a newly detected planting pit hole from field camera scanning.

### 6. `POST /api/pits/:id/plant`
Allows a community volunteer/club to plant a tree into an open pit, automatically converting it into an active sapling record.

### 7. `GET /api/alerts`
Returns real-time community watering alerts (drought-stressed trees in high-LST zones) and tree guard repair alerts.

### 8. `POST /api/saplings/:id/water`
Logs a community watering action (`liters`, `citizen_name`), automatically restoring sapling status to `Healthy` and boosting ward survival rate.

### 9. `GET /api/recommendations/:wardId`
Returns algorithmic native species recommendations matching the ward's Land Surface Temperature and urban density.

### 10. `GET /api/export/csv`
Downloads the official corporate CSR compliance audit spreadsheet.
