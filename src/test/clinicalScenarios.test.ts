import { describe, it, expect } from 'vitest';
import { runTriage } from '../engines/triageEngine';
import { calculateDrugDose, getAllCalculatedDoses } from '../engines/drugCalculator';
import { ClinicalConditions, TriageAnswers } from '../types/clinical';

describe('Thesis Clinical Scenarios Validation (Mestrado UEM)', () => {
  const baseConditions: ClinicalConditions = {
    isShock: false,
    isTBI: false,
    isBronchospasm: false,
    isHyperkalemiaRisk: false,
  };

  // Cenário 1: Trilha CRASH
  it('Cenário 1 (CRASH): Paciente em PCR ou coma profundo arreativo', () => {
    const answers: TriageAnswers = {
      isCardiacArrestOrPeriArrest: true,
      hasShockOrInstability: true,
      hasSevereDifficultAirwayAnatomy: false,
      teamTrainedInAwake: false,
      hasRefractoryHypoxemiaOrAgitation: false,
    };

    const triage = runTriage(answers);
    expect(triage.recommendedTrack).toBe('CRASH');
    expect(triage.urgencyLevel).toBe('immediate');
    expect(triage.title).toContain('CRASH');
    expect(triage.rationale).toContain('parada');
  });

  // Cenário 2: Trilha SRI Padrão
  it('Cenário 2 (SRI): Paciente estável de 70 kg com indicação imediata e tempo para preparo', () => {
    const answers: TriageAnswers = {
      isCardiacArrestOrPeriArrest: false,
      hasShockOrInstability: false,
      hasSevereDifficultAirwayAnatomy: false,
      teamTrainedInAwake: false,
      hasRefractoryHypoxemiaOrAgitation: false,
    };

    const triage = runTriage(answers);
    expect(triage.recommendedTrack).toBe('SRI');
    expect(triage.urgencyLevel).toBe('prepare');

    // Farmacologia
    const etomidato = calculateDrugDose('etomidato', 70, baseConditions, 'SRI');
    expect(etomidato.doseMg).toBe(21);
    expect(etomidato.volumeMl).toBe(10.5);
    expect(etomidato.isRecommended).toBe(true);

    const rocuronio = calculateDrugDose('rocuronio', 70, baseConditions, 'SRI');
    expect(rocuronio.doseMg).toBe(84);
    expect(rocuronio.volumeMl).toBe(8.4);
    expect(rocuronio.isRecommended).toBe(true);
  });

  // Cenário 3: Trilha DSI / KOBE
  it('Cenário 3 (DSI / KOBE): Paciente hipoxêmico (SpO2 84%) e agitado que arranca a máscara de O2', () => {
    const answers: TriageAnswers = {
      isCardiacArrestOrPeriArrest: false,
      hasShockOrInstability: false,
      hasSevereDifficultAirwayAnatomy: false,
      teamTrainedInAwake: false,
      hasRefractoryHypoxemiaOrAgitation: true,
    };

    const triage = runTriage(answers);
    expect(triage.recommendedTrack).toBe('DSI');
    expect(triage.rationale).toContain('Cetamina');

    // Farmacologia na DSI
    const cetamina = calculateDrugDose('cetamina', 70, baseConditions, 'DSI');
    expect(cetamina.doseMg).toBe(70); // 1.0 mg/kg
    expect(cetamina.volumeMl).toBe(1.4);
    expect(cetamina.clinicalNote).toContain('DSI');
  });

  // Cenário 4: Trilha AWAKE
  it('Cenário 4 (AWAKE): Paciente com estridor, tumor glótico visível e equipe apta para intubação acordado', () => {
    const answers: TriageAnswers = {
      isCardiacArrestOrPeriArrest: false,
      hasShockOrInstability: false,
      hasSevereDifficultAirwayAnatomy: true,
      teamTrainedInAwake: true,
      hasRefractoryHypoxemiaOrAgitation: false,
    };

    const triage = runTriage(answers);
    expect(triage.recommendedTrack).toBe('AWAKE');
    expect(triage.rationale).toContain('acordado');
  });

  // Cenário 5: Choque Séptico peri-intubação na SRI
  it('Cenário 5 (Choque Séptico): Paciente de 80 kg instável (PAS 78 mmHg)', () => {
    const shockConditions: ClinicalConditions = {
      ...baseConditions,
      isShock: true,
    };

    const doses = getAllCalculatedDoses(80, shockConditions, 'SRI');

    // Etomidato com dose reduzida para choque (0.15 mg/kg)
    const etomidato = doses.find(d => d.drugId === 'etomidato')!;
    expect(etomidato.doseMg).toBe(12); // 0.15 * 80
    expect(etomidato.volumeMl).toBe(6);
    expect(etomidato.clinicalNote).toContain('choque');

    // Propofol contraindicado
    const propofol = doses.find(d => d.drugId === 'propofol')!;
    expect(propofol.isContraindicated).toBe(true);
    expect(propofol.contraindicationReason).toContain('Choque');
  });

  // Cenário 6: Grande queimado com risco de hipercalemia
  it('Cenário 6 (Risco de Hipercalemia): Paciente com queimaduras extensas > 48 horas', () => {
    const hyperkalemiaConditions: ClinicalConditions = {
      ...baseConditions,
      isHyperkalemiaRisk: true,
    };

    const succinilcolina = calculateDrugDose('succinilcolina', 70, hyperkalemiaConditions, 'SRI');
    expect(succinilcolina.isContraindicated).toBe(true);
    expect(succinilcolina.contraindicationReason).toContain('hipercalemia');

    const rocuronio = calculateDrugDose('rocuronio', 70, hyperkalemiaConditions, 'SRI');
    expect(rocuronio.isRecommended).toBe(true);
  });
});
