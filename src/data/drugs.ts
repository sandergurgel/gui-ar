import { DrugDefinition } from '../types/clinical';

export const DRUGS_DATABASE: DrugDefinition[] = [
  {
    id: 'etomidato',
    name: 'Etomidato',
    commercialNames: 'Hypnomidate',
    category: 'sedative',
    concentrationMgPerMl: 2, // 2 mg/mL
    ampoulePresentation: 'Ampola 10 mL (20 mg = 2 mg/mL)',
    standardDoseMgPerKg: 0.3,
    standardDoseRangeText: '0,2 a 0,3 mg/kg',
    shockDoseMgPerKg: 0.15, // Reduced in hemodynamic shock
    onsetSeconds: '30 a 60s',
    durationMinutes: '5 a 10 min',
    indications: '1ª escolha em pacientes com instabilidade hemodinâmica, choque séptico/cardiogênico ou politrauma.',
    contraindications: ['Hipersensibilidade conhecida', 'Uso contínuo (risco de supressão adrenal prolongada)'],
    notes: 'Excelente perfil de estabilidade cardiovascular. No choque, reduzir para 0,15 a 0,20 mg/kg.'
  },
  {
    id: 'cetamina',
    name: 'Cetamina (Quetamina)',
    commercialNames: 'Ketamin-S, Cloridrato de Cetamina',
    category: 'sedative',
    concentrationMgPerMl: 50, // 50 mg/mL
    ampoulePresentation: 'Frasco-ampola 10 mL (500 mg = 50 mg/mL)',
    standardDoseMgPerKg: 1.5,
    standardDoseRangeText: '1,5 a 2,0 mg/kg (SRI) / 1,0 a 1,5 mg/kg (DSI)',
    shockDoseMgPerKg: 1.0,
    dsiDoseMgPerKg: 1.0,
    onsetSeconds: '45 a 60s',
    durationMinutes: '10 a 20 min',
    indications: 'Sedação dissociativa. Droga de escolha em broncoespasmo grave/asma e na Sequência Atrasada (DSI). Preserva tônus de via aérea e reflexos.',
    contraindications: ['Hipersensibilidade grave', 'Hipertensão severa não controlada descompensada'],
    notes: 'Broncodilatador potente. No choque profundo com exaustão prévia de catecolaminas, pode deprimir contratilidade: usar 1 mg/kg.'
  },
  {
    id: 'propofol',
    name: 'Propofol',
    commercialNames: 'Diprivan, Provive',
    category: 'sedative',
    concentrationMgPerMl: 10, // 10 mg/mL (1%)
    ampoulePresentation: 'Ampola 20 mL (200 mg = 10 mg/mL)',
    standardDoseMgPerKg: 1.5,
    standardDoseRangeText: '1,5 a 2,0 mg/kg',
    onsetSeconds: '15 a 45s',
    durationMinutes: '5 a 10 min',
    indications: 'Paciente estável hemodinamicamente, estado de mal epiléptico ou broncoespasmo.',
    contraindications: [
      'Choque ou hipotensão (PAS < 90 mmHg)',
      'Instabilidade hemodinâmica grave',
      'Alergia a ovo/soja severa'
    ],
    notes: 'Risco crítico de vasodilatação severa e hipotensão peri-intubação. Não indicado no choque.'
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    commercialNames: 'Dormonid',
    category: 'sedative',
    concentrationMgPerMl: 5, // 5 mg/mL
    ampoulePresentation: 'Ampola 3 mL (15 mg = 5 mg/mL)',
    standardDoseMgPerKg: 0.2,
    standardDoseRangeText: '0,2 a 0,3 mg/kg',
    shockDoseMgPerKg: 0.1,
    onsetSeconds: '60 a 90s',
    durationMinutes: '15 a 30 min',
    indications: 'Alternativa quando indisponíveis Etomidato e Cetamina.',
    contraindications: ['Hipersensibilidade', 'Hipotensão severa'],
    notes: 'Início de ação mais lento que etomidato. Pode causar depressão miocárdica e hipotensão.'
  },
  {
    id: 'fentanil',
    name: 'Fentanil',
    commercialNames: 'Fentanila',
    category: 'adjuvant',
    concentrationMgPerMl: 0.05,
    ampoulePresentation: 'Ampola 2 mL (100 mcg = 50 mcg/mL)',
    standardDoseMgPerKg: 0.002,
    standardDoseRangeText: '1 a 3 mcg/kg IV lento',
    onsetSeconds: '30 a 60s',
    durationMinutes: '30 a 60 min (dose unica)',
    indications: 'Adjunto de inducao no TCE: atenua a resposta hipertensiva a laringoscopia preservando a pressao de perfusao cerebral. Analgesia de procedural.',
    contraindications: ['Hipersensibilidade conhecida', 'Bradipneia/apneia nao ventilada'],
    notes: 'Atenua resposta hemodinamica a laringoscopia. Bradicardia e rigidez toracica em bolus rapido: infundir em 30-60 s.'
  },
  {
    id: 'rocuronio',
    name: 'Rocurônio',
    commercialNames: 'Esmeron',
    category: 'paralytic',
    concentrationMgPerMl: 10, // 10 mg/mL
    ampoulePresentation: 'Frasco-ampola 5 mL (50 mg = 10 mg/mL)',
    standardDoseMgPerKg: 1.2, // Fast onset dose for SRI
    standardDoseRangeText: '1,2 mg/kg (dose rápida de SRI)',
    onsetSeconds: '60s',
    durationMinutes: '45 a 60 min',
    indications: '1ª escolha para paralisia rápida em SRI, especialmente quando Succinilcolina é contraindicada ou em risco de hipercalemia.',
    contraindications: ['Hipersensibilidade conhecida'],
    notes: 'Dose de 1,2 mg/kg garante paralisia em 60s idêntica à succinilcolina. Se falha crítica e disponível, pode ser revertido imediatamente com Sugamadex 16 mg/kg.'
  },
  {
    id: 'succinilcolina',
    name: 'Succinilcolina (Suxametônio)',
    commercialNames: 'Quelicin',
    category: 'paralytic',
    concentrationMgPerMl: 10, // 100 mg pó diluído em 10 mL AD = 10 mg/mL
    ampoulePresentation: 'Frasco 100 mg pó liofilizado (diluído em 10 mL AD = 10 mg/mL)',
    standardDoseMgPerKg: 1.5,
    standardDoseRangeText: '1,0 a 1,5 mg/kg',
    onsetSeconds: '45s',
    durationMinutes: '6 a 10 min',
    indications: 'Bloqueador neuromuscular despolarizante de ação ultrarrápida e curta duração.',
    contraindications: [
      'Risco de hipercalemia grave',
      'Grande queimado (> 48h de evolução)',
      'Trauma por esmagamento / Rabdomiólise (> 48h)',
      'Doença desmielinizante / AVE ou lesão medular (> 48h)',
      'História pessoal/familiar de Hipertermia Maligna',
      'Insuficiência renal dialítica com potássio desconhecido'
    ],
    notes: 'Pode elevar K+ em 0,5 a 1,0 mEq/L em condições normais, e causar hipercalemia fatal em pacientes de risco.'
  }
];
