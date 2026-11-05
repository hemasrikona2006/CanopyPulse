# CanopyPulse — Member 4 Deliverable Documentation
## Sapling Survival Verification & Testing Module

**Team:** THE CODE CRUSADERS  
**Role:** Member 4 – Sapling Survival Verification & Testing  
**Project:** CanopyPulse (Visakhapatnam Corporate CSR Afforestation Audit Platform)  
**Deliverable:** Sapling Registration & Survival Verification Module  

---

## 📋 Table of Contents
1. [Role Overview & Responsibilities](#1-role-overview--responsibilities)
2. [Module Architecture & Lifecycle](#2-module-architecture--lifecycle)
3. [Implemented Features](#3-implemented-features)
   - [Feature 1: Sapling Registration Process](#feature-1-sapling-registration-process)
   - [Feature 2: Photo-Upload Functionality](#feature-2-photo-upload-functionality)
   - [Feature 3: Basic Survival Verification Workflow](#feature-3-basic-survival-verification-workflow)
   - [Feature 4: Verified, Pending, and Failed Status Display](#feature-4-verified-pending-and-failed-status-display)
4. [Step-by-Step Live Demo Script](#4-step-by-step-live-demo-script)
5. [Presentation Screenshots Checklist](#5-presentation-screenshots-checklist)
6. [Testing & Verification Report](#6-testing--verification-report)

---

## 1. Role Overview & Responsibilities

| Responsibility | Status | Implementation Details |
|---|---|---|
| **Design the sapling registration process** | ✅ Complete | Form with auto-generated ID (`CP-WXX-XXXX`), native species selection, ward binding, planter attribution, corporate CSR sponsor, GPS detection, and default `Pending` status. |
| **Create photo-upload functionality** | ✅ Complete | Dual photo capabilities: Initial planting baseline photo upload + current field audit photo capture, with live thumbnail previews, file removal, and base64 parsing. |
| **Develop a basic survival verification workflow** | ✅ Complete | Interactive auditor workflow with baseline vs current photo comparison, 4-point biophysical health checklist, Gemini AI inspection, and decision buttons (`Verified`, `Pending`, `Failed`). |
| **Display Verified, Pending and Failed statuses** | ✅ Complete | Real-time KPI summary bar, color-coded status badges, filter tabs (`All`, `Verified`, `Pending`, `Failed`), text search, and toggleable Card / Table views. |
| **Test the complete application** | ✅ Complete | Verified build (`vite build` in 17.1s), zero runtime errors, offline AI fallback resilience, and localStorage persistence. |
| **Prepare demo documentation and screenshots** | ✅ Complete | Full documentation with presentation script and screenshot checklist. |

---

## 2. Module Architecture & Lifecycle

```
[1. Field Planting Drive] 
           │
           ▼
[2. Sapling Registration Form] ──▶ Upload Planting Photo + GPS Geotag
           │
           ▼
[Initial Status: PENDING] (Assigned ID: CP-WXX-XXXX)
           │
           ▼
[30-Day Follow-Up Audit] ──▶ Upload Follow-up Field Photo
           │
           ▼
[Biophysical Health Checklist + Gemini AI Vision Analysis]
           │
           ├──▶ "Healthy & Established"                  ──▶ Status: VERIFIED (Green)
           ├──▶ "Stressed / Needs Watering / Broken"      ──▶ Status: PENDING (Amber)
           └──▶ "Dried / Desiccated / Trampled"          ──▶ Status: FAILED (Rose)
           │
           ▼
[Update Ward Survival Rate & Corporate CSR Certificate]
```

---

## 3. Implemented Features

### Feature 1: Sapling Registration Process
- **Sub-Tab:** `Register New Sapling`
- **Fields:**
  - **Sapling ID:** Auto-generated unique format (e.g. `CP-W65-8492`) with a one-click regenerate button.
  - **Ward Selection:** Connects to 10 Visakhapatnam micro-climate wards (Gajuwaka, Mindi, Autonagar, MVP Colony, etc.).
  - **Native Tree Species Dropdown:** Curated for Vizag's climate:
    - *Pongamia pinnata (Pungam)* — Coastal drought-resilient
    - *Azadirachta indica (Neem)* — High canopy shade
    - *Ficus benghalensis (Banyan)* — Massive cooling
    - *Terminalia catappa (Badam)* — Dense leaf cover
    - *Casuarina equisetifolia* — Coastal windbreak
  - **Planter / Volunteer Name:** Attributed to volunteer or student chapter.
  - **CSR Sponsor:** Corporate attribution (HPCL, RINL Vizag Steel, NTPC Simhadri, Rotary Club).
  - **Planting Date:** ISO date selector defaulting to current date.
  - **GPS Geotagging:** Browser geolocation auto-detect with fallback to ward centroid coordinates (`±3m` accuracy).
- **Outcome:** Adds entry to the live registry with initial status `Pending`, increments ward's tagged counter, and saves to `localStorage`.

### Feature 2: Photo-Upload Functionality
- Integrated directly into both **Registration** and **Survival Verification**:
  - Live drag-and-drop dropzone or tap to browse.
  - Native mobile camera support via `capture="environment"`.
  - Instant image preview thumbnail with clear / re-take controls.
  - Base64 encoding for automated input into the multimodal AI inspector.

### Feature 3: Basic Survival Verification Workflow
- **Sub-Tab:** `Survival Verification Workflow`
- **Target Selection:** Easily pick any registered sapling via dropdown or directly click "Verify Survival" on any card/row in the ledger.
- **Side-by-Side Photographic Comparison:**
  - Baseline Planting Photo (original registration state and planting date).
  - Current Field Follow-Up Photo (new inspection capture).
- **Biophysical Health Assessment Checklist:**
  1. *Canopy & Leaf Health:* Healthy Vigorous Green / Partial Chlorosis / Severe Wilt / Complete Defoliation.
  2. *Stem & Trunk Vigor:* Intact & Sturdy / Bent / Snapped / Dried Brittle Wood.
  3. *Tree Guard Status:* Intact & Secured / Damaged / Crushed by Traffic / Missing.
  4. *Soil Moisture & Irrigation:* Adequately Moist / Dry / Severe Desiccation / Waterlogged.
- **Multimodal Gemini AI Vision Analysis:**
  - Evaluates leaf color, chlorophyll presence, and guard security.
  - Returns confidence score (e.g. 96%), detected species, health status, and actionable advice.
  - Automatic zero-crash fallback simulation if offline or without API key.
- **Auditor Decision Buttons:**
  - 🟢 **Mark as Verified (Surviving):** Confirmed alive and thriving.
  - 🟡 **Keep as Pending (Needs Follow-up):** Living but flagged for urgent watering or guard repair.
  - 🔴 **Mark as Failed (Mortality):** Irrecoverably dried out, destroyed, or vandalized.
- **Audit Ledger Trail:** Appends timestamp, auditor name, and field notes into the sapling's permanent audit history.

### Feature 4: Verified, Pending, and Failed Status Display
- **Executive KPI Strip:**
  - **Total Registered:** Total count of saplings in the registry.
  - **Verified Alive (Green):** Count and percentage of confirmed surviving saplings.
  - **Pending Audit (Amber):** Count of newly planted or follow-up saplings.
  - **Failed / Mortality (Rose):** Count of dead or destroyed saplings requiring replanting.
  - **Verified Survival Rate:** Calculated as `(Verified / (Verified + Failed)) * 100%`.
- **Status Filter Pills:** Instantly filter ledger between `All`, `Verified`, `Pending`, and `Failed`.
- **Dual Display Modes:**
  - **Card View:** High-visibility cards with photos, prominent status badges, location, planter, and "Verify Survival" shortcut.
  - **Auditor Table View:** Dense ledger format for compliance audits and corporate reporting.
- **Bilingual Interface:** Instant toggle between English and Telugu (`తెలుగు`) across all module components.

---

## 4. Step-by-Step Live Demo Script

Follow this script during your hackathon team presentation or evaluator demo:

### Step 1: Open the Module & Show Statuses
1. Click the **"Sapling Verification & Registration"** tab in the top navigation.
2. Highlight the **Member 4 Badge**: *"Member 4: Sapling Survival Verification & Testing"*.
3. Point to the **Top KPI Strip**:
   - *"Here you can see the clear status breakdown: Verified Alive (Green), Pending Audit (Amber), and Failed Mortality (Rose)."*
4. Click the filter pills:
   - Click **"Verified"** to show only flourishing saplings with confirmed survival notes.
   - Click **"Pending"** to show saplings awaiting their 30-day inspection cycle.
   - Click **"Failed"** to show documented mortality cases (e.g., Autonagar truck corridor desiccation).
   - Click **"All Statuses"** to restore full view.

### Step 2: Demonstrate Sapling Registration
1. Click the sub-tab **"Register New Sapling"** (or the red "+ Register" header button).
2. Show the **Auto-Generated Sapling ID** (e.g., `CP-W65-8492`).
3. Select **Ward 65 Gajuwaka** and **Pongamia pinnata (Pungam)**.
4. Click **"Detect Current GPS"** to demonstrate automatic coordinate locking.
5. Upload a photo or select an image file into the dropzone.
6. Note the **Initial Verification Status: Pending**.
7. Click **"Register Sapling to Ledger"**.
8. Observe the green confirmation banner and see the newly registered sapling appear at the top of the ledger with a yellow **PENDING** badge!

### Step 3: Execute the Survival Verification Workflow
1. On any sapling with status **Pending**, click **"Verify Survival"**.
2. Notice how it seamlessly switches to the **Survival Verification Workflow** sub-tab with that sapling loaded.
3. Show the **Side-by-Side Comparison**: Baseline photo on the left, follow-up photo upload on the right.
4. Click **"Run Gemini AI Inspection"**:
   - The AI inspects the leaf chlorophyll and guard condition, returning a ~96% confidence score and health diagnosis.
5. Adjust the **Biophysical Health Checklist** (e.g., Canopy: "Healthy Vigorous Green", Guard: "Intact & Secured").
6. Click the green button: **"Mark as Verified (Surviving)"**.
7. Click **"Save Survival Verification Decision"**.
8. Return to the ledger: the sapling status is now updated to **VERIFIED**, its audit history shows the timestamp and notes, and the verified survival rate KPI updates immediately!

---

## 5. Presentation Screenshots Checklist

Capture the following screenshots for your hackathon pitch deck and GitHub submission:

- [ ] **Screenshot 1 — Module Overview & KPI Counters:**
  - View: Sub-tab `Sapling Ledger & Statuses` with Card View.
  - Elements: Member 4 badge, 5 KPI cards (Total, Verified, Pending, Failed, Survival Rate %), and status filter pills.
- [ ] **Screenshot 2 — Status Filtering in Action:**
  - View: Filter clicked to `Verified` (green badges) vs `Failed` (red badges).
  - Demonstrates: Transparent reporting of both successful plantations and mortality causes.
- [ ] **Screenshot 3 — Sapling Registration Form:**
  - View: Sub-tab `Register New Sapling`.
  - Elements: Photo dropzone preview, auto-generated Sapling ID, native species dropdown, GPS coordinates bar.
- [ ] **Screenshot 4 — Survival Verification Workflow:**
  - View: Sub-tab `Survival Verification Workflow`.
  - Elements: Dual photo comparison (Baseline vs Follow-Up), Gemini AI confidence card, health checklist, and the 3 decision buttons (`Verified`, `Pending`, `Failed`).
- [ ] **Screenshot 5 — Bilingual Telugu Interface:**
  - View: Click the `తెలుగు` toggle in the header.
  - Demonstrates: Full local language accessibility for Vizag field workers and civic bodies.

---

## 6. Testing & Verification Report

| Test Item | Expected Result | Actual Result | Status |
|---|---|---|---|
| **Vite Production Build** | Compiles clean bundle without syntax or type errors | `vite build` completed in 17.10s (dist/index.html, dist/assets) | ✅ Passed |
| **Sapling Registration** | Form creates new sapling object, status `Pending`, saved to localStorage | New ID generated, prepended to list, saved to `canopypulse_saplings_v1` | ✅ Passed |
| **Photo Upload** | Reads file, converts to base64, shows thumbnail | File upload works cleanly with instant preview and remove button | ✅ Passed |
| **Survival Verification** | Status switches to Verified/Pending/Failed, updates audit trail and ward stats | Status updates, audit log entry recorded with date and auditor name | ✅ Passed |
| **Filter & Search** | Filters by status (Verified, Pending, Failed) and search query | Instant client-side filtering without page reloads | ✅ Passed |
| **Bilingual Toggle** | Translates all Member 4 UI text to Telugu (`తెలుగు`) | All badges, headings, buttons, and status labels update instantly | ✅ Passed |
| **Data Reset** | Clears localStorage and re-populates initial 10-ward and sapling benchmarks | `handleClearData` resets both wards and saplings datasets cleanly | ✅ Passed |
