export interface ChecklistItem {
  id: string;
  category: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';
  categoryTitle: string;
  label: string;
  description: string;
  isCritical: boolean;
}

export const CHECKLIST_7PS: ChecklistItem[] = [
  // P1 - Preparação
  {
    id: 'p1_access',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: '2 Acessos Venosos Calibrosos',
    description: 'Acessos periféricos pérvios (18G ou 16G) testados e com infusão fluindo.',
    isCritical: true,
  },
  {
    id: 'p1_laryngo',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Laringoscópio / Videolaringo Testado',
    description: 'Lâminas testadas (nº 3 e 4), fonte de luz forte, vídeo conferido.',
    isCritical: true,
  },
  {
    id: 'p1_ett',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Tubo Endotraqueal (TET) e Balonete',
    description: 'TET tamanhos 7.5 e 8.0 com cuff testado e seringa de 10 mL conectada.',
    isCritical: true,
  },
  {
    id: 'p1_bougie',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Bougie / Fio Guia Pré-Carregado',
    description: 'Bougie lubrificado na mão do operador ou pré-carregado no tubo.',
    isCritical: true,
  },
  {
    id: 'p1_suction',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Aspirador Rígido (Yankauer) Ligado',
    description: 'Aspirador conectado, com vácuo testado e posicionado sob o travesseiro.',
    isCritical: true,
  },
  {
    id: 'p1_rescue_lma',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Dispositivo Supraglótico (Máscara Laríngea)',
    description: 'Máscara laríngea de 2ª geração de tamanho adequado aberta na cabeceira.',
    isCritical: true,
  },
  {
    id: 'p1_monitoring',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Monitorização Completa e Capnógrafo',
    description: 'Oximetria contínua com curva, ECG, PNI ciclando e Capnógrafo calibrado.',
    isCritical: true,
  },
  {
    id: 'p1_team',
    category: 'P1',
    categoryTitle: 'P1 - Preparação',
    label: 'Briefing da Equipe (Funções Claras)',
    description: 'Definir: Laringoscopista 1, Assistente do Tubo, Medicador, Monitor.',
    isCritical: false,
  },

  // P2 - Pré-oxigenação
  {
    id: 'p2_o2',
    category: 'P2',
    categoryTitle: 'P2 - Pré-Oxigenação',
    label: '3 a 5 min a 100% de O2 (SpO2 > 95%)',
    description: 'Máscara com reservatório a 15 L/min ou VNI/CPAP com PEEP 5-10 cmH2O.',
    isCritical: true,
  },
  {
    id: 'p2_apneic',
    category: 'P2',
    categoryTitle: 'P2 - Pré-Oxigenação',
    label: 'Oxigenação Apneica Preparada',
    description: 'Cateter nasal de O2 a 15 L/min mantido durante a laringoscopia.',
    isCritical: false,
  },

  // P3 - Pré-otimização
  {
    id: 'p3_hemodynamics',
    category: 'P3',
    categoryTitle: 'P3 - Pré-Otimização',
    label: 'Otimização Hemodinâmica (PAS > 90)',
    description: 'Volume com cristaloide se tolerado e Noradrenalina push-dose pronta.',
    isCritical: true,
  },

  // P4 - Posicionamento
  {
    id: 'p4_sniffing',
    category: 'P4',
    categoryTitle: 'P4 - Posicionamento',
    label: 'Posição Olfativa (Sniffing) ou Rampa',
    description: 'Alinhamento trago-fúrcula esternal. Em obesos, posição em rampa obrigatória.',
    isCritical: true,
  },

  // P5 - Paralisia com Indução Simultânea
  {
    id: 'p5_induction',
    category: 'P5',
    categoryTitle: 'P5 - Paralisia e Indução',
    label: 'Indutor + Bloqueador Neuromuscular em Bólus',
    description: 'Injeção rápida do sedativo seguido imediatamente do relaxante muscular sem ventilar.',
    isCritical: true,
  },

  // P6 - Passagem do Tubo & Confirmação
  {
    id: 'p6_tube',
    category: 'P6',
    categoryTitle: 'P6 - Passagem e Confirmação',
    label: 'Laringoscopia e Passagem com Bougie',
    description: 'Visualização da glote, passagem do Bougie e deslizamento do tubo com cuff.',
    isCritical: true,
  },
  {
    id: 'p6_etco2',
    category: 'P6',
    categoryTitle: 'P6 - Passagem e Confirmação',
    label: 'Confirmação Padrão-Ouro (Capnografia)',
    description: 'Curva de capnografia contínua (EtCO2) por pelo menos 6 ciclos respiratórios.',
    isCritical: true,
  },
  {
    id: 'p6_auscultation',
    category: 'P6',
    categoryTitle: 'P6 - Passagem e Confirmação',
    label: 'Ausculta em 5 Pontos',
    description: 'Epigástrio mudo (sem ruído gástrico) e murmúrio vesicular bilateral simétrico.',
    isCritical: true,
  },

  // P7 - Pós-Intubação
  {
    id: 'p7_fixation',
    category: 'P7',
    categoryTitle: 'P7 - Pós-Intubação',
    label: 'Fixação e Registro na Rima Labial',
    description: 'Fixação segura do tubo na rima (21 a 23 cm em adultos).',
    isCritical: true,
  },
  {
    id: 'p7_protective_vent',
    category: 'P7',
    categoryTitle: 'P7 - Pós-Intubação',
    label: 'Ventilação Protetora (6 mL/kg predito)',
    description: 'Volume corrente 6 mL/kg, PEEP 5-8, FR 12-16, FiO2 100% titulada p/ SpO2 92-96%.',
    isCritical: true,
  },
  {
    id: 'p7_sedoanalgesia',
    category: 'P7',
    categoryTitle: 'P7 - Pós-Intubação',
    label: 'Sedoanalgesia Contínua Imediata',
    description: 'Bomba de infusão com Fentanil + sedativo para evitar despertar acidental.',
    isCritical: true,
  },
];
