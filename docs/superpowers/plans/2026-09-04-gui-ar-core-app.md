# Gui-Ar Core Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Gui-Ar mobile-first clinical decision support PWA in React + TypeScript + Tailwind CSS, featuring the 4 airway tracks (Crash, SRI, DSI/KOBE, Awake), rapid triage decision engine, weight-based pharmacology calculator (mg & mL), interactive 7 Ps checklist, and emergency rescue protocol.

**Architecture:** A lightweight, offline-first Single Page Application (SPA) built with Vite and React 19. Pure TypeScript domain engines (`triageEngine`, `drugCalculator`) encapsulate clinical decision trees and dose arithmetic under full unit test coverage with Vitest. React Context provides persistent state (weight, clinical conditions, checklist progress) with local storage sync. Tailwind CSS implements the custom medical blue theme and responsive mobile ergonomics.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Vitest.

## Global Constraints

- Mobile-first layout with minimum touch targets of 48px.
- Hospital clinical blue palette (`#1E3A8A` primary navy, `#0284C7` sky accent, `#F8FAFC` light surface, `#0F172A` dark slate).
- 100% offline-ready client-side execution.
- Drug calculations must output both **mg** and **volume in mL** based on standard Brazilian SUS/SAMU ampoules.
- Emergency SOS button must remain visible at all times in the header.

---

### Task 1: Project Scaffolding & Design System Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

**Interfaces:**
- Produces: Running Vite dev environment, Tailwind CSS with custom medical blue color tokens, Vitest configuration.

- [ ] **Step 1: Create package.json with dependencies**

```json
{
  "name": "gui-ar-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vite": "^6.0.11",
    "vitest": "^3.0.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: Packages installed successfully.

- [ ] **Step 3: Configure Vite, TypeScript, and PostCSS**

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

Create `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 4: Configure Tailwind with the Medical Blue Design System**

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1329',
          800: '#0F172A',
          700: '#1E293B',
          600: '#1E3A8A',
          500: '#1E40AF',
        },
        sky: {
          500: '#0284C7',
          400: '#38BDF8',
          300: '#7DD3FC',
        },
        emergency: '#DC2626',
        warning: '#D97706',
        success: '#16A34A',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Create index.html, index.css, App.tsx, and main.tsx**

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 antialiased dark:bg-navy-900 dark:text-slate-100;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
}
```

Create `index.html`:
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#1E3A8A" />
    <meta name="description" content="Gui-Ar - Apoio à decisão clínica para manejo da via aérea em urgência e emergência" />
    <title>Gui-Ar | Manejo da Via Aérea</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-slate-100 p-4">
      <h1 className="text-2xl font-bold text-navy-600 dark:text-sky-400">Gui-Ar</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">Apoio à Decisão Clínica em Via Aérea</p>
    </div>
  );
}
```

Create `src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 6: Verify build and test script**

Run: `npm run build`
Expected: TypeScript compile and Vite build succeed without error.

- [ ] **Step 7: Commit Task 1**

```bash
git add .
git commit -m "feat: scaffold React+TS+Vite project with clinical blue Tailwind theme"
```

---

### Task 2: Clinical Data Models & Calculation Engines with Tests (TDD)

**Files:**
- Create: `src/types/clinical.ts`
- Create: `src/data/drugs.ts`
- Create: `src/engines/drugCalculator.ts`
- Create: `src/engines/triageEngine.ts`
- Create: `src/test/drugCalculator.test.ts`
- Create: `src/test/triageEngine.test.ts`

**Interfaces:**
- Produces:
  - `calculateDrugDose(drugId: string, weightKg: number, conditions: ClinicalConditions): CalculatedDose`
  - `runTriage(answers: TriageAnswers): TriageResult`
  - Types: `TrackType`, `ClinicalConditions`, `CalculatedDose`, `TriageAnswers`

- [ ] **Step 1: Define Clinical Types (`src/types/clinical.ts`)**

```typescript
export type TrackType = 'CRASH' | 'SRI' | 'DSI' | 'AWAKE';

export interface ClinicalConditions {
  isShock: boolean;
  isTBI: boolean;
  isBronchospasm: boolean;
  isHyperkalemiaRisk: boolean;
}

