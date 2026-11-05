import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'canopypulse_db.json');

// --- INITIAL 10 VISAKHAPATNAM BENCHMARK WARDS (PLANTATION RECORDS) ---
export const INITIAL_VIZAG_WARDS = [
  { id: 'W65', name: 'Ward 65 Gajuwaka', lst: 38.4, canopy: 6.2, priority: 'High Priority', tagged: 450, survival: 82, sponsor: 'HPCL', lat: 17.6888, lng: 83.2012, description: 'Dense industrial auto hub with high asphalt ratio.' },
  { id: 'W28', name: 'Ward 28 Siripuram', lst: 33.1, canopy: 18.5, priority: 'Low Priority', tagged: 120, survival: 91, sponsor: 'Local NGO', lat: 17.7210, lng: 83.3150, description: 'Commercial center with moderate shade trees.' },
  { id: 'W58', name: 'Ward 58 Autonagar', lst: 39.2, canopy: 4.1, priority: 'High Priority', tagged: 600, survival: 74, sponsor: 'RINL Vizag Steel', lat: 17.6712, lng: 83.1850, description: 'Heavy industrial heavy vehicle corridor.' },
  { id: 'W15', name: 'Ward 15 MVP Colony', lst: 32.5, canopy: 22.0, priority: 'Low Priority', tagged: 200, survival: 88, sponsor: 'Rotary Club', lat: 17.7420, lng: 83.3310, description: 'Residential sector with high citizen canopy.' },
  { id: 'W42', name: 'Ward 42 Jagadamba', lst: 37.8, canopy: 5.0, priority: 'High Priority', tagged: 310, survival: 79, sponsor: 'NTPC Simhadri', lat: 17.7100, lng: 83.3000, description: 'High pedestrian market district with zero tree cover.' },
  { id: 'W60', name: 'Ward 60 Mindi Industrial Zone', lst: 40.1, canopy: 3.2, priority: 'Critical Priority', tagged: 800, survival: 71, sponsor: 'HPCL', lat: 17.6600, lng: 83.1700, description: 'Severe heat island near petroleum refinery boundary.' },
  { id: 'W36', name: 'Ward 36 Akkayyapalem', lst: 35.6, canopy: 11.4, priority: 'Medium Priority', tagged: 180, survival: 85, sponsor: 'Vizag Volunteers', lat: 17.7280, lng: 83.2980, description: 'Mixed residential-commercial transport route.' },
  { id: 'W12', name: 'Ward 12 Pendurthi', lst: 34.2, canopy: 14.8, priority: 'Medium Priority', tagged: 250, survival: 89, sponsor: 'Gangavaram Port', lat: 17.7600, lng: 83.2200, description: 'Suburban transition zone experiencing rapid paving.' },
  { id: 'W48', name: 'Ward 48 Gopalapatnam', lst: 36.1, canopy: 9.3, priority: 'High Priority', tagged: 340, survival: 78, sponsor: 'Vignan Eco Club', lat: 17.7510, lng: 83.2410, description: 'Railway junction belt with high thermal reflection.' },
  { id: 'W04', name: 'Ward 04 Madhurawada', lst: 33.8, canopy: 16.2, priority: 'Low Priority', tagged: 290, survival: 93, sponsor: 'GITAM Eco Club', lat: 17.8180, lng: 83.3420, description: 'IT Hill corridor with ongoing sapling plantation drives.' }
];

