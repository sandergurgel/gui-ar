import { useState } from 'react';
import { X, Compass, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle, Stethoscope, Droplets } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { runTriage } from '../../engines/triageEngine';
import { TriageAnswers, TriageResult } from '../../types/clinical';

export function TriageModal() {
  const {
    isTriageModalOpen,
    setIsTriageModalOpen,
    setCurrentTrack,
    setCondition,
    setIsLemonModalOpen,
    setIsPushDoseModalOpen
  } = useClinical();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<TriageAnswers>({
    isCardiacArrestOrPeriArrest: false,
    hasShockOrInstability: false,
    hasSevereDifficultAirwayAnatomy: false,
    teamTrainedInAwake: false,
    hasRefractoryHypoxemiaOrAgitation: false,
  });

  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);

  if (!isTriageModalOpen) return null;

  const handleClose = () => {
    setIsTriageModalOpen(false);
    setCurrentStep(1);
    setTriageResult(null);
  };

  const handleStep1 = (isCardiacArrest: boolean) => {
    const updated = { ...answers, isCardiacArrestOrPeriArrest: isCardiacArrest };
    setAnswers(updated);

    if (isCardiacArrest) {
      const res = runTriage(updated);
      setTriageResult(res);
      setCurrentStep(5); // Go straight to result
    } else {
      setCurrentStep(2);
    }
  };

  const handleStep2 = (hasShock: boolean) => {
    const updated = { ...answers, hasShockOrInstability: hasShock };
    setAnswers(updated);
    if (hasShock) {
      setCondition('isShock', true);
    }
    setCurrentStep(3);
  };

  const handleStep3 = (hasVAD: boolean, trainedAwake = false) => {
    const updated = {
      ...answers,
      hasSevereDifficultAirwayAnatomy: hasVAD,
      teamTrainedInAwake: trainedAwake,
    };
    setAnswers(updated);

    if (hasVAD) {
      const res = runTriage(updated);
      setTriageResult(res);
      setCurrentStep(5); // Direct to Awake or DSI
    } else {
      setCurrentStep(4);
    }
  };

  const handleStep4 = (hasHypoxemiaOrAgitation: boolean) => {
    const updated = {
      ...answers,
      hasRefractoryHypoxemiaOrAgitation: hasHypoxemiaOrAgitation,
    };
    setAnswers(updated);
    const res = runTriage(updated);
    setTriageResult(res);
    setCurrentStep(5);
  };

  const handleSelectRecommendedTrack = () => {
    if (triageResult) {
      setCurrentTrack(triageResult.recommendedTrack);
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-navy-600 dark:bg-navy-950 px-4 py-3 text-white flex items-center justify-between border-b border-navy-500/30">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="font-bold text-base leading-tight">Triagem Rápida da Via Aérea</h2>
              <p className="text-xs text-sky-200">Classificação Clínica Guiada (&lt; 15 segundos)</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-navy-500/50 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {currentStep < 5 && (
          <div className="bg-slate-100 dark:bg-navy-800/80 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-navy-700 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Etapa {currentStep} de 4
            </span>
            <div className="flex space-x-1.5">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`w-5 h-1.5 rounded-full transition-all ${
                    s === currentStep
                      ? 'bg-sky-500 w-8'
                      : s < currentStep
                      ? 'bg-navy-500'
                      : 'bg-slate-300 dark:bg-navy-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 overflow-y-auto space-y-4">
          
          {/* STEP 1: PCR / Coma Agônico */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emergency">
                  1. Gravidade Imediata
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                  O paciente está em Parada Cardiorrespiratória (PCR), peri-parada iminente ou coma profundo arreativo?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Não há tempo hábil para sequência medicamentosa convencional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleStep1(true)}
                  className="p-3.5 bg-emergency hover:bg-red-700 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  SIM — Parada ou Peri-Parada (CRASH)
                </button>
                <button
                  onClick={() => handleStep1(false)}
                  className="p-3.5 bg-navy-600 hover:bg-navy-500 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  NÃO — Paciente com Pulso e Estável para Preparo
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choque / Instabilidade Hemodinâmica */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  2. Otimização Hemodinâmica
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                  O paciente apresenta Choque ou Instabilidade Hemodinâmica (PAS &lt; 90 mmHg, choque séptico/cardiogênico/hipovolêmico)?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Permite ligar a bandeira de ressuscitação fisiológica e ajustar doses.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPushDoseModalOpen(true)}
                  className="text-xs text-amber-600 dark:text-amber-400 font-semibold underline flex items-center space-x-1"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Ver receita de Noradrenalina Push-Dose</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleStep2(true)}
                  className="p-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  SIM — Paciente com Choque / PAS &lt; 90
                </button>
                <button
                  onClick={() => handleStep2(false)}
                  className="p-3.5 bg-navy-600 hover:bg-navy-500 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  NÃO — Normotenso / Hemodinâmica Estável
                </button>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center space-x-1 mt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para etapa 1</span>
              </button>
            </div>
          )}

          {/* STEP 3: VAD Anatômica Prevista & LEMON */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-sky-50 dark:bg-navy-800 border border-sky-200 dark:border-navy-700 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  3. Avaliação Anatômica
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                  Há sinais de Via Aérea Difícil Anatômica Crítica Prevista (estridor laringotraqueal, tumor glótico/cervical, hematoma expansivo, trauma facial severo)?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Risco elevado de colapso da via aérea caso o paciente perca a respiração espontânea.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLemonModalOpen(true)}
                  className="text-xs text-sky-600 dark:text-sky-400 font-semibold underline flex items-center space-x-1"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Checar critérios do Escore LEMON</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="p-3 border border-slate-200 dark:border-navy-700 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Se HOUVER Via Aérea Difícil Anatômica Grave:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStep3(true, true)}
                      className="p-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      SIM: Equipe capacitada para Intubação Acordado (AWAKE)
                    </button>
                    <button
                      onClick={() => handleStep3(true, false)}
                      className="p-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      SIM: Equipe sem experiência em Awake (DSI / KOBE)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleStep3(false)}
                  className="w-full p-3.5 bg-navy-600 hover:bg-navy-500 text-white font-bold rounded-xl shadow-sm text-center transition-colors"
                >
                  NÃO — Sem Preditores de VAD Anatômica Grave
                </button>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para etapa 2</span>
              </button>
            </div>
          )}

          {/* STEP 4: Hipoxemia / Agitação */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  4. Oxigenação & Agitação
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                  O paciente tem hipoxemia refratária (SpO2 &lt; 93%), agitação severa, delírio ou recusa/arranca a máscara?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Incapacidade de tolerar os 3 minutos de pré-oxigenação antes do bloqueador neuromuscular.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleStep4(true)}
                  className="p-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  SIM — Hipoxêmico ou Agitado (DSI)
                </button>
                <button
                  onClick={() => handleStep4(false)}
                  className="p-3.5 bg-navy-600 hover:bg-navy-500 text-white font-bold rounded-xl shadow-sm text-center active:scale-95 transition-all"
                >
                  NÃO — Pré-Oxigenação Adequada (SRI Padrão)
                </button>
              </div>

              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para etapa 3</span>
              </button>
            </div>
          )}

          {/* STEP 5: RESULT */}
          {currentStep === 5 && triageResult && (
            <div className="space-y-4 animate-in zoom-in-95">
              
              {/* Card Resultado */}
              <div className="p-4 rounded-2xl border-2 border-navy-500 dark:border-sky-500 bg-slate-50 dark:bg-navy-800">
                <div className="flex items-center space-x-2 text-navy-600 dark:text-sky-400 mb-1">
                  <CheckCircle className="w-5 h-5 text-sky-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Estratégia Recomendada
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {triageResult.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  {triageResult.rationale}
                </p>

                {triageResult.physiologicalOptimizationAlert && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 text-xs">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{triageResult.physiologicalOptimizationAlert}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Botão de Ação */}
              <button
                onClick={handleSelectRecommendedTrack}
                className="w-full py-3.5 px-4 bg-navy-600 hover:bg-navy-500 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-navy-600/30 flex items-center justify-center space-x-2 active:scale-95 transition-all"
              >
                <span>Acessar {triageResult.recommendedTrack} Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentStep(1)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 py-1"
              >
                Refazer Triagem
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