export interface DrugDefinition {
  id: string;
  name: string;
  category: 'sedative' | 'paralytic' | 'pressor' | 'adjuvant';
  concentrationMgPerMl: number;
  ampouleSizeMl: number;
  standardDoseMgPerKg: number;
  shockDoseMgPerKg?: number;
  dsiDoseMgPerKg?: number;
  onsetSeconds: string;
  durationMinutes: string;
  indications: string;
  contraindications: string[];
  notes?: string;
}

export interface CalculatedDose {
  drugId: string;
  name: string;
  doseMg: number;
  volumeMl: number;
  presentationText: string;
  isRecommended: boolean;
  isContraindicated: boolean;
  contraindicationReason?: string;
  clinicalNote?: string;
}

export interface TriageAnswers {
  isCardiacArrestOrPeriArrest: boolean;
  hasShockOrInstability: boolean;
  hasSevereDifficultAirwayAnatomy: boolean;
  teamTrainedInAwake: boolean;
  hasRefractoryHypoxemiaOrAgitation: boolean;
}

export interface TriageResult {
  recommendedTrack: TrackType;
  title: string;
  rationale: string;
  urgencyLevel: 'immediate' | 'urgent' | 'prepare';
  physiologicalOptimizationAlert?: string;
}
```

- [ ] **Step 2: Define Drug Database (`src/data/drugs.ts`)**

Create `src/data/drugs.ts` with standard presentations (Etomidato 2mg/mL, Cetamina 50mg/mL, Propofol 10mg/mL, Midazolam 5mg/mL, Rocurônio 10mg/mL, Succinilcolina 100mg pó diluído para 10mL).

- [ ] **Step 3: Write tests for Drug Calculator (`src/test/drugCalculator.test.ts`)**

Tests:
1. 70kg standard SRI patient receives Etomidate 21mg (10.5 mL) and Rocuronium 84mg (8.4 mL).
2. 70kg patient in shock receives reduced Etomidate 14mg (7.0 mL) and Propofol is flagged as contraindicated.
3. Patient with hyperkalemia risk has Succinylcholine flagged as contraindicated and Rocuronium recommended.
4. DSI track uses dissociative Ketamine dose (1.0 to 1.5 mg/kg).

- [ ] **Step 4: Implement Drug Calculator Engine (`src/engines/drugCalculator.ts`)**

Implement `calculateDrugDose` and `getAllCalculatedDoses`.

- [ ] **Step 5: Write tests for Triage Engine (`src/test/triageEngine.test.ts`)**

Tests:
1. PCR/Peri-arrest answers -> returns 'CRASH'.
2. Severe VAD + team trained in awake -> returns 'AWAKE'.
3. Severe VAD + team NOT trained -> returns 'DSI'.
4. Refractory hypoxemia/agitation without VAD -> returns 'DSI'.
5. Standard patient with time for prep -> returns 'SRI'.
6. If shock is true, result contains physiological optimization alert.

- [ ] **Step 6: Implement Triage Engine (`src/engines/triageEngine.ts`)**

Implement `runTriage(answers: TriageAnswers): TriageResult`.

- [ ] **Step 7: Run tests to verify they all pass**

Run: `npm test`
Expected: All tests PASS.

- [ ] **Step 8: Commit Task 2**

```bash
git add src/types/ src/data/ src/engines/ src/test/
git commit -m "feat: implement clinical calculation engines with comprehensive unit tests"
```

---

### Task 3: Clinical Context & Global State Management

**Files:**
- Create: `src/context/ClinicalContext.tsx`
- Test: `src/test/ClinicalContext.test.tsx`

**Interfaces:**
- Produces: `useClinicalState()` hook providing:
  - `weightKg`: number (default 70)
  - `setWeightKg(w: number): void`
  - `conditions`: ClinicalConditions
  - `toggleCondition(key: keyof ClinicalConditions): void`
  - `currentTrack`: TrackType | null
  - `setCurrentTrack(track: TrackType | null): void`
  - `checklistChecked`: Record<string, boolean>
  - `toggleChecklistItem(id: string): void`
  - `resetChecklist(): void`
  - `isSosModalOpen`: boolean
  - `setIsSosModalOpen(open: boolean): void`

- [ ] **Step 1: Write Context & Provider (`src/context/ClinicalContext.tsx`)**
  - Implement state with `localStorage` synchronization for weight, conditions, active track, and checklist progress.
  - Implement clean reset and safety fallbacks.

- [ ] **Step 2: Verify state changes and persistence**

- [ ] **Step 3: Commit Task 3**

```bash
git add src/context/
git commit -m "feat: implement ClinicalContext with localStorage sync"
```

---

### Task 4: Layout Components & Emergency SOS Rescue Modal

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/BottomNav.tsx`
- Create: `src/components/layout/SosModal.tsx`

