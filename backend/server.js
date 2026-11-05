import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './db.js';

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
    .container { max-width: 860px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(52, 211, 153, 0.3); }
    .pulse { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    h1 { color: #fff; margin: 0.8rem 0 0.3rem 0; font-size: 1.75rem; }
    p.sub { color: #94a3b8; margin: 0 0 1.5rem 0; font-size: 0.9rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .card { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 1rem; }
    .card .val { font-size: 1.5rem; font-weight: 800; color: #10b981; }
    .card .lbl { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    h2 { font-size: 1.1rem; color: #cbd5e1; margin-top: 1.5rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #1e293b; font-size: 0.85rem; }
    a.endpoint { font-family: monospace; font-size: 0.85rem; color: #38bdf8; text-decoration: none; background: #0f172a; padding: 4px 10px; border-radius: 6px; border: 1px solid #334155; }
    a.endpoint:hover { background: #1e293b; border-color: #38bdf8; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: #059669; color: #fff; text-decoration: none; font-weight: 700; padding: 10px 18px; border-radius: 10px; margin-top: 1.5rem; font-size: 0.9rem; }
    .btn:hover { background: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge"><span class="pulse"></span> Member 3 • Backend & Database Online</div>
    <h1>🌿 CanopyPulse REST API & Database Console</h1>
    <p class="sub">Visakhapatnam Satellite GIS Urban Forestry & CSR Compliance Service</p>

    <div class="grid">
      <div class="card"><div class="lbl">Tagged Saplings</div><div class="val">\${stats.totalTagged}</div></div>
      <div class="card"><div class="lbl">Avg Survival Rate</div><div class="val">\${stats.overallSurvivalRate}%</div></div>
      <div class="card"><div class="lbl">Target Wards</div><div class="val">\${wards.length} Wards</div></div>
      <div class="card"><div class="lbl">CSR Sponsors</div><div class="val">\${stats.activeCorporateSponsorsCount} Industry</div></div>
    </div>

    <h2>📡 Verified REST API Endpoints</h2>
    <ul>
      <li><span>Health & Diagnostic Check</span> <a class="endpoint" href="/api/health" target="_blank">GET /api/health</a></li>
      <li><span>Visakhapatnam 10 Wards GIS & Micro-Climate Data</span> <a class="endpoint" href="/api/wards" target="_blank">GET /api/wards</a></li>
      <li><span>Individual Sapling Audit Records & Geotags</span> <a class="endpoint" href="/api/saplings" target="_blank">GET /api/saplings</a></li>
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
        dashboardStats: '/api/dashboard/stats'
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
    // Protect against payloads larger than 15MB
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

    // POST /api/saplings -> Create and store new sapling record
    if (method === 'POST' && pathname === '/api/saplings') {
      const { ward_id, species, photo_base64, photo_filename, latitude, longitude, gps_accuracy, survival_status, confidence_score, action_required, auditor_name } = payload;

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

    // PATCH /api/saplings/:id/status -> Update survival status
    if (method === 'PATCH' && pathname.startsWith('/api/saplings/') && pathname.endsWith('/status')) {
      const parts = pathname.split('/');
      const saplingId = parts[3]; // /api/saplings/:id/status
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
  console.log(`   - POST  http://localhost:${PORT}/api/saplings`);
  console.log(`   - PATCH http://localhost:${PORT}/api/saplings/:id/status`);
  console.log(`   - GET   http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`====================================================`);
});

export default server;
