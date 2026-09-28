/**
 * SIF Safety Intelligence System — Analytics Utilities
 * Supplementary data processing helpers for the SIF dashboard.
 * These functions are available for use by the main app.js module.
 *
 * In production, these would call the FastAPI backend:
 *   GET /api/analytics/summary
 *   GET /api/analytics/trends
 *   GET /api/analytics/departments
 */

// ── Dashboard KPI Summary ─────────────────────────────────────
const analyticsData = {
  summary: {
    totalReports: 248,
    sifDetected: 37,
    highRisk: 18,
    mediumRisk: 76,
    lowRisk: 154,
    pendingReviews: 12
  },

  monthlyTrend: [
    { month: 'Mar 2026', total: 18, sif: 3, unsafeAct: 7, unsafeCondition: 8, nearMiss: 3 },
    { month: 'Apr 2026', total: 21, sif: 5, unsafeAct: 9, unsafeCondition: 9, nearMiss: 3 },
    { month: 'May 2026', total: 26, sif: 4, unsafeAct: 10, unsafeCondition: 11, nearMiss: 5 },
    { month: 'Jun 2026', total: 24, sif: 6, unsafeAct: 9, unsafeCondition: 10, nearMiss: 5 },
    { month: 'Jul 2026', total: 29, sif: 7, unsafeAct: 11, unsafeCondition: 12, nearMiss: 6 },
    { month: 'Aug 2026', total: 31, sif: 5, unsafeAct: 12, unsafeCondition: 13, nearMiss: 6 },
    { month: 'Sep 2026', total: 34, sif: 7, unsafeAct: 13, unsafeCondition: 14, nearMiss: 7 }
  ],

  byDepartment: [
    { name: 'Drilling Operations', total: 52, sif: 12, high: 8 },
    { name: 'Process Operations', total: 38, sif: 7, high: 5 },
    { name: 'Pipeline Operations', total: 31, sif: 5, high: 4 },
    { name: 'Offshore Operations', total: 29, sif: 6, high: 5 },
    { name: 'Maintenance', total: 44, sif: 4, high: 3 },
    { name: 'HSE', total: 21, sif: 2, high: 1 },
    { name: 'Logistics', total: 23, sif: 3, high: 2 },
    { name: 'Gas Operations', total: 19, sif: 4, high: 3 },
    { name: 'Storage Operations', total: 16, sif: 2, high: 2 },
    { name: 'Administration', total: 11, sif: 0, high: 0 }
  ],

  byLocation: [
    { name: 'Drilling Platforms', total: 62, sif: 14 },
    { name: 'Refinery Units', total: 48, sif: 9 },
    { name: 'Pipeline Stations', total: 39, sif: 5 },
    { name: 'Tank Farms', total: 35, sif: 4 },
    { name: 'Wellsites', total: 43, sif: 6 },
    { name: 'Offshore Platforms', total: 27, sif: 8 },
    { name: 'Logistics Yard', total: 31, sif: 3 },
    { name: 'Gas Compression Stations', total: 19, sif: 4 },
    { name: 'Admin Block', total: 11, sif: 0 }
  ],

  sifIndicators: {
    'Working at Height': 42,
    'Hazardous Energy': 35,
    'Vehicle Interaction': 31,
    'Confined Space': 28,
    'PPE Failure': 38,
    'Fire / Explosion': 19,
    'Unsafe Access': 45,
    'Electrical Hazard': 22,
    'Chemical Exposure': 16,
    'Line of Fire': 27,
    'Lifting Operations': 24,
    'Equipment Failure': 33
  }
};

// ── Utility Functions ─────────────────────────────────────────

/**
 * Calculate risk score from factors
 * @param {object} factors - { severity, exposure, likelihood, controlEffectiveness }
 * @returns {number} Risk score 0-10
 */
function calculateRiskScore(factors) {
  const severityMap = { Critical: 4, High: 3, Medium: 2, Low: 1 };
  const likelyhoodMap = { High: 3, Medium: 2, Low: 1 };
  const controlMap = { Low: 1.5, Medium: 1.0, High: 0.7 };

  const s = severityMap[factors.severity] || 2;
  const e = severityMap[factors.exposure] || 2;
  const l = likelyhoodMap[factors.likelihood] || 2;
  const c = controlMap[factors.controlEffectiveness] || 1.0;

  return Math.min(10, ((s * e * l * c) / 4.8 * 10) / 10).toFixed(1);
}

/**
 * Determine SIF precursor risk level from score
 * @param {number} score
 * @returns {string} CRITICAL | HIGH | MEDIUM | LOW
 */
function getRiskLevel(score) {
  if (score >= 9) return 'CRITICAL';
  if (score >= 7) return 'HIGH';
  if (score >= 4) return 'MEDIUM';
  return 'LOW';
}

/**
 * Filter reports by date range
 * @param {Array} reports
 * @param {string} range - 'today' | '7d' | '30d' | '3m' | '1y'
 */
function filterByDateRange(reports, range) {
  const now = new Date();
  const cutoff = new Date();
  switch (range) {
    case 'today': cutoff.setHours(0, 0, 0, 0); break;
    case '7d': cutoff.setDate(now.getDate() - 7); break;
    case '30d': cutoff.setDate(now.getDate() - 30); break;
    case '3m': cutoff.setMonth(now.getMonth() - 3); break;
    case '1y': cutoff.setFullYear(now.getFullYear() - 1); break;
    default: return reports;
  }
  return reports.filter(r => new Date(r.date) >= cutoff);
}

/**
 * Aggregate SIF indicators from a list of reports
 * @param {Array} reports
 * @returns {object} indicator -> count mapping
 */
function aggregateSIFIndicators(reports) {
  return reports.reduce((acc, r) => {
    (r.indicators || []).forEach(ind => { acc[ind] = (acc[ind] || 0) + 1; });
    return acc;
  }, {});
}

// Export for use in app
if (typeof window !== 'undefined') {
  window.sifAnalytics = { analyticsData, calculateRiskScore, getRiskLevel, filterByDateRange, aggregateSIFIndicators };
}