// --- SAMPLE BENCHMARK SAPLING RECORDS (REPRESENTING ALL 10 WARDS) ---
export const INITIAL_SAPLINGS = [
  {
    id: 'SAP-VIZ-001',
    ward_id: 'W65',
    species: 'Pongamia pinnata (Pungam)',
    photo_url: '/uploads/sample_pungam_01.jpg',
    latitude: 17.6888,
    longitude: 83.2012,
    gps_accuracy: 3.8,
    survival_status: 'Healthy',
    confidence_score: 0.96,
    action_required: 'Sapling growth on track. Next check in 30 days.',
    audited_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    auditor_name: 'Vizag Volunteer 04'
  },
  {
    id: 'SAP-VIZ-002',
    ward_id: 'W60',
    species: 'Azadirachta indica (Neem)',
    photo_url: '/uploads/sample_neem_01.jpg',
    latitude: 17.6605,
    longitude: 83.1712,
    gps_accuracy: 4.2,
    survival_status: 'Drought Stressed',
    confidence_score: 0.92,
    action_required: 'Immediate deep watering (5L) required. Re-tighten tree guard.',
    audited_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    auditor_name: 'Field Auditor HPCL-CSR'
  },
  {
    id: 'SAP-VIZ-003',
    ward_id: 'W58',
    species: 'Terminalia catappa (Badam)',
    photo_url: '/uploads/sample_badam_01.jpg',
    latitude: 17.6715,
    longitude: 83.1855,
    gps_accuracy: 4.0,
    survival_status: 'Healthy',
    confidence_score: 0.94,
    action_required: 'Add 2L of water and clear surrounding weeds.',
    audited_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    auditor_name: 'RINL Green Corps'
  },
  {
    id: 'SAP-VIZ-004',
    ward_id: 'W28',
    species: 'Azadirachta indica (Neem)',
    photo_url: '/uploads/sample_neem_02.jpg',
    latitude: 17.7214,
    longitude: 83.3152,
    gps_accuracy: 3.5,
    survival_status: 'Healthy',
    confidence_score: 0.98,
    action_required: 'Vigorous leaf growth observed. Tree guard stable.',
    audited_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    auditor_name: 'Siripuram Eco Circle'
  },
  {
    id: 'SAP-VIZ-005',
    ward_id: 'W15',
    species: 'Ficus benghalensis (Banyan)',
    photo_url: '/uploads/sample_banyan_01.jpg',
    latitude: 17.7425,
    longitude: 83.3315,
    gps_accuracy: 3.2,
    survival_status: 'Healthy',
    confidence_score: 0.97,
    action_required: 'Excellent root establishment. Shading radius +1.2m.',
    audited_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    auditor_name: 'Rotary Green Team'
  },
  {
    id: 'SAP-VIZ-006',
    ward_id: 'W42',
    species: 'Pongamia pinnata (Pungam)',
    photo_url: '/uploads/sample_pungam_02.jpg',
    latitude: 17.7105,
    longitude: 83.3005,
    gps_accuracy: 4.5,
    survival_status: 'Needs Tree Guard',
    confidence_score: 0.91,
    action_required: 'Tree guard damaged by pedestrian traffic. Replace bamboo mesh.',
    audited_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    auditor_name: 'NTPC CSR Inspector'
  },
  {
    id: 'SAP-VIZ-007',
    ward_id: 'W36',
    species: 'Terminalia catappa (Badam)',
    photo_url: '/uploads/sample_badam_02.jpg',
    latitude: 17.7285,
    longitude: 83.2985,
    gps_accuracy: 3.9,
    survival_status: 'Healthy',
    confidence_score: 0.95,
    action_required: 'Good leaf moisture retention. Next check in 2 weeks.',
    audited_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    auditor_name: 'Vizag Volunteers Core'
  },
  {
    id: 'SAP-VIZ-008',
    ward_id: 'W12',
    species: 'Casuarina equisetifolia',
    photo_url: '/uploads/sample_casuarina_01.jpg',
    latitude: 17.7605,
    longitude: 83.2205,
    gps_accuracy: 4.1,
    survival_status: 'Healthy',
    confidence_score: 0.93,
    action_required: 'Windbreak foliage dense. Soil aerated successfully.',
    audited_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    auditor_name: 'Gangavaram Coastal Care'
  },
  {
    id: 'SAP-VIZ-009',
    ward_id: 'W48',
    species: 'Azadirachta indica (Neem)',
    photo_url: '/uploads/sample_neem_03.jpg',
    latitude: 17.7515,
    longitude: 83.2415,
    gps_accuracy: 3.7,
    survival_status: 'Drought Stressed',
    confidence_score: 0.89,
    action_required: 'Railway heat radiation causing leaf curl. Add organic mulch.',
    audited_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    auditor_name: 'Vignan Student Eco Club'
  },
  {
    id: 'SAP-VIZ-010',
    ward_id: 'W04',
    species: 'Ficus benghalensis (Banyan)',
    photo_url: '/uploads/sample_banyan_02.jpg',
    latitude: 17.8185,
    longitude: 83.3425,
    gps_accuracy: 3.0,
    survival_status: 'Healthy',
    confidence_score: 0.99,
    action_required: 'Peak healthy canopy development. Regular drip line functioning.',
    audited_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    auditor_name: 'GITAM Tech Campus Corps'
  }
];

