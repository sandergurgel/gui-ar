import { X, Check, Stethoscope, AlertTriangle } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function LemonModal() {
  const { isLemonModalOpen, setIsLemonModalOpen, lemonState, toggleLemonItem, resetLemon, lemonScore } = useClinical();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
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
            className="p-1 rounded-full hover:bg-navy-500/50 transition-colors"
            aria-label="Fechar"
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
          <div className="space-y-2">
            {criteria.map(item => {
              const checked = lemonState[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleLemonItem(item.key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 select-none ${
                    checked
                      ? 'bg-sky-50/80 dark:bg-navy-800 border-sky-400 dark:border-sky-500 text-navy-900 dark:text-sky-100 shadow-sm'
                      : 'bg-slate-50 dark:bg-navy-800/40 border-slate-200 dark:border-navy-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                      checked
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-200 dark:bg-navy-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {checked ? <Check className="w-4 h-4" /> : item.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold leading-tight">{item.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-navy-800 px-4 py-2.5 flex items-center justify-between border-t border-slate-200 dark:border-navy-700">
          <button
            onClick={resetLemon}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Limpar Escore
          </button>
          <button
            onClick={() => setIsLemonModalOpen(false)}
            className="px-4 py-1.5 bg-navy-600 hover:bg-navy-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Concluir ({lemonScore} pts)
          </button>
        </div>

      </div>
    </div>
  );
}