**Interfaces:**
- Produces:
  - `<Header />`: Top navigation with brand, dark mode toggle, and SOS button.
  - `<SosModal />`: Instant full-screen overlay detailing Plans A, B, C, and D (Cricothyroidotomy).
  - `<BottomNav />`: Bottom action bar for navigation.

- [ ] **Step 1: Implement Header component with permanent SOS button**
  - Navy blue banner with brand "Gui-Ar" and subtitle.
  - Theme toggle (dark/light mode).
  - Prominent red button: **"SOS / Falha"** pulsing if emergency is triggered.

- [ ] **Step 2: Implement SosModal component (DAS/SBA Rescue Algorithm)**
  - Plan A: Max 3 attempts, optimize (BURP, Bougie, blade change).
  - Plan B: Supraglottic device (LMA) insertion.
  - Plan C: Bag-Valve-Mask (VE-VE 2-person, Guedel, PEEP).
  - Plan D: CICO emergency protocol with knife-finger-bougie-tube step-by-step.

- [ ] **Step 3: Implement BottomNav component**
  - Fast buttons: "Início", "Trilhas", "Calculadora", "Checklist", "Sobre".

- [ ] **Step 4: Commit Task 4**

```bash
git add src/components/layout/
git commit -m "feat: implement Header, BottomNav, and Emergency SOS Rescue modal"
```

---

### Task 5: Dashboard & Fast Triage Wizard (Árvore Decisória)

**Files:**
- Create: `src/components/home/Dashboard.tsx`
- Create: `src/components/home/TriageModal.tsx`
- Create: `src/components/tools/LemonModal.tsx`

**Interfaces:**
- Produces:
  - `<Dashboard />`: Main screen with large triage banner, 4 track cards, and quick tools.
  - `<TriageModal />`: 4-step modal wizard that executes `runTriage()` and redirects to track.
  - `<LemonModal />`: Quick LEMON airway evaluation tool.

- [ ] **Step 1: Implement LEMON Evaluation Modal (`src/components/tools/LemonModal.tsx`)**
  - Interactive checkboxes for L, E (3-3-2), M, O, N.
  - Computes difficult airway probability score.

- [ ] **Step 2: Implement Triage Modal (`src/components/home/TriageModal.tsx`)**
  - Step 1: PCR / Inconscious -> Crash.
  - Step 2: Shock / Instability alert with push-dose guidance.
  - Step 3: Difficult Airway Anatomy with LEMON shortcut -> Awake vs DSI.
  - Step 4: Refractory Hypoxemia / Agitation -> DSI vs SRI.
  - Button to apply result directly and switch track.

- [ ] **Step 3: Implement Dashboard Component (`src/components/home/Dashboard.tsx`)**
  - Top highlight banner for Triage.
  - 2x2 grid of cards for CRASH, SRI, DSI/KOBE, and AWAKE.
  - Quick action chips for Calculadora, LEMON, and Checklist.

- [ ] **Step 4: Commit Task 5**

```bash
git add src/components/home/ src/components/tools/
git commit -m "feat: implement Dashboard, Triage wizard modal, and LEMON evaluator"
```

---

### Task 6: Interactive Clinical Track View & The 4 Tabs

**Files:**
- Create: `src/components/track/TrackView.tsx`
- Create: `src/components/track/ChecklistTab.tsx`
- Create: `src/components/track/PharmacologyTab.tsx`
- Create: `src/components/track/ExecutionTab.tsx`
- Create: `src/components/track/PostIntubationTab.tsx`
- Create: `src/components/tools/PushDoseModal.tsx`

