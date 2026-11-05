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
