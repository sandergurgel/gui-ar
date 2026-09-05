import { Compass, Flame, Shield, Wind, Eye, Stethoscope, Droplets, CheckSquare, Activity, Minus, Plus, Zap, Brain, AlertTriangle } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { TrackType } from '../../types/clinical';

export function Dashboard() {
  const {
    setCurrentTrack,
    setIsTriageModalOpen,
    setIsLemonModalOpen,
    setIsPushDoseModalOpen,
    weightKg,
    setWeightKg,
    conditions,
    toggleCondition,
    lemonScore
  } = useClinical();

  const handleSelectTrack = (track: TrackType) => {
    setCurrentTrack(track);
  };

  const presets = [60, 75, 90];

  const conditionPills = [
    { key: 'isShock' as const, label: 'Choque / Hipotensão', icon: Zap, active: 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200' },
    { key: 'isBronchospasm' as const, label: 'Broncoespasmo / Asma', icon: Wind, active: 'bg-sky-100 dark:bg-sky-950/60 border-sky-400 text-sky-900 dark:text-sky-200' },
    { key: 'isTBI' as const, label: 'TCE / Neuroproteção', icon: Brain, active: 'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200' },
    { key: 'isHyperkalemiaRisk' as const, label: 'Risco de hipercalemia', icon: AlertTriangle, active: 'bg-red-100 dark:bg-red-950/60 border-red-400 text-red-900 dark:text-red-200' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5">
      
      {/* 1. HERO companhia — um gesto */}
      <div className="relative overflow-hidden rounded-3xl bg-navy-900 dark:bg-navy-950 text-white p-5 sm:p-7 shadow-xl shadow-navy-900/30 border border-navy-700">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Triagem da via aérea
            </h2>
            <p className="text-sm sm:text-base text-sky-200 mt-2 leading-relaxed">
              Em 15 segundos, definimos juntos a conduta. Respire — siga um passo de cada vez.
            </p>
          </div>

          <button
            onClick={() => setIsTriageModalOpen(true)}
            aria-label="Iniciar triagem guiada de 15 segundos"
            className="w-full sm:w-auto min-h-[56px] px-6 py-4 bg-sky-400 hover:bg-sky-300 text-navy-950 font-extrabold text-base rounded-2xl shadow-md flex items-center justify-center space-x-2 shrink-0 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
          >
            <Compass className="w-5 h-5 text-navy-950" />
            <span>Iniciar — 15 segundos</span>
          </button>
        </div>
      </div>

      {/* 2. Sobre o paciente — stepper calmo */}
      <div className="bg-white dark:bg-navy-800 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-navy-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-sky-500" aria-hidden="true" />
            <span>Sobre o paciente</span>
          </span>
          <span className="text-sm font-extrabold text-navy-600 dark:text-sky-300 tabular-nums" aria-live="polite">
            {weightKg} kg · {Object.values(conditions).filter(Boolean).length === 0 ? 'estável' : `${Object.values(conditions).filter(Boolean).length} condição(ões)`}
          </span>
        </div>

        {/* Stepper peso */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeightKg(weightKg - 1)}
            aria-label="Reduzir peso em 1 kg"
            className="min-w-[48px] min-h-[48px] rounded-2xl bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center justify-center gap-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl min-h-[48px] px-3">
            <input
              type="number"
              value={weightKg}
              onChange={e => setWeightKg(Number(e.target.value))}
              min={10}
              max={250}
              aria-label="Peso em kg para cálculo das doses"
              className="w-20 bg-transparent text-center text-lg font-extrabold text-slate-900 dark:text-white focus:outline-none tabular-nums"
            />
            <span className="text-sm text-slate-500">kg</span>
          </div>
          <button
            onClick={() => setWeightKg(weightKg + 1)}
            aria-label="Aumentar peso em 1 kg"
            className="min-w-[48px] min-h-[48px] rounded-2xl bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {presets.map(w => (
            <button
              key={w}
              onClick={() => setWeightKg(w)}
              aria-label={`Usar peso ${w} kg`}
              className={`flex-1 min-h-[48px] rounded-2xl font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-400 ${
                weightKg === w
                  ? 'bg-navy-600 text-white shadow-sm dark:bg-sky-500 dark:text-navy-950'
                  : 'bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {w} kg
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Peso para cálculo — ajustamos todas as doses em mg e mL. Faixa 10–250 kg; fora dela usamos o limite seguro mais próximo.</p>

        {/* Condições em disclosure — fora do primeiro olhar */}
        <details className="pt-1">
          <summary className="min-h-[48px] flex items-center justify-between cursor-pointer rounded-2xl px-1 text-sm font-bold text-slate-700 dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400">
            <span>Condições do paciente</span>
            <span className="text-xs font-bold text-slate-500" aria-live="polite">
              {Object.values(conditions).filter(Boolean).length === 0 ? 'Nenhuma' : `${Object.values(conditions).filter(Boolean).length} ativa(s)`}
            </span>
          </summary>
          <div className="flex items-center flex-wrap gap-2 pt-2" role="group" aria-label="Condições clínicas">
          {conditionPills.map(p => {
            const Icon = p.icon;
            const on = conditions[p.key];
            return (
              <button
                key={p.key}
                onClick={() => toggleCondition(p.key)}
                aria-pressed={on}
                className={`min-h-[48px] px-3.5 py-2 rounded-2xl text-sm font-semibold flex items-center space-x-2 border transition-all focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  on ? p.active + ' shadow-sm' : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{p.label}</span>
              </button>
            );
          })}
          </div>
        </details>
      </div>

      {/* 3. Trilhas — hierarquia calma */}
      <div>
        <div className="flex items-baseline justify-between mb-3 px-1">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
            Por onde começar
          </h3>
          <span className="text-xs text-slate-500">Na dúvida, faça a triagem acima</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <button
            onClick={() => handleSelectTrack('CRASH')}
            aria-label="Abrir trilha CRASH para parada ou peri-parada"
            className="text-left p-5 bg-white dark:bg-navy-800 border-2 border-red-200 dark:border-red-900/50 hover:border-red-500 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-red-400 min-h-[88px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                Imediato
              </span>
            </div>
            <span className="block text-lg font-extrabold text-slate-900 dark:text-white mt-3">
              CRASH
            </span>
            <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Parada, peri-parada ou coma arreativo. Laringoscopia imediata, sem sequência.
            </span>
          </button>

          <button
            onClick={() => handleSelectTrack('SRI')}
            aria-label="Abrir trilha SRI sequência rápida"
            className="text-left p-5 bg-navy-900 dark:bg-navy-800 border-2 border-navy-700 hover:border-sky-400 rounded-3xl shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 min-h-[88px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-400/20 text-sky-300 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-400/20 text-sky-200">
                Caminho habitual
              </span>
            </div>
            <span className="block text-lg font-extrabold text-white mt-3">
              SRI · Sequência rápida
            </span>
            <span className="block text-sm text-sky-200/90 mt-1 leading-relaxed">
              Controle clássico com 7 Ps, pré-oxigenação e indução simultânea.
            </span>
          </button>

          <button
            onClick={() => handleSelectTrack('DSI')}
            aria-label="Abrir trilha DSI KOBE para hipoxemia ou agitação"
            className="text-left p-5 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 hover:border-amber-400 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[88px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Hipoxemia / agitação
              </span>
            </div>
            <span className="block text-lg font-extrabold text-slate-900 dark:text-white mt-3">
              DSI / KOBE
            </span>
            <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Não tolera máscara. Cetamina dissociativa preservando a respiração.
            </span>
          </button>

          <button
            onClick={() => handleSelectTrack('AWAKE')}
            aria-label="Abrir trilha Awake para via aérea difícil anatômica"
            className="text-left p-5 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 hover:border-teal-400 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-teal-400 min-h-[88px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                Via aérea difícil
              </span>
            </div>
            <span className="block text-lg font-extrabold text-slate-900 dark:text-white mt-3">
              Awake · Acordado
            </span>
            <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Anatomia crítica prevista. Espontânea preservada, um passo de cada vez.
            </span>
          </button>

        </div>
      </div>

      {/* 4. Ferramentas calmas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        
        <button
          onClick={() => setIsLemonModalOpen(true)}
          aria-label="Abrir escore LEMON"
          className="min-h-[64px] p-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-2xl flex items-center space-x-3 text-left shadow-sm hover:border-sky-400 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <Stethoscope className="w-5 h-5 text-sky-500 shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Escore LEMON</span>
            <span className="block text-xs text-slate-500" aria-live="polite">
              {lemonScore > 0 ? `${lemonScore} ponto(s) — toque para revisar` : 'Previsão de via difícil'}
            </span>
          </span>
        </button>

        <button
          onClick={() => setIsPushDoseModalOpen(true)}
          aria-label="Abrir guia push-dose de vasopressor"
          className="min-h-[64px] p-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-2xl flex items-center space-x-3 text-left shadow-sm hover:border-amber-400 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Droplets className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Push-dose</span>
            <span className="block text-xs text-slate-500">Noradrenalina em bolus</span>
          </span>
        </button>

        <button
          onClick={() => handleSelectTrack('SRI')}
          aria-label="Abrir checklist 7 Ps"
          className="min-h-[64px] p-4 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-2xl flex items-center space-x-3 text-left shadow-sm hover:border-navy-500 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <CheckSquare className="w-5 h-5 text-navy-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Checklist 7 Ps</span>
            <span className="block text-xs text-slate-500">Preparo guiado e calmo</span>
          </span>
        </button>

      </div>

      <div className="pt-2 text-center text-slate-500 text-xs space-y-1">
        <p className="font-medium">Funciona offline — pode instalar na tela inicial e usar na ambulância.</p>
        <p className="font-medium">Gui-Ar • Mestrado Profissional PRFUG / DMD / CCS / UEM</p>
        <p>Silvio F. Tolentino • Orient. Prof. Dr. Sanderland J. T. Gurgel</p>
      </div>

    </div>
  );
}
