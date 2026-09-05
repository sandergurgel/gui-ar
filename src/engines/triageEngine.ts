import { TriageAnswers, TriageResult } from '../types/clinical';

export function runTriage(answers: TriageAnswers): TriageResult {
  let alert: string | undefined;

  if (answers.hasShockOrInstability) {
    alert = '⚠️ ALERTA DE RESSUSCITAÇÃO FISIOLÓGICA: Alto risco de colapso cardiovascular peri-intubação! Realizar volume prévio e ter vasopressor em bolus (Noradrenalina push-dose 10-20 mcg) pronto antes de induzir. Reduzir dose do indutor.';
  }

  // 1. Crash condition
  if (answers.isCardiacArrestOrPeriArrest) {
    return {
      recommendedTrack: 'CRASH',
      title: 'Trilha CRASH (Via Aérea Imediata)',
      rationale: 'Paciente em parada cardiorrespiratória (PCR), peri-parada ou coma profundo arreativo. Não há tempo hábil para sequência medicamentosa convencional. Laringoscopia imediata ou resgate precoce com dispositivo supraglótico.',
      urgencyLevel: 'immediate',
      physiologicalOptimizationAlert: alert,
    };
  }

  // 2. Severe anatomical difficulty
  if (answers.hasSevereDifficultAirwayAnatomy) {
    if (answers.teamTrainedInAwake) {
      return {
        recommendedTrack: 'AWAKE',
        title: 'Trilha AWAKE (Intubação Acordado)',
        rationale: 'Via aérea difícil anatômica crítica prevista com indicação de intubação acordado. Manutenção da respiração espontânea, topicalização anestésica e sedação leve titulada com videolaringo ou fibrobroncoscópio.',
        urgencyLevel: 'urgent',
        physiologicalOptimizationAlert: alert,
      };
    } else {
      return {
        recommendedTrack: 'DSI',
        title: 'Trilha DSI / KOBE (Sedação Dissociativa Protetora)',
        rationale: 'Via aérea difícil prevista, porém equipe sem domínio de técnica acordado ou paciente gravemente acidótico. Aplicação da estratégia DSI/KOBE com Cetamina dissociativa preservando drive e reflexos enquanto otimiza a via aérea.',
        urgencyLevel: 'urgent',
        physiologicalOptimizationAlert: alert,
      };
    }
  }

  // 3. Hypoxemia / Agitation
  if (answers.hasRefractoryHypoxemiaOrAgitation) {
    return {
      recommendedTrack: 'DSI',
      title: 'Trilha DSI (Sequência Atrasada de Intubação)',
      rationale: 'Paciente hipoxêmico (SpO2 < 93%) ou agitado/delirante que não tolera pré-oxigenação com máscara. Administrar Cetamina em dose dissociativa para permitir 3 minutos de pré-oxigenação antes do bloqueador neuromuscular.',
      urgencyLevel: 'urgent',
      physiologicalOptimizationAlert: alert,
    };
  }

  // 4. Standard SRI
  return {
    recommendedTrack: 'SRI',
    title: 'Trilha SRI (Sequência Rápida de Intubação)',
    rationale: 'Paciente com indicação clássica de controle da via aérea em emergência, sem preditores críticos de VAD anatômica, com tempo para pré-oxigenação e preparo dos 7 Ps.',
    urgencyLevel: 'prepare',
    physiologicalOptimizationAlert: alert,
  };
}
