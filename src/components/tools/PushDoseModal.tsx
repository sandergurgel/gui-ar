import { X, Activity, Droplets, AlertTriangle } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function PushDoseModal() {
  const { isPushDoseModalOpen, setIsPushDoseModalOpen } = useClinical();

  if (!isPushDoseModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-amber-600 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 animate-pulse" />
            <div>
              <h2 className="font-bold text-base leading-tight">Vasopressor em Bolus (Push-Dose)</h2>
              <p className="text-xs text-amber-100 font-medium">Prevenção do Colapso Cardiovascular</p>
            </div>
          </div>
          <button
            onClick={() => setIsPushDoseModalOpen(false)}
            className="p-1 rounded-full hover:bg-amber-700 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
          
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start space-x-2 text-amber-900 dark:text-amber-200 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Indicação:</strong> Pacientes com PAS &lt; 90 mmHg, choque séptico, cardiogênico ou hipovolêmico para manter a perfusão coronariana e cerebral durante a indução.
            </span>
          </div>

          {/* Noradrenalina */}
          <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-3 bg-slate-50 dark:bg-navy-800/60">
            <div className="flex items-center space-x-1.5 font-bold text-navy-600 dark:text-sky-400 mb-2">
              <Droplets className="w-4 h-4" />
              <span>1. Noradrenalina em Bolus (10 mcg/mL)</span>
            </div>
            
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700">
                <p className="font-semibold text-slate-900 dark:text-white">Como Diluir:</p>
                <p>Aspirar <strong>1 mL da ampola de Noradrenalina</strong> (1 mg/mL) e injetar em um frasco ou bolsa de <strong>99 mL de SF 0,9%</strong>.</p>
                <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium mt-0.5">
                  ➔ Concentração final: 10 mcg/mL.
                </p>
              </div>

              <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700">
                <p className="font-semibold text-slate-900 dark:text-white">Posologia na Emergência:</p>
                <p>Injetar <strong>1 a 2 mL (10 a 20 mcg)</strong> em bolus IV a cada 2 a 5 minutos.</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Meta: PAS &gt; 90 mmHg / PAM &gt; 65 mmHg antes e durante a laringoscopia.
                </p>
              </div>
            </div>
          </div>

          {/* Adrenalina Alternativa */}
          <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-3 bg-slate-50 dark:bg-navy-800/60">
            <div className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300 mb-2">
              <Droplets className="w-4 h-4" />
              <span>2. Adrenalina em Bolus (Alternativa: 10 mcg/mL)</span>
            </div>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p>• Aspirar 1 mL da ampola (1:1.000 = 1 mg/mL) em 99 mL de SF 0,9% (10 mcg/mL).</p>
              <p>• Administrar 0,5 a 2 mL (5 a 20 mcg) IV a cada 2 a 5 minutos.</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-navy-800 px-4 py-2.5 flex justify-end border-t border-slate-200 dark:border-navy-700">
          <button
            onClick={() => setIsPushDoseModalOpen(false)}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Fechar Guia
          </button>
        </div>

      </div>
    </div>
  );
}
