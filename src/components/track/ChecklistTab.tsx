import { CheckCircle2, RotateCcw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { CHECKLIST_7PS } from '../../data/checklists';

export function ChecklistTab() {
  const { checklistChecked, toggleChecklistItem, resetChecklist } = useClinical();

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
            onClick={resetChecklist}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center space-x-1 p-1.5"
            title="Limpar checklist"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Limpar</span>
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
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start space-x-3 ${
                        isChecked
                          ? 'bg-green-50/70 dark:bg-green-950/20 border-green-300 dark:border-green-800 text-slate-900 dark:text-slate-100'
                          : 'bg-slate-50 dark:bg-navy-900/60 border-slate-200 dark:border-navy-700 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-success text-white'
                            : 'border-2 border-slate-300 dark:border-navy-600 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs sm:text-sm font-bold ${
                              isChecked
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.isCritical && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950/60 text-emergency flex items-center space-x-0.5">
                              <AlertCircle className="w-2.5 h-2.5" />
                              <span>Crítico</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
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
