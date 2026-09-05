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
  commercialNames: string;
  category: 'sedative' | 'paralytic' | 'pressor' | 'adjuvant';
  concentrationMgPerMl: number;
  ampoulePresentation: string; // e.g., "Ampola 10 mL (20 mg)"
  standardDoseMgPerKg: number;
  standardDoseRangeText: string;
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
  category: 'sedative' | 'paralytic' | 'pressor' | 'adjuvant';
  doseMg: number;
  volumeMl: number;
  doseMgText: string;
  volumeMlText: string;
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

export interface LemonScoreState {
  lookExternal: boolean;
  eval332: boolean;
  mallampati: boolean;
  obstruction: boolean;
  neckMobility: boolean;
}
