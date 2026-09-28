# SIF Safety Intelligence System

> **Smart India Hackathon 2026** | Problem ID: **SIH26165**
> Theme: Smart Automation | Category: Software

---

## 🛡️ Overview

The **SIF Safety Intelligence System** is an AI/NLP-powered web prototype that enables safety officers at OIL India Limited to:

- Submit Unsafe Act, Unsafe Condition, and Near-Miss reports
- Automatically detect **Serious Injury & Fatality (SIF) precursors** using NLP
- Classify risk levels (Critical / High / Medium / Low)
- View AI confidence scores, detected indicators, and recommended preventive actions
- Monitor safety analytics and trends via interactive dashboards

---

## 🚀 Quick Start (No Install Required)

This prototype uses **React 18 via CDN** — no `npm install` or build step needed.

### Steps:
1. Open **`index.html`** in a modern web browser (Chrome, Edge, Firefox)
2. Use the demo credentials on the login page:
   - **Email:** `demo`
   - **Password:** `demo`
   - Or: `officer@oil.co.in` / `oil@2026`
3. Navigate through all pages using the sidebar

> **Note:** For full Chart.js functionality, serve via a local HTTP server:
> ```
> python -m http.server 3000
> ```
> Then open: `http://localhost:3000`

---

## 📁 Project Structure

```
SIH PROJECT/
├── index.html        # Entry point — React 18 CDN, Chart.js, Font Awesome
├── style.css         # Full design system — dark navy theme, responsive
├── app.js            # Main React application — all pages & components
├── analytics.js      # Analytics utility functions & data helpers
└── README.md         # This file
```

---

## 🗂️ Application Pages

| Page | Description |
|------|-------------|
| **Login** | Professional login with demo credentials |
| **Dashboard** | Summary KPIs, 4 charts, recent reports table |
| **Submit Report** | Full incident report form with AI analysis trigger |
| **AI Analysis** | NLP results, SIF indicators, risk assessment |
| **Reports** | Searchable & filterable report management table |
| **Risk Monitoring** | Real-time-style alert cards by severity |
| **Analytics** | 6 interactive Chart.js visualizations |
| **SIF Categories** | 12 SIF precursor category cards |
| **Recommendations** | AI-generated action management with tabs |
| **Report Details** | Full report view with review history |
| **Settings** | System configuration with toggle switches |

---

## 🤖 AI/NLP Integration (Backend-Ready)

The frontend is structured for **FastAPI backend replacement**.

### Current Prototype Behavior:
- Analyzes keyword patterns in report description
- Returns dummy analysis after a simulated 2.8s delay
- Displays realistic SIF indicators, confidence scores, and recommendations

### Production API Replacement:

In `app.js`, locate the `apiService.analyzeReport()` function and replace:

```javascript
// REPLACE THIS (prototype dummy):
await new Promise(r => setTimeout(r, 2800));
return { sif_detected: true, risk_level: "HIGH", ... };

// WITH THIS (real FastAPI call):
return fetch(`${API_BASE}/analyze`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(reportData)
}).then(r => r.json());
```

### Expected FastAPI Request/Response:

**POST** `/api/analyze`
```json
{
  "report_type": "Near Miss",
  "description": "Worker entered restricted area without PPE",
  "location": "Drilling Platform B-7",
  "department": "Drilling Operations"
}
```

**Response:**
```json
{
  "sif_detected": true,
  "risk_level": "HIGH",
  "confidence": 0.92,
  "indicators": ["PPE Failure", "Unsafe Access", "Working at Height"],
  "recommendations": ["Ensure PPE compliance", "Restrict unauthorized access"],
  "nlp_entities": {
    "keywords": ["restricted area", "PPE", "maintenance"],
    "risk_indicators": ["Height Risk", "PPE Non-compliance"]
  },
  "risk_factors": {
    "severity": "High",
    "exposure": "High",
    "likelihood": "Medium",
    "controlEffectiveness": "Low",
    "score": 8.7
  }
}
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary bg | `#040d1a` (deep navy) |
| Card bg | `rgba(13,32,68,0.8)` |
| Accent | `#1e90ff` (electric blue) |
| Critical | `#ff1744` (red) |
| High Risk | `#ff6d00` (orange) |
| Medium Risk | `#ffab00` (amber) |
| Low Risk | `#00c853` (green) |
| Font | Inter (Google Fonts) |

---

## 📊 Sample Data

Includes **11 realistic safety reports** covering:
- Working at Height + PPE failure
- Energy isolation (LOTO) bypass
- Confined space entry without gas testing
- Gas leak near ignition source
- Vehicle-pedestrian near miss
- Electrical hazard (exposed wiring)
- Chemical handling without PPE
- Crane / lifting operations safety
- Scaffolding certification expiry
- High pressure equipment failure
- General access / housekeeping

---

## 🔌 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (CDN), JavaScript ES6+, HTML5 |
| Styling | Vanilla CSS3 with CSS Custom Properties |
| Charts | Chart.js 4.4 (CDN) |
| Icons | Font Awesome 6.5 (CDN) |
| Fonts | Google Fonts — Inter, JetBrains Mono |
| AI Backend (planned) | FastAPI (Python) |
| Database (planned) | PostgreSQL |
| NLP/ML (planned) | Python — spaCy / HuggingFace Transformers |

---

## ⚠️ Prototype Notice

> This is a **hackathon prototype demonstration**.
> All AI analysis results shown are **sample/dummy data** for demonstration purposes.
> The NLP backend is not yet connected.
> Risk scores, confidence values, and SIF detection results are illustrative only.

---

## 👥 Team

**Smart India Hackathon 2026** | SIH26165
OIL India Limited — HSE Division
AI/NLP Engine for SIF Precursor Detection
