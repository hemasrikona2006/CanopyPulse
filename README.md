# CanopyPulse

**Satellite-driven thermal mapping and AI-verified sapling survival tracking platform for corporate CSR compliance in Visakhapatnam.**

Built with ❤️ by **THE CODE CRUSADERS**.

---

## 🌟 Overview & Key Features

1. **Visakhapatnam Thermal GIS Overlay (Screen 1):**
   - Ward-by-ward Land Surface Temperature (LST) & canopy cover analytics based on Landsat-9 / Sentinel-2 thermal bands.
   - Interactive SVG map layout with real micro-climate hotspots across 10 key Vizag wards (Gajuwaka, Siripuram, Autonagar, MVP Colony, Jagadamba, Mindi Industrial Zone, Pendurthi, etc.).
   - Live micro-climate profile inspection drawer with CSR sponsor information.

2. **Field Sapling Geotag & AI Audit Logger (Screen 2):**
   - Live sapling camera capture or file dropzone.
   - GPS coordinate and accuracy radius indicator (±4m).
   - Ward and native species selection (Pongamia pinnata, Azadirachta indica, etc.).
   - Integrated **Gemini Multimodal Vision AI** inspector (with automatic failover to local engine if no API key is provided).
   - Instant field audit logging to persistent database.

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

6. **Backend & Database Management (Member 3):**
   - Node.js REST API service with persistent database storage in `backend/`.
   - Managing plantation records, individual sapling records, GPS coordinates, photo references, and survival statuses.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application

1. **Start the Backend API Server:**
   ```bash
   npm run server
   ```
   Server runs at `http://localhost:5000`.

2. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

*(Note: During `npm run dev`, Vite also has an integrated backend fallback middleware so `/api` endpoints respond even if the standalone backend server is not running!)*

### Reseeding Demo Benchmark Data
To reset the database to the 10-ward Visakhapatnam benchmark state:
```bash
npm run seed
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
- **Frontend Framework:** React 18
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend & Database:** Node.js, Express, Persistent File/JSON Database
- **AI Vision:** Google Gemini 1.5 Flash (with smart fallback)
