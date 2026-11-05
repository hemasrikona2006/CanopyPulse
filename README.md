# CanopyPulse
<<<<<<< HEAD
Satellite-driven urban heat mapping and AI-verified sapling survival tracking platform for corporate CSR compliance in Visakhapatnam. Combines Landsat thermal GIS overlays with mobile geotagging and Gemini 1.5 Flash vision inspection to solve urban heat island effects. Built with React, Vite, and Tailwind CSS by Team The Code Crusaders.
=======

**Satellite-driven thermal mapping and verified sapling survival tracking for corporate CSR compliance in Visakhapatnam.**

Built by **THE CODE CRUSADERS**.

---

## 🌟 Overview & Key Features

1. **Visakhapatnam Thermal GIS Overlay (Screen 1):**
   - Ward-by-ward Land Surface Temperature (LST) & canopy cover analytics based on Landsat-9 / Sentinel-2 thermal bands.
   - Interactive SVG map layout with real micro-climate hotspots across 10 key Vizag wards (Gajuwaka, Siripuram, Autonagar, MVP Colony, Jagadamba, Mindi Industrial Zone, Pendurthi, etc.).
   - Live micro-climate profile inspection drawer with CSR sponsor information.

2. **Field Sapling Geotag & AI Audit Logger (Screen 2):**
   - Live sapling camera capture or file dropzone.
   - GPS coordinate and accuracy radius indicator.
   - Ward and native species selection (Pongamia pinnata, Azadirachta indica, etc.).
   - Integrated **Gemini Multimodal Vision AI** inspector (with automatic failover to local engine if no API key is provided).
   - Instant field audit logging to persistent storage.

3. **Corporate CSR Executive Compliance Dashboard (Screen 3):**
   - Key CSR compliance metrics: Total Tagged Saplings, Overall Survival Rate, Estimated Heat Mitigated, and Active Corporate Sponsors.
   - Ecosystem metrics: Monthly Active Auditors (MAAs), 7-Day Verification Rate, and B2B pipeline tracking.
   - Interactive Ward-by-Ward CSR Audit Ledger with real-time text search and priority status filtering.
   - Printable / downloadable **Official CSR Afforestation Compliance Certificate** with QR verification mock.

4. **About & Regional Impact (Screen 4):**
   - Research citations on Vizag's Urban Heat Island effect (+63% built-up concrete growth, +4.8°C LST increase, 45°C+ summer heatwaves, and 70% sapling mortality without tracking).
   - Solution differentiation matrix.
   - Data reset and demo benchmark re-initialization.

5. **Full Bilingual Support:**
   - Instant toggle between **English** and **Telugu (తెలుగు)** across the entire user interface.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running Locally
To start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Building for Production
```bash
npm run build
```
To preview the production build:
```bash
npm run preview
```

---

## 🔑 Gemini AI Configuration (Optional)

The application includes an integrated multimodal inspector:
- **With API Key:** Add your Google Gemini API key to a `.env` file:
  ```env
  VITE_GEMINI_API_KEY=your_gemini_api_key_here
  ```
- **Without API Key:** The application automatically runs a reliable local inspector simulation so that field testing and demos never crash.

---

## 🛠️ Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

>>>>>>> 6613856 (Initial CanoyPulse prototype upload)
