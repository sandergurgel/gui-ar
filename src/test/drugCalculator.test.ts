import { describe, it, expect } from 'vitest';
import { calculateDrugDose, getAllCalculatedDoses } from '../engines/drugCalculator';
import { ClinicalConditions } from '../types/clinical';

describe('drugCalculator engine', () => {
  const defaultConditions: ClinicalConditions = {
    isShock: false,
    isTBI: false,
    isBronchospasm: false,
    isHyperkalemiaRisk: false,
  };

  it('calculates standard SRI dose and volume for 70 kg patient', () => {
    // Etomidato 0.3 mg/kg, 2 mg/mL
    const etomidato = calculateDrugDose('etomidato', 70, defaultConditions, 'SRI');
    expect(etomidato.doseMg).toBeCloseTo(21, 1);
    expect(etomidato.volumeMl).toBeCloseTo(10.5, 1);
    expect(etomidato.isContraindicated).toBe(false);

    // Rocurônio 1.2 mg/kg, 10 mg/mL
    const rocuronio = calculateDrugDose('rocuronio', 70, defaultConditions, 'SRI');
    expect(rocuronio.doseMg).toBeCloseTo(84, 1);
    expect(rocuronio.volumeMl).toBeCloseTo(8.4, 1);
    expect(rocuronio.isContraindicated).toBe(false);
  });

  it('adjusts Etomidato dose in shock and flags Propofol as contraindicated', () => {
    const shockConditions: ClinicalConditions = {
      ...defaultConditions,
      isShock: true,
    };

    const etomidato = calculateDrugDose('etomidato', 70, shockConditions, 'SRI');
    // Reduced to 0.15 - 0.20 mg/kg
    expect(etomidato.doseMg).toBeLessThan(21);
    expect(etomidato.clinicalNote).toContain('choque');

    const propofol = calculateDrugDose('propofol', 70, shockConditions, 'SRI');
    expect(propofol.isContraindicated).toBe(true);
    expect(propofol.contraindicationReason).toContain('Choque');
  });

  it('flags Succinylcholine as contraindicated when hyperkalemia risk is flagged', () => {
    const hyperkalemiaConditions: ClinicalConditions = {
      ...defaultConditions,
      isHyperkalemiaRisk: true,
    };

    const succinilcolina = calculateDrugDose('succinilcolina', 70, hyperkalemiaConditions, 'SRI');
    expect(succinilcolina.isContraindicated).toBe(true);
    expect(succinilcolina.contraindicationReason).toContain('hipercalemia');

    const rocuronio = calculateDrugDose('rocuronio', 70, hyperkalemiaConditions, 'SRI');
    expect(rocuronio.isRecommended).toBe(true);
  });

  it('calculates DSI dissociative dose for Ketamine (1.0 mg/kg)', () => {
    const cetamina = calculateDrugDose('cetamina', 70, defaultConditions, 'DSI');
    // In DSI, 1.0 mg/kg = 70 mg = 1.4 mL (at 50 mg/mL)
    expect(cetamina.doseMg).toBeCloseTo(70, 1);
    expect(cetamina.volumeMl).toBeCloseTo(1.4, 1);
    expect(cetamina.isRecommended).toBe(true);
  });

  it('getAllCalculatedDoses returns list with proper categorization and formatting', () => {
    const doses = getAllCalculatedDoses(70, defaultConditions, 'SRI');
    expect(doses.length).toBeGreaterThanOrEqual(6);
    const rocuronio = doses.find(d => d.drugId === 'rocuronio');
    expect(rocuronio).toBeDefined();
    expect(rocuronio?.doseMgText).toBe('84 mg');
    expect(rocuronio?.volumeMlText).toBe('8.4 mL');
  });

  describe('TCE', () => {
    it('recommends Fentanil, contraindicates Cetamina and recommends Propofol in TBI', () => {
      const tbiConditions: ClinicalConditions = {
        ...defaultConditions,
        isTBI: true,
      };

      const fentanil = calculateDrugDose('fentanil', 70, tbiConditions, 'SRI');
      expect(fentanil.isRecommended).toBe(true);
      expect(fentanil.doseMg).toBeCloseTo(0.14, 2);
      expect(fentanil.volumeMl).toBeCloseTo(2.8, 1);

      const cetamina = calculateDrugDose('cetamina', 70, tbiConditions, 'SRI');
      expect(cetamina.isContraindicated).toBe(true);

      const propofol = calculateDrugDose('propofol', 70, tbiConditions, 'SRI');
      expect(propofol.isRecommended).toBe(true);
    });
  });
});