**Interfaces:**
- Produces: Full clinical track experience with 4 top tabs:
  - `ChecklistTab`: Interactive 7 Ps with progress percentage.
  - `PharmacologyTab`: Quick weight selector, clinical tags, dose cards (mg + mL), push-dose modal.
  - `ExecutionTab`: Track-specific airway execution steps and failure rescue trigger.
  - `PostIntubationTab`: EtCO2 golden confirmation, 6 mL/kg ventilator formulas, sedoanalgesia.

- [ ] **Step 1: Implement ChecklistTab (`src/components/track/ChecklistTab.tsx`)**
  - Interactive checkable items categorized by P1 through P7.
  - Dynamic progress bar showing % completed.
  - Audio/haptic feedback or visual green glow on item completion.

- [ ] **Step 2: Implement PharmacologyTab (`src/components/track/PharmacologyTab.tsx`)**
  - Quick weight buttons: 50, 60, 70, 80, 90, 100 kg + custom numeric input.
  - Condition tags: Choque, TCE, Broncoespasmo, Risco de Hipercalemia.
  - Real-time dose cards displaying exact **mg** and **volume (mL)**.
  - Red contraindication banners (e.g. Propofol in shock, Succinylcholine in hyperkalemia).
  - Push-dose pressor recipe button (Noradrenaline 10 mcg/mL).

- [ ] **Step 3: Implement ExecutionTab (`src/components/track/ExecutionTab.tsx`)**
  - Key track instructions (e.g. Ketamine dissociation in DSI, Topicalization in Awake, direct action in Crash).
  - Emergency action button linking straight to Plan B / Plan D if intubation fails.

- [ ] **Step 4: Implement PostIntubationTab (`src/components/track/PostIntubationTab.tsx`)**
  - Gold standard verification: continuous EtCO2 capnography wave.
  - Protective mechanical ventilation calculator: tidal volume 6 mL/kg of predicted body weight.
  - Initial PEEP, respiratory rate, and continuous sedation recommendations.

- [ ] **Step 5: Implement TrackView (`src/components/track/TrackView.tsx`)**
  - Top tab switcher with active blue indicator.
  - Smooth tab transitions.

- [ ] **Step 6: Commit Task 6**

```bash
git add src/components/track/ src/components/tools/
git commit -m "feat: implement TrackView with Checklist, Pharmacology, Execution, and Post-intubation tabs"
```

---

### Task 7: PWA Configuration & Offline Support

**Files:**
- Create: `public/manifest.json`
- Modify: `index.html`
- Create: `public/sw.js`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: Complete PWA installation manifest, standalone mobile mode, offline service worker caching.

- [ ] **Step 1: Create Web App Manifest (`public/manifest.json`)**
  - Name: "Gui-Ar - Manejo da Via Aérea"
  - Short name: "Gui-Ar"
  - Theme color: `#1E3A8A`
  - Display: `standalone`
  - Orientation: `portrait`

- [ ] **Step 2: Add offline Service Worker (`public/sw.js`)**
  - Caches core static assets for 100% offline availability in ambulances/emergency rooms.

- [ ] **Step 3: Register Service Worker in `src/main.tsx`**

- [ ] **Step 4: Test build and PWA manifest**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit Task 7**

```bash
git add public/ src/main.tsx index.html
git commit -m "feat: configure PWA manifest and offline service worker"
```

---

### Task 8: Verification & Simulated Scenario Testing

**Files:**
- Test: `src/test/clinicalScenarios.test.ts`

- [ ] **Step 1: Write scenario validation tests representing the 4 tracks from the thesis**
  - Scenario 1: Cardiac arrest / Agonal patient -> verifies Crash route and zero delays.
  - Scenario 2: Severe hypoxemic/agitated patient with aspiration risk -> verifies DSI route with Ketamine pre-oxygenation.
  - Scenario 3: Patient in septic shock with peritonitis -> verifies SRI route with reduced Etomidate (0.15 mg/kg), push-dose pressor alert, and Propofol warning.
  - Scenario 4: Patient with severe glottic tumor and stridor -> verifies Awake route with topicalization.

- [ ] **Step 2: Run full test suite**

Run: `npm test`
Expected: All scenario tests PASS.

- [ ] **Step 3: Launch dev server and manual inspection**

Run: `npm run build && npm run preview`
Verify responsiveness on mobile viewports.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "test: add full thesis clinical scenario tests and final verifications"
```
