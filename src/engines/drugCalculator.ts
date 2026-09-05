import { DRUGS_DATABASE } from '../data/drugs';
import { CalculatedDose, ClinicalConditions, TrackType } from '../types/clinical';

export function calculateDrugDose(
  drugId: string,
  weightKg: number,
  conditions: ClinicalConditions,
  track: TrackType = 'SRI'
): CalculatedDose {
  const drug = DRUGS_DATABASE.find(d => d.id === drugId);
  if (!drug) {
    throw new Error(`Drug with id ${drugId} not found`);
  }

  const weight = Math.max(10, Math.min(250, weightKg));
  let dosePerKg = drug.standardDoseMgPerKg;
  let isContraindicated = false;
  let contraindicationReason: string | undefined;
  let clinicalNote: string | undefined = drug.notes;
  let isRecommended = false;

  // Track specific adjustments
  if (track === 'DSI' && drug.id === 'cetamina') {
    dosePerKg = drug.dsiDoseMgPerKg ?? 1.0;
    clinicalNote = 'Dose de indução dissociativa para DSI (1,0 mg/kg IV lento). Permite pré-oxigenação com manutenção do drive respiratório.';
    isRecommended = true;
  }

  // Shock adjustments
  if (conditions.isShock) {
    if (drug.shockDoseMgPerKg !== undefined) {
      dosePerKg = drug.shockDoseMgPerKg;
      clinicalNote = `Dose ajustada para choque / instabilidade hemodinâmica (${dosePerKg} mg/kg). Infundir lentamente.`;
    }

    if (drug.id === 'propofol') {
      isContraindicated = true;
      contraindicationReason = 'CONTRAINDICADO RELATIVO: Choque / Instabilidade hemodinâmica. Risco crítico de colapso cardiovascular e parada peri-intubação.';
    }

    if (drug.id === 'etomidato') {
      isRecommended = true;
      clinicalNote = '1ª escolha no choque devido ao excelente perfil hemodinâmico. Dose reduzida para 0,15 mg/kg.';
    }
  }

  // Bronchospasm adjustments
  if (conditions.isBronchospasm && drug.id === 'cetamina') {
    isRecommended = true;
    clinicalNote = '1ª escolha no paciente com broncoespasmo severo / asma devido às suas propriedades broncodilatadoras potentes.';
  }

  // Hyperkalemia risk adjustments
  if (conditions.isHyperkalemiaRisk) {
    if (drug.id === 'succinilcolina') {
      isContraindicated = true;
      contraindicationReason = 'CONTRAINDICADO ABSOLUTO: Risco de hipercalemia fatal (grande queimado, trauma extenso, DRC, lesão medular). Usar Rocurônio.';
    }
    if (drug.id === 'rocuronio') {
      isRecommended = true;
      clinicalNote = '1ª escolha de bloqueador neuromuscular diante de risco de hipercalemia.';
    }
  }

  // TCE / Neuroprotecao
  if (conditions.isTBI) {
    if (drug.id === 'fentanil') {
      isRecommended = true;
      clinicalNote = 'Adjunto de escolha no TCE: atenua a resposta hipertensiva a laringoscopia mantendo a pressao de perfusao cerebral. 1 a 3 mcg/kg IV lento.';
    }
    if (drug.id === 'cetamina') {
      isContraindicated = true;
      contraindicationReason = 'CONTRAINDICADO RELATIVO: TCE / hipertensao intracraniana — pode elevar a PIC. Preferir Etomidato ou Propofol com Fentanil.';
    }
    if (drug.id === 'propofol') {
      isRecommended = true;
      clinicalNote = 'Neuroprotetor no TCE: reduz CMRO2 e mantem PPC. Titrar devagar para nao derrubar a PAS.';
    }
  }

  // Standard recommendations if none set
  if (!isRecommended && !isContraindicated) {
    if (track === 'SRI' && (drug.id === 'etomidato' || drug.id === 'rocuronio')) {
      isRecommended = true;
    }
  }

  const roundTo = (v: number, d: number) => Math.round(v * 10 ** d) / 10 ** d;
  const doseMg = roundTo(dosePerKg * weight, dosePerKg * weight < 1 ? 2 : 1);
  const volumeMl = roundTo(doseMg / drug.concentrationMgPerMl, doseMg / drug.concentrationMgPerMl < 1 ? 2 : 1);

  return {
    drugId: drug.id,
    name: drug.name,
    category: drug.category,
    doseMg,
    volumeMl,
    doseMgText: `${doseMg} mg`,
    volumeMlText: `${volumeMl} mL`,
    presentationText: drug.ampoulePresentation,
    isRecommended,
    isContraindicated,
    contraindicationReason,
    clinicalNote,
  };
}

export function getAllCalculatedDoses(
  weightKg: number,
  conditions: ClinicalConditions,
  track: TrackType = 'SRI'
): CalculatedDose[] {
  return DRUGS_DATABASE.map(drug =>
    calculateDrugDose(drug.id, weightKg, conditions, track)
  );
}
