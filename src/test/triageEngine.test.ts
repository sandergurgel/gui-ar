import { describe, it, expect } from 'vitest';
import { runTriage } from '../engines/triageEngine';
import { TriageAnswers } from '../types/clinical';

describe('triageEngine decision tree', () => {
  const baseAnswers: TriageAnswers = {
    isCardiacArrestOrPeriArrest: false,
    hasShockOrInstability: false,
    hasSevereDifficultAirwayAnatomy: false,
    teamTrainedInAwake: false,
    hasRefractoryHypoxemiaOrAgitation: false,
  };

  it('routes to CRASH immediately when patient is in cardiac arrest or agonal peri-arrest', () => {
    const result = runTriage({
      ...baseAnswers,
      isCardiacArrestOrPeriArrest: true,
    });

    expect(result.recommendedTrack).toBe('CRASH');
    expect(result.urgencyLevel).toBe('immediate');
    expect(result.rationale).toContain('parada');
  });

  it('routes to AWAKE when severe anatomical difficulty is present and team is trained', () => {
    const result = runTriage({
      ...baseAnswers,
      hasSevereDifficultAirwayAnatomy: true,
      teamTrainedInAwake: true,
    });

    expect(result.recommendedTrack).toBe('AWAKE');
    expect(result.rationale).toContain('acordado');
  });

  it('routes to DSI when severe anatomical difficulty is present but team lacks awake expertise', () => {
    const result = runTriage({
      ...baseAnswers,
      hasSevereDifficultAirwayAnatomy: true,
      teamTrainedInAwake: false,
    });

    expect(result.recommendedTrack).toBe('DSI');
    expect(result.rationale).toContain('KOBE');
  });

  it('routes to DSI when patient has refractory hypoxemia or is combative/agitado', () => {
    const result = runTriage({
      ...baseAnswers,
      hasRefractoryHypoxemiaOrAgitation: true,
    });

    expect(result.recommendedTrack).toBe('DSI');
    expect(result.rationale).toContain('Cetamina');
  });

  it('routes to SRI for standard emergency intubation candidate with time for prep', () => {
    const result = runTriage(baseAnswers);

    expect(result.recommendedTrack).toBe('SRI');
    expect(result.title).toContain('Sequência Rápida');
  });

  it('attaches physiological optimization alert when shock/instability is present', () => {
    const result = runTriage({
      ...baseAnswers,
      hasShockOrInstability: true,
    });

    expect(result.recommendedTrack).toBe('SRI');
    expect(result.physiologicalOptimizationAlert).toBeDefined();
    expect(result.physiologicalOptimizationAlert).toContain('vasopressor');
  });
});