class CanopyDatabase {
  constructor() {
    this.data = {
      meta: {
        version: '1.1.0',
        platform: 'CanopyPulse Visakhapatnam CSR Platform',
        initializedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString()
      },
      wards: [],
      saplings: [],
      audit_history: []
    };
    this.ensureStorage();
    this.load();
  }

  ensureStorage() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // If loaded data has few saplings, merge with initial saplings
        if (!this.data.saplings || this.data.saplings.length < INITIAL_SAPLINGS.length) {
          this.seed();
        }
      } else {
        this.seed();
      }
    } catch (err) {
      console.error('[CanopyDatabase] Error reading DB file, reseeding:', err);
      this.seed();
    }
  }

  save() {
    try {
      this.data.meta.lastUpdatedAt = new Date().toISOString();
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
      return true;
    } catch (err) {
      console.error('[CanopyDatabase] Atomic write failed:', err);
      return false;
    }
  }

  seed() {
    this.data.wards = JSON.parse(JSON.stringify(INITIAL_VIZAG_WARDS));
    this.data.saplings = JSON.parse(JSON.stringify(INITIAL_SAPLINGS));
    this.data.audit_history = INITIAL_SAPLINGS.map((s, idx) => ({
      id: `AUD-00${idx + 1}`,
      sapling_id: s.id,
      ward_id: s.ward_id,
      status_before: 'Field Inspection',
      status_after: s.survival_status,
      timestamp: s.audited_at
    }));
    this.save();
    console.log('[CanopyDatabase] Seeded with 10 Vizag wards & 10 benchmark saplings.');
  }

  // --- WARDS / PLANTATION MANAGEMENT ---
  getWards() {
    return this.data.wards;
  }

  getWardById(id) {
    return this.data.wards.find(w => w.id === id) || null;
  }

  updateWard(id, updates) {
    const idx = this.data.wards.findIndex(w => w.id === id);
    if (idx === -1) return null;
    this.data.wards[idx] = { ...this.data.wards[idx], ...updates };
    this.save();
    return this.data.wards[idx];
  }

  // --- SAPLING RECORDS MANAGEMENT ---
  getSaplings(filters = {}) {
    let list = [...this.data.saplings];

    if (filters.ward_id) {
      list = list.filter(s => s.ward_id === filters.ward_id);
    }
    if (filters.survival_status) {
      list = list.filter(s => s.survival_status.toLowerCase() === filters.survival_status.toLowerCase());
    }
    if (filters.species) {
      list = list.filter(s => s.species.toLowerCase().includes(filters.species.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(s => 
        s.id.toLowerCase().includes(q) || 
        s.species.toLowerCase().includes(q) || 
        s.ward_id.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.audited_at) - new Date(a.audited_at));
  }

  getSaplingById(id) {
    return this.data.saplings.find(s => s.id === id) || null;
  }

  createSapling({
    ward_id,
    species,
    photo_base64,
    photo_filename,
    latitude = 17.6868,
    longitude = 83.2185,
    gps_accuracy = 4.0,
    survival_status = 'Healthy',
    confidence_score = 0.95,
    action_required = 'Normal monitoring',
    auditor_name = 'Vizag CSR Volunteer'
  }) {
    // Generate unique ID
    const nextNum = (this.data.saplings.length + 1).toString().padStart(4, '0');
    const saplingId = `SAP-VIZ-${nextNum}`;

    // Handle photo storage
    let photo_url = '/uploads/default_sapling.jpg';
    if (photo_base64) {
      try {
        const cleanBase64 = photo_base64.replace(/^data:image\/\w+;base64,/, '');
        const filename = photo_filename || `${saplingId}_${Date.now()}.jpg`;
        const filePath = path.join(UPLOADS_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(cleanBase64, 'base64'));
        photo_url = `/uploads/${filename}`;
      } catch (err) {
        console.error('[CanopyDatabase] Failed to write photo file:', err);
      }
    }

    const newSapling = {
      id: saplingId,
      ward_id,
      species,
      photo_url,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      gps_accuracy: parseFloat(gps_accuracy),
      survival_status,
      confidence_score: parseFloat(confidence_score),
      action_required,
      audited_at: new Date().toISOString(),
      auditor_name
    };

    this.data.saplings.unshift(newSapling);

    // Update target ward metrics
    const ward = this.getWardById(ward_id);
    if (ward) {
      ward.tagged = (ward.tagged || 0) + 1;
      // Increment survival rate up to 99%
      ward.survival = Math.min(99, (ward.survival || 80) + 1);
    }

    // Record audit log entry
    this.data.audit_history.unshift({
      id: `AUD-${Date.now()}`,
      sapling_id: saplingId,
      ward_id,
      status_before: 'New Audit Logged',
      status_after: survival_status,
      timestamp: new Date().toISOString()
    });

    this.save();
    return newSapling;
  }

  updateSaplingStatus(id, newStatus, action = '') {
    const sapling = this.getSaplingById(id);
    if (!sapling) return null;

    const oldStatus = sapling.survival_status;
    sapling.survival_status = newStatus;
    if (action) sapling.action_required = action;
    sapling.audited_at = new Date().toISOString();

    this.data.audit_history.unshift({
      id: `AUD-${Date.now()}`,
      sapling_id: id,
      ward_id: sapling.ward_id,
      status_before: oldStatus,
      status_after: newStatus,
      timestamp: new Date().toISOString()
    });

    this.save();
    return sapling;
  }

  // --- CSV COMPLIANCE EXPORT GENERATOR ---
  generateCsv() {
    const headers = [
      'Record ID',
      'Ward ID',
      'Ward Name',
      'Species',
      'Latitude',
      'Longitude',
      'GPS Accuracy (m)',
      'Survival Status',
      'AI Confidence (%)',
      'Action Required',
      'CSR Sponsor',
      'Audited Timestamp',
      'Auditor Name'
    ];

    const wardMap = {};
    for (const w of this.data.wards) {
      wardMap[w.id] = w;
    }

    const rows = this.data.saplings.map(s => {
      const ward = wardMap[s.ward_id] || {};
      return [
        s.id,
        s.ward_id,
        `"${(ward.name || '').replace(/"/g, '""')}"`,
        `"${(s.species || '').replace(/"/g, '""')}"`,
        s.latitude,
        s.longitude,
        s.gps_accuracy,
        s.survival_status,
        Math.round((s.confidence_score || 0.95) * 100) + '%',
        `"${(s.action_required || '').replace(/"/g, '""')}"`,
        `"${(ward.sponsor || '').replace(/"/g, '""')}"`,
        s.audited_at,
        `"${(s.auditor_name || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\r\n');
  }

  // --- EXECUTIVE DASHBOARD METRICS ---
  getDashboardStats() {
    const wards = this.data.wards;
    const saplings = this.data.saplings;

    const totalTagged = wards.reduce((sum, w) => sum + (w.tagged || 0), 0);
    const avgSurvival = wards.length 
      ? Math.round(wards.reduce((sum, w) => sum + (w.survival || 0), 0) / wards.length)
      : 84;

    const uniqueSponsors = Array.from(new Set(wards.map(w => w.sponsor).filter(Boolean)));

    return {
      totalTagged,
      overallSurvivalRate: avgSurvival,
      heatMitigatedCelsius: -0.6,
      activeCorporateSponsorsCount: uniqueSponsors.length,
      activeSponsorsList: uniqueSponsors,
      monthlyActiveAuditors: 142,
      sevenDayVerificationRate: 89.4,
      corporatePipelineValueINR: '34.5 Lakhs (Vizag B2B)',
      totalAuditsLogged: saplings.length,
      databaseStatus: 'Online & Persistent (JSON DB)',
      lastUpdated: this.data.meta.lastUpdatedAt
    };
  }

  reset() {
    this.seed();
    return { success: true, message: 'Database reset to initial Visakhapatnam benchmark state.' };
  }
}

export const db = new CanopyDatabase();
export default db;
