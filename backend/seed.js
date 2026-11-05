import db from './db.js';

console.log('[Seeder] Re-initializing CanopyPulse Database for Visakhapatnam...');
const result = db.reset();
console.log('[Seeder]', result.message);

const wards = db.getWards();
const saplings = db.getSaplings();
const stats = db.getDashboardStats();

console.log(`[Seeder] Seeded ${wards.length} Visakhapatnam wards.`);
console.log(`[Seeder] Seeded ${saplings.length} initial sapling audit records.`);
console.log(`[Seeder] Total Tagged: ${stats.totalTagged}, Avg Survival: ${stats.overallSurvivalRate}%, Heat Mitigated: ${stats.heatMitigatedCelsius}°C`);
console.log('[Seeder] Ready for live audits!');
