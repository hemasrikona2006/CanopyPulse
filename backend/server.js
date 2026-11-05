import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db, { getRecommendedSpeciesForWard } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PORT = process.env.PORT || 5000;

// Set standard CORS and JSON headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Pure Node.js HTTP Server (Works 100% out-of-the-box with zero npm install dependencies!)
const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Serve static uploaded photos: /uploads/<filename>
  if (method === 'GET' && pathname.startsWith('/uploads/')) {
    const filename = path.basename(pathname);
    const filePath = path.join(UPLOADS_DIR, filename);

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase();
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp'
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      sendJson(res, 404, { error: 'Photo not found' });
      return;
    }
  }

  // --- API ROUTING ---

  // Root landing page: GET /
  if (method === 'GET' && (pathname === '/' || pathname === '')) {
    const stats = db.getDashboardStats();
    const wards = db.getWards();

    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CanopyPulse • Backend & Database Console</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 2rem; }
    .container { max-width: 880px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(52, 211, 153, 0.3); }
    .pulse { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    h1 { color: #fff; margin: 0.8rem 0 0.3rem 0; font-size: 1.75rem; }
    p.sub { color: #94a3b8; margin: 0 0 1.5rem 0; font-size: 0.9rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .card { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 1rem; }
    .card .val { font-size: 1.4rem; font-weight: 800; color: #10b981; }
    .card .lbl { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    h2 { font-size: 1.1rem; color: #cbd5e1; margin-top: 1.5rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0; border-bottom: 1px solid #1e293b; font-size: 0.85rem; }
    a.endpoint { font-family: monospace; font-size: 0.82rem; color: #38bdf8; text-decoration: none; background: #0f172a; padding: 4px 10px; border-radius: 6px; border: 1px solid #334155; }
    a.endpoint:hover { background: #1e293b; border-color: #38bdf8; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: #059669; color: #fff; text-decoration: none; font-weight: 700; padding: 10px 18px; border-radius: 10px; margin-top: 1.5rem; font-size: 0.9rem; }
    .btn:hover { background: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge"><span class="pulse"></span> Member 3 • Backend & Database Online</div>
    <h1>🌿 CanopyPulse REST API & Database Console</h1>
    <p class="sub">Visakhapatnam Satellite GIS Urban Forestry, Pit Hole Detection & CSR Platform</p>

    <div class="grid">
      <div class="card"><div class="lbl">Tagged Saplings</div><div class="val">${stats.totalTagged}</div></div>
      <div class="card"><div class="lbl">Avg Survival Rate</div><div class="val">${stats.overallSurvivalRate}%</div></div>
      <div class="card"><div class="lbl">Ready Pit Holes</div><div class="val">${stats.availablePitsCount} Pits</div></div>
      <div class="card"><div class="lbl">Target Wards</div><div class="val">${wards.length} Wards</div></div>
    </div>

    <h2>📡 Verified REST API Endpoints (Member 3)</h2>
    <ul>
      <li><span>Health & Diagnostic Check</span> <a class="endpoint" href="/api/health" target="_blank">GET /api/health</a></li>
      <li><span>Visakhapatnam 10 Wards Micro-Climate Data</span> <a class="endpoint" href="/api/wards" target="_blank">GET /api/wards</a></li>
      <li><span>Individual Saplings with Growth & Health Data</span> <a class="endpoint" href="/api/saplings" target="_blank">GET /api/saplings</a></li>
      <li><span>Planting Pit Holes (Detection & Community Planting)</span> <a class="endpoint" href="/api/pits" target="_blank">GET /api/pits</a></li>
      <li><span>Live Community Care & Watering Alerts</span> <a class="endpoint" href="/api/alerts" target="_blank">GET /api/alerts</a></li>
      <li><span>Native Species Recommendation by Ward LST</span> <a class="endpoint" href="/api/recommendations/W65" target="_blank">GET /api/recommendations/W65</a></li>
      <li><span>Executive Corporate CSR Dashboard Metrics</span> <a class="endpoint" href="/api/dashboard/stats" target="_blank">GET /api/dashboard/stats</a></li>
      <li><span>Official CSR Compliance CSV Export</span> <a class="endpoint" href="/api/export/csv" target="_blank">📥 GET /api/export/csv</a></li>
    </ul>

    <a class="btn" href="http://localhost:3000" target="_blank">🚀 Open CanopyPulse React Web Application</a>
  </div>
</body>
</html>`);
      return;
    }

    sendJson(res, 200, {
      service: 'CanopyPulse Backend & Database',
      role: 'Member 3 – Backend & Database',
      status: 'online',
      message: 'CanopyPulse API is live and serving data for Visakhapatnam.',
      endpoints: {
        health: '/api/health',
        wards: '/api/wards',
        saplings: '/api/saplings',
        pits: '/api/pits',
        alerts: '/api/alerts',
        speciesRecommendation: '/api/recommendations/:wardId',
        dashboardStats: '/api/dashboard/stats',
        csvExport: '/api/export/csv'
      },
      stats: stats,
      frontendUrl: 'http://localhost:3000'
    });
    return;
  }

  // Health check
  if (method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, {
      status: 'online',
      service: 'CanopyPulse Backend & Database',
      platform: 'Visakhapatnam CSR Forestry Audit',
      timestamp: new Date().toISOString()
    });
    return;
  }

  // GET /api/export/csv -> Download Official CSR Compliance CSV Ledger
  if (method === 'GET' && pathname === '/api/export/csv') {
    const csv = db.generateCsv();
    setCorsHeaders(res);
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="CanopyPulse_Vizag_CSR_Audit_Ledger.csv"'
    });
    res.end(csv);
    return;
  }

  // GET /api/wards -> List all 10 Vizag wards
  if (method === 'GET' && pathname === '/api/wards') {
    const wards = db.getWards();
    sendJson(res, 200, wards);
    return;
  }

  // GET /api/wards/:id -> Get single ward and its saplings
  if (method === 'GET' && pathname.startsWith('/api/wards/')) {
    const wardId = pathname.replace('/api/wards/', '').trim();
    const ward = db.getWardById(wardId);
    if (!ward) {
      sendJson(res, 404, { error: `Ward with ID ${wardId} not found` });
      return;
    }
    const saplings = db.getSaplings({ ward_id: wardId });
    sendJson(res, 200, { ...ward, saplings });
    return;
  }

  // GET /api/saplings -> List saplings with optional query filtering
  if (method === 'GET' && pathname === '/api/saplings') {
    const filters = {
      ward_id: parsedUrl.searchParams.get('ward') || parsedUrl.searchParams.get('ward_id') || undefined,
      survival_status: parsedUrl.searchParams.get('status') || undefined,
      species: parsedUrl.searchParams.get('species') || undefined,
      search: parsedUrl.searchParams.get('q') || undefined
    };
    const saplings = db.getSaplings(filters);
    sendJson(res, 200, {
      total: saplings.length,
      filtersApplied: filters,
      data: saplings
    });
    return;
  }

  // GET /api/saplings/:id -> Single sapling
  if (method === 'GET' && pathname.startsWith('/api/saplings/')) {
    const saplingId = pathname.replace('/api/saplings/', '').trim();
    const sapling = db.getSaplingById(saplingId);
    if (!sapling) {
      sendJson(res, 404, { error: `Sapling record with ID ${saplingId} not found` });
      return;
    }
    sendJson(res, 200, sapling);
    return;
  }

  // GET /api/pits -> List all detected planting pit holes
  if (method === 'GET' && pathname === '/api/pits') {
    const wardId = parsedUrl.searchParams.get('ward') || parsedUrl.searchParams.get('ward_id') || null;
    const pits = db.getPits(wardId);
    sendJson(res, 200, {
      total: pits.length,
      readyCount: pits.filter(p => p.status === 'Ready for Planting').length,
      data: pits
    });
    return;
  }

  // GET /api/pits/:id -> Single pit hole details
  if (method === 'GET' && pathname.startsWith('/api/pits/')) {
    const pitId = pathname.replace('/api/pits/', '').trim();
    const pit = db.getPits().find(p => p.id === pitId);
    if (!pit) {
      sendJson(res, 404, { error: `Pit ${pitId} not found.` });
      return;
    }
    sendJson(res, 200, pit);
    return;
  }

  // GET /api/alerts -> Live community care and watering alerts
  if (method === 'GET' && pathname === '/api/alerts') {
    const alerts = db.getCommunityAlerts();
    sendJson(res, 200, {
      totalAlerts: alerts.length,
      wateringCriticalCount: alerts.filter(a => a.type === 'WATERING_CRITICAL').length,
      guardRepairCount: alerts.filter(a => a.type === 'TREE_GUARD_REPAIR').length,
      data: alerts
    });
    return;
  }

  // GET /api/recommendations/:wardId -> Get AI micro-climate native species recommendation
  if (method === 'GET' && pathname.startsWith('/api/recommendations/')) {
    const wardId = pathname.replace('/api/recommendations/', '').trim();
    const ward = db.getWardById(wardId);
    if (!ward) {
      sendJson(res, 404, { error: `Ward ${wardId} not found` });
      return;
    }
    const reco = getRecommendedSpeciesForWard(wardId, ward.lst);
    sendJson(res, 200, {
      ward_id: wardId,
      ward_name: ward.name,
      surface_temperature_lst: ward.lst,
      canopy_cover: ward.canopy,
      priority: ward.priority,
      recommended_species: reco.species,
      alternative_species: reco.secondary,
      climate_reasoning: reco.reasoning
    });
    return;
  }

  // GET /api/dashboard/stats -> Executive CSR statistics
  if (method === 'GET' && pathname === '/api/dashboard/stats') {
    const stats = db.getDashboardStats();
    sendJson(res, 200, stats);
    return;
  }

  // POST /api/reset -> Reseed database
  if (method === 'POST' && pathname === '/api/reset') {
    const result = db.reset();
    sendJson(res, 200, result);
    return;
  }

  // Read request body for POST & PATCH
  let bodyBuffer = '';
  req.on('data', chunk => {
    bodyBuffer += chunk;
    if (bodyBuffer.length > 15 * 1024 * 1024) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Payload too large' }));
      req.destroy();
    }
  });

  req.on('end', () => {
    let payload = {};
    if (bodyBuffer) {
      try {
        payload = JSON.parse(bodyBuffer);
      } catch (err) {
        sendJson(res, 400, { error: 'Invalid JSON body format' });
        return;
      }
    }

    // POST /api/saplings -> Create and store new sapling record (with growth tracking)
    if (method === 'POST' && pathname === '/api/saplings') {
      const { ward_id, species, photo_base64, photo_filename, latitude, longitude, gps_accuracy, survival_status, growth_stage, canopy_spread_ft, confidence_score, action_required, auditor_name } = payload;

      if (!ward_id || !species) {
        sendJson(res, 400, { error: 'Missing required fields: ward_id and species are mandatory.' });
        return;
      }

      const created = db.createSapling({
        ward_id,
        species,
        photo_base64,
        photo_filename,
        latitude,
        longitude,
        gps_accuracy,
        survival_status,
        growth_stage,
        canopy_spread_ft,
        confidence_score,
        action_required,
        auditor_name
      });

      sendJson(res, 201, {
        success: true,
        message: 'Sapling record successfully created and stored in database.',
        record: created,
        updatedWard: db.getWardById(ward_id)
      });
      return;
    }

    // POST /api/pits -> Register newly detected pit hole from field scan
    if (method === 'POST' && pathname === '/api/pits') {
      const { ward_id, latitude, longitude, depth_cm, width_cm, soil_condition, suggested_species, species_reasoning } = payload;

      if (!ward_id) {
        sendJson(res, 400, { error: 'ward_id is required.' });
        return;
      }

      const newPit = db.createPit({
        ward_id,
        latitude,
        longitude,
        depth_cm,
        width_cm,
        soil_condition,
        suggested_species,
        species_reasoning
      });

      sendJson(res, 201, {
        success: true,
        message: 'Planting pit hole successfully registered and open for community planting.',
        pit: newPit
      });
      return;
    }

    // POST /api/pits/:id/plant -> Community member plants tree in pit
    if (method === 'POST' && pathname.startsWith('/api/pits/') && pathname.endsWith('/plant')) {
      const parts = pathname.split('/');
      const pitId = parts[3];
      const { species, citizen_name, photo_base64 } = payload;

      const result = db.plantPit(pitId, { species, citizen_name, photo_base64 });
      if (!result) {
        sendJson(res, 404, { error: `Pit ${pitId} not found.` });
        return;
      }

      sendJson(res, 201, {
        success: true,
        message: `Tree planted in pit ${pitId} by community member ${citizen_name || 'Volunteer'}.`,
        ...result
      });
      return;
    }

    // POST /api/saplings/:id/water -> Community watering action
    if (method === 'POST' && pathname.startsWith('/api/saplings/') && pathname.endsWith('/water')) {
      const parts = pathname.split('/');
      const saplingId = parts[3];
      const { citizen_name, liters } = payload;

      const result = db.waterSapling(saplingId, citizen_name || 'Community Volunteer', liters || 3);
      if (!result) {
        sendJson(res, 404, { error: `Sapling ${saplingId} not found.` });
        return;
      }

      sendJson(res, 200, {
        success: true,
        message: `Sapling ${saplingId} watered with ${liters || 3}L by ${citizen_name || 'Community Volunteer'}. Status updated to Healthy.`,
        ...result
      });
      return;
    }

    // PATCH /api/saplings/:id/status -> Update survival status
    if (method === 'PATCH' && pathname.startsWith('/api/saplings/') && pathname.endsWith('/status')) {
      const parts = pathname.split('/');
      const saplingId = parts[3];
      const { survival_status, action_required } = payload;

      if (!survival_status) {
        sendJson(res, 400, { error: 'survival_status is required in body.' });
        return;
      }

      const updated = db.updateSaplingStatus(saplingId, survival_status, action_required);
      if (!updated) {
        sendJson(res, 404, { error: `Sapling ${saplingId} not found.` });
        return;
      }

      sendJson(res, 200, {
        success: true,
        message: `Sapling ${saplingId} status updated to ${survival_status}.`,
        record: updated
      });
      return;
    }

    // Fallback 404
    sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found.` });
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌿 CanopyPulse Backend & Database Service Online`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`📍 API Endpoints:`);
  console.log(`   - GET   http://localhost:${PORT}/api/health`);
  console.log(`   - GET   http://localhost:${PORT}/api/wards`);
  console.log(`   - GET   http://localhost:${PORT}/api/saplings`);
  console.log(`   - GET   http://localhost:${PORT}/api/pits`);
  console.log(`   - POST  http://localhost:${PORT}/api/pits`);
  console.log(`   - POST  http://localhost:${PORT}/api/pits/:id/plant`);
  console.log(`   - GET   http://localhost:${PORT}/api/alerts`);
  console.log(`   - POST  http://localhost:${PORT}/api/saplings/:id/water`);
  console.log(`   - GET   http://localhost:${PORT}/api/recommendations/:wardId`);
  console.log(`   - GET   http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`   - GET   http://localhost:${PORT}/api/export/csv`);
  console.log(`====================================================`);
});

export default server;
