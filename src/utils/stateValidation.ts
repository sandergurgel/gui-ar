import { ClinicalConditions, LemonScoreState, TrackType } from '../types/clinical';

export type ValidTab = 'checklist' | 'pharma' | 'execution' | 'post';

const VALID_TRACKS: readonly TrackType[] = ['CRASH', 'SRI', 'DSI', 'AWAKE'];
const VALID_TABS: readonly ValidTab[] = ['checklist', 'pharma', 'execution', 'post'];

export function isValidTrack(value: unknown): value is TrackType {
  return typeof value === 'string' && (VALID_TRACKS as readonly string[]).includes(value);
}

export function isValidTab(value: unknown): value is ValidTab {
  return typeof value === 'string' && (VALID_TABS as readonly string[]).includes(value);
}

export function sanitizeWeight(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < 10 || value > 250) return null;
  return value;
}

const CONDITION_KEYS: readonly (keyof ClinicalConditions)[] = [
  'isShock',
  'isTBI',
  'isBronchospasm',
  'isHyperkalemiaRisk',
];

export function sanitizeConditions(value: unknown): ClinicalConditions {
  const fallback: ClinicalConditions = {
    isShock: false,
    isTBI: false,
    isBronchospasm: false,
    isHyperkalemiaRisk: false,
  };
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return fallback;
  }
  const record = value as Record<string, unknown>;
  return {
    isShock: typeof record.isShock === 'boolean' ? record.isShock : false,
    isTBI: typeof record.isTBI === 'boolean' ? record.isTBI : false,
    isBronchospasm: typeof record.isBronchospasm === 'boolean' ? record.isBronchospasm : false,
    isHyperkalemiaRisk:
      typeof record.isHyperkalemiaRisk === 'boolean' ? record.isHyperkalemiaRisk : false,
  };
}

const LEMON_KEYS: readonly (keyof LemonScoreState)[] = [
  'lookExternal',
  'eval332',
  'mallampati',
  'obstruction',
  'neckMobility',
];

export function sanitizeLemon(value: unknown): LemonScoreState {
  const fallback: LemonScoreState = {
    lookExternal: false,
    eval332: false,
    mallampati: false,
    obstruction: false,
    neckMobility: false,
  };
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return fallback;
  }
  const record = value as Record<string, unknown>;
  return {
    lookExternal: typeof record.lookExternal === 'boolean' ? record.lookExternal : false,
    eval332: typeof record.eval332 === 'boolean' ? record.eval332 : false,
    mallampati: typeof record.mallampati === 'boolean' ? record.mallampati : false,
    obstruction: typeof record.obstruction === 'boolean' ? record.obstruction : false,
    neckMobility: typeof record.neckMobility === 'boolean' ? record.neckMobility : false,
  };
}

export function sanitizeChecklist(value: unknown): Record<string, boolean> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return {};
  }
  const record = value as Record<string, unknown>;
  const result: Record<string, boolean> = {};
  for (const [key, entry] of Object.entries(record)) {
    if (typeof entry === 'boolean') {
      result[key] = entry;
    }
  }
  return result;
}

export { CONDITION_KEYS, LEMON_KEYS };
