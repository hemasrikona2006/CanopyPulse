import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import db from './backend/db.js';
import path from 'node:path';
import fs from 'node:fs';

// Custom Vite plugin to handle /api and /uploads directly during 'npm run dev'
function canopyBackendPlugin() {
  return {
    name: 'canopy-backend-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
        const pathname = url.pathname;

        // Static uploads handler
        if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
          const filename = path.basename(pathname);
          const uploadsDir = path.resolve(__dirname, 'backend', 'uploads');
          const filePath = path.join(uploadsDir, filename);

          if (fs.existsSync(filePath)) {
            const ext = path.extname(filename).toLowerCase();
            const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
            res.setHeader('Content-Type', mime);
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }

        // REST API routes
        if (pathname.startsWith('/api/')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method === 'GET' && pathname === '/api/health') {
            res.end(JSON.stringify({ status: 'online', mode: 'vite-integrated', timestamp: new Date().toISOString() }));
            return;
          }

          if (req.method === 'GET' && pathname === '/api/wards') {
            res.end(JSON.stringify(db.getWards()));
            return;
          }

          if (req.method === 'GET' && pathname.startsWith('/api/wards/')) {
            const id = pathname.replace('/api/wards/', '').trim();
            const ward = db.getWardById(id);
            if (!ward) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Ward not found' }));
              return;
            }
            const saplings = db.getSaplings({ ward_id: id });
            res.end(JSON.stringify({ ...ward, saplings }));
            return;
          }

          if (req.method === 'GET' && pathname === '/api/saplings') {
            const filters = {
              ward_id: url.searchParams.get('ward') || url.searchParams.get('ward_id') || undefined,
              survival_status: url.searchParams.get('status') || undefined,
              species: url.searchParams.get('species') || undefined,
              search: url.searchParams.get('q') || undefined
            };
            const saplings = db.getSaplings(filters);
            res.end(JSON.stringify({ total: saplings.length, data: saplings }));
            return;
          }

          if (req.method === 'GET' && pathname === '/api/dashboard/stats') {
            res.end(JSON.stringify(db.getDashboardStats()));
            return;
          }

          if (req.method === 'POST' && pathname === '/api/reset') {
            res.end(JSON.stringify(db.reset()));
            return;
          }

          // Body collection for POST and PATCH
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            let data = {};
            try { data = JSON.parse(body || '{}'); } catch (e) {}

            if (req.method === 'POST' && pathname === '/api/saplings') {
              const created = db.createSapling(data);
              res.statusCode = 201;
              res.end(JSON.stringify({ success: true, record: created, updatedWard: db.getWardById(data.ward_id) }));
              return;
            }

            if (req.method === 'PATCH' && pathname.startsWith('/api/saplings/') && pathname.endsWith('/status')) {
              const parts = pathname.split('/');
              const id = parts[3];
              const updated = db.updateSaplingStatus(id, data.survival_status, data.action_required);
              if (!updated) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Sapling not found' }));
                return;
              }
              res.end(JSON.stringify({ success: true, record: updated }));
              return;
            }

            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Not found: ${req.method} ${pathname}` }));
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), canopyBackendPlugin()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // If standalone backend is offline, proxy error falls through cleanly
        onError(err, req, res) {
          console.warn('[Vite Proxy] Backend port 5000 not reachable, integrated handler took over.');
        }
      }
    }
  },
});
