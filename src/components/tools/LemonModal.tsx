import { useEffect } from 'react';
import { X, Check, Stethoscope, AlertTriangle, RotateCcw } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function LemonModal() {
  const { isLemonModalOpen, setIsLemonModalOpen, lemonState, toggleLemonItem, resetLemon, lemonScore } = useClinical();

  useEffect(() => {
    if (!isLemonModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLemonModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLemonModalOpen, setIsLemonModalOpen]);

  if (!isLemonModalOpen) return null;

  const criteria = [
    {
      key: 'lookExternal' as const,
      letter: 'L',
      name: 'Look Externally (Inspeção Externa)',
      desc: 'Trauma facial, dentes proeminentes, barba espessa, retrognatismo, obesidade mórbida, bócio visível.',
    },
    {
      key: 'eval332' as const,
      letter: 'E',
      name: 'Evaluate 3-3-2 (Regra 3-3-2)',
      desc: 'Abertura de boca < 3 dedos (< 4 cm); distância mento-hióide < 3 dedos; distância tireo-hióide < 2 dedos.',
    },
    {
      key: 'mallampati' as const,
      letter: 'M',
      name: 'Mallampati (Classe III ou IV)',
      desc: 'Visualização apenas do palato mole (III) ou somente palato duro (IV) com a boca aberta e língua protusa.',
    },
    {
      key: 'obstruction' as const,
      letter: 'O',
      name: 'Obstruction (Obstrução da Via Aérea)',
      desc: 'Estridor inspiratório, sialorreia/dificuldade de engolir, massa tumoral, abscesso periamigdaliano, hematoma.',
    },
    {
      key: 'neckMobility' as const,
      letter: 'N',
      name: 'Neck Mobility (Mobilidade Cervical)',
      desc: 'Colar cervical por trauma, espondilite anquilosante, artrose severa ou incapacidade de flexo-extensão.',
    },
  ];

  let riskLevel = 'Baixo Risco';
  let riskColor = 'text-success bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800';
  let riskAdvice = 'Menor probabilidade de laringoscopia difícil, mas mantenha material de resgate à mão.';

  if (lemonScore >= 3) {
    riskLevel = 'Alto Risco de Via Aérea Difícil';
    riskColor = 'text-emergency bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800';
    riskAdvice = 'Forte indicação de Videolaringoscópio na 1ª tentativa, Bougie imediato e considerar estratégia AWAKE ou DSI.';
  } else if (lemonScore >= 1) {
    riskLevel = 'Risco Moderado';
    riskColor = 'text-warning bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    riskAdvice = 'Preparar Bougie pré-carregado e ter dispositivo supraglótico testado na cabeceira.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Escore LEMON">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-navy-600 dark:bg-navy-950 px-4 py-3 text-white flex items-center justify-between border-b border-navy-500/30">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="font-bold text-base leading-tight">Escore LEMON Rápido</h2>
              <p className="text-xs text-sky-200">Predição Anatômica de Via Aérea Difícil</p>
            </div>
          </div>
          <button
            onClick={() => setIsLemonModalOpen(false)}
            aria-label="Fechar escore LEMON"
            className="min-w-[48px] min-h-[48px] p-2.5 rounded-2xl hover:bg-navy-700 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          
          {/* Score Alert */}
          <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${riskColor}`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm">Pontuação: {lemonScore} / 5</span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/40">
                  {riskLevel}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">{riskAdvice}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Toque nos critérios presentes para somar a pontuação:
          </p>

          {/* Criteria Checklist */}
          <div className="space-y-2.5" role="group" aria-label="Critérios LEMON">
            {criteria.map(item => {
              const checked = lemonState[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleLemonItem(item.key)}
                  aria-pressed={checked}
                  className={`w-full min-h-[64px] p-3.5 rounded-2xl border text-left transition-all flex items-start space-x-3 select-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    checked
                      ? 'bg-sky-50/80 dark:bg-navy-800 border-sky-400 dark:border-sky-500 text-navy-900 dark:text-sky-100 shadow-sm'
                      : 'bg-slate-50 dark:bg-navy-800/40 border-slate-200 dark:border-navy-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 transition-colors ${
                      checked
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-200 dark:bg-navy-700 text-slate-600 dark:text-slate-300'
                    }`}
                    aria-hidden="true"
                  >
                    {checked ? <Check className="w-4 h-4" /> : item.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold leading-tight">{item.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-navy-800 px-4 py-3 flex items-center justify-between gap-2 border-t border-slate-200 dark:border-navy-700">
          <button
            onClick={resetLemon}
            className="min-h-[48px] px-4 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Limpar escore</span>
          </button>
          <button
            onClick={() => setIsLemonModalOpen(false)}
            className="min-h-[48px] px-5 bg-navy-600 hover:bg-navy-500 text-white text-sm font-bold rounded-2xl shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 flex items-center justify-center space-x-2"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>Concluir ({lemonScore} pts)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
