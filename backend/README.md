# CanopyPulse Backend & Database Management
**Deliverable for Member 3 – Backend & Database**

This service provides database storage and REST APIs for the **CanopyPulse** platform:
- Creating and managing plantation records (Visakhapatnam 10 wards & micro-climate profiles)
- Storing individual sapling records with unique IDs (`SAP-VIZ-XXXX`)
- Managing locations, dates, GPS coordinates, and accuracy radiuses
- Managing photo references and storing uploaded field photos to disk
- Maintaining and updating sapling survival statuses (`Healthy`, `Drought Stressed`, `Needs Tree Guard`, `Dead`)
- Connecting the Executive CSR Compliance Dashboard to real-time data

---

## 📁 Directory Structure

```
backend/
├── data/
│   └── canopypulse_db.json     <-- Persistent database storage (atomic write)
├── uploads/                    <-- Uploaded field photos directory
├── server.js                   <-- REST API server (runs with zero external deps or with express)
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
node backend/seed.js
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

### 2. `saplings` Table (Individual Sapling Records)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique record ID (e.g. `'SAP-VIZ-0001'`) |
| `ward_id` | `string` | Foreign key referencing `wards.id` |
| `species` | `string` | Native species (e.g. `'Pongamia pinnata'`) |
| `photo_url` | `string` | Relative path to uploaded photo (e.g. `'/uploads/SAP-VIZ-0001_173000.jpg'`) |
| `latitude` | `number` | Geotagged latitude (e.g. `17.6888`) |
| `longitude`| `number` | Geotagged longitude (e.g. `83.2012`) |
| `gps_accuracy` | `number` | Accuracy radius in meters (e.g. `4.0`) |
| `survival_status` | `string` | `'Healthy'`, `'Drought Stressed'`, `'Needs Tree Guard'`, `'Dead'` |
| `confidence_score`| `number` | Gemini Vision AI confidence (e.g. `0.96`) |
| `action_required` | `string` | Volunteer field instructions |
| `audited_at` | `ISO Date` | Timestamp of audit |
| `auditor_name` | `string` | Auditor name or ID |

---

## 📡 REST API Reference

### 1. `GET /api/wards`
Returns all 10 Visakhapatnam wards with up-to-date tagged counts and survival rates.

### 2. `GET /api/wards/:id`
Returns micro-climate details for a specific ward plus an array of all its tagged saplings.

### 3. `GET /api/saplings`
Returns all sapling records. Supports query parameters:
* `?ward=W65` - Filter by ward
* `?status=Healthy` - Filter by survival status
* `?species=Neem` - Filter by species substring
* `?q=search` - General search

### 4. `POST /api/saplings`
Creates a new sapling audit record. Handles saving the photo to `uploads/` and automatically updates ward totals.
```json
{
  "ward_id": "W65",
  "species": "Pongamia pinnata (Pungam)",
  "photo_base64": "data:image/jpeg;base64,...",
  "latitude": 17.6868,
  "longitude": 83.2185,
  "gps_accuracy": 4.0,
  "survival_status": "Healthy",
  "confidence_score": 0.96,
  "action_required": "Sapling growth on track.",
  "auditor_name": "Field Volunteer 02"
}
```

### 5. `PATCH /api/saplings/:id/status`
Updates an existing sapling's survival status and action requirements.
```json
{
  "survival_status": "Drought Stressed",
  "action_required": "Water with 4L and inspect tree guard."
}
```

### 6. `GET /api/dashboard/stats`
Returns live executive compliance metrics calculated directly from database records:
```json
{
  "totalTagged": 3543,
  "overallSurvivalRate": 84,
  "heatMitigatedCelsius": -0.6,
  "activeCorporateSponsorsCount": 8,
  "monthlyActiveAuditors": 142,
  "sevenDayVerificationRate": 89.4,
  "corporatePipelineValueINR": "₹34.5 Lakhs (Vizag B2B)",
  "databaseStatus": "Online & Persistent"
}
```

### 7. `POST /api/reset`
Resets the database to the benchmark Visakhapatnam dataset.
