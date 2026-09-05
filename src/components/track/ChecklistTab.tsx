import { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { CHECKLIST_7PS } from '../../data/checklists';

export function ChecklistTab() {
  const { checklistChecked, toggleChecklistItem, resetChecklist } = useClinical();
  const [armClear, setArmClear] = useState(false);

  useEffect(() => {
    if (!armClear) return;
    const t = setTimeout(() => setArmClear(false), 4000);
    return () => clearTimeout(t);
  }, [armClear]);

  const handleClear = () => {
    if (!armClear) {
      setArmClear(true);
      return;
    }
    setArmClear(false);
    resetChecklist();
  };

  const totalItems = CHECKLIST_7PS.length;
  const checkedCount = Object.values(checklistChecked).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItems) * 100);

  // Group by category
  const categories = [
    { cat: 'P1', title: 'P1 — Preparação (Equipamentos & Equipe)' },
    { cat: 'P2', title: 'P2 — Pré-Oxigenação' },
    { cat: 'P3', title: 'P3 — Pré-Otimização' },
    { cat: 'P4', title: 'P4 — Posicionamento' },
    { cat: 'P5', title: 'P5 — Paralisia e Indução Simultânea' },
    { cat: 'P6', title: 'P6 — Passagem do Tubo & Confirmação' },
    { cat: 'P7', title: 'P7 — Pós-Intubação' },
  ];

  return (
    <div className="space-y-4">
      
      {/* Progress Bar Header */}
      <div className="bg-white dark:bg-navy-800 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Checklist Operacional dos 7 Ps da SRI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {checkedCount} de {totalItems} itens verificados ({percentage}%)
              </p>
            </div>
          </div>

          <button
            onClick={handleClear}
            aria-label={armClear ? 'Confirmar limpeza da checklist' : 'Limpar checklist'}
            aria-live="polite"
            className={`min-h-[48px] px-3 text-sm font-semibold flex items-center space-x-1.5 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-400 ${armClear ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            title={armClear ? 'Toque de novo para confirmar' : 'Limpar checklist'}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{armClear ? 'Confirmar?' : 'Limpar'}</span>
          </button>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-slate-100 dark:bg-navy-900 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              percentage === 100
                ? 'bg-success'
                : percentage > 50
                ? 'bg-sky-500'
                : 'bg-navy-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map(category => {
          const items = CHECKLIST_7PS.filter(i => i.category === category.cat);

          return (
            <div
              key={category.cat}
              className="bg-white dark:bg-navy-800 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-navy-700 shadow-sm"
            >
              <h4 className="font-bold text-xs sm:text-sm text-navy-600 dark:text-sky-400 uppercase tracking-wide mb-2.5">
                {category.title}
              </h4>

              <div className="space-y-2">
                {items.map(item => {
                  const isChecked = Boolean(checklistChecked[item.id]);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      aria-pressed={isChecked}
                      className={`w-full min-h-[56px] p-3.5 rounded-2xl border text-left transition-all flex items-start space-x-3 focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        isChecked
                          ? 'bg-green-50/70 dark:bg-green-950/20 border-green-300 dark:border-green-800 text-slate-900 dark:text-slate-100'
                          : 'bg-slate-50 dark:bg-navy-900/60 border-slate-200 dark:border-navy-700 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-success text-white'
                            : 'border-2 border-slate-300 dark:border-navy-600 text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2">
                          <span
                            className={`text-sm font-bold ${
                              isChecked
                                ? 'line-through text-slate-500 dark:text-slate-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.isCritical && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" aria-hidden="true" />
                              <span>Crítico</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
