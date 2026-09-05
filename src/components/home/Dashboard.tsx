import { Compass, Flame, Shield, Wind, Eye, Stethoscope, Droplets, CheckSquare, Zap, Activity } from 'lucide-react';
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

  const weights = [50, 60, 70, 80, 90, 100];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      
      {/* 1. HERO: Triagem Rápida */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-600 to-navy-500 text-white p-4 sm:p-5 shadow-lg border border-navy-400/30">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-200 text-xs font-semibold mb-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Apoio Decisório em Crise</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Triagem Rápida da Via Aérea
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl mt-0.5">
              Responda a até 4 perguntas objetivas para definir a melhor conduta entre Crash, SRI, DSI/KOBE ou Awake em menos de 15 segundos.
            </p>
          </div>

          <button
            onClick={() => setIsTriageModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 bg-sky-400 hover:bg-sky-300 text-navy-950 font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 shrink-0 active:scale-95 transition-all"
          >
            <Compass className="w-5 h-5 text-navy-950" />
            <span>Iniciar Triagem</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-6 -bottom-10 w-40 h-40 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Parâmetros Rápidos do Paciente (Peso & Condições) */}
      <div className="bg-white dark:bg-navy-800 rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-navy-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <Activity className="w-4 h-4 text-sky-500" />
            <span>Ajuste Rápido do Paciente</span>
          </span>
          <span className="text-xs font-extrabold text-navy-600 dark:text-sky-400">
            Peso Selecionado: {weightKg} kg
          </span>
        </div>

        {/* Peso Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {weights.map(w => (
            <button
              key={w}
              onClick={() => setWeightKg(w)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                weightKg === w
                  ? 'bg-navy-600 text-white shadow-sm dark:bg-sky-500 dark:text-navy-950'
                  : 'bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {w} kg
            </button>
          ))}
          <div className="flex items-center space-x-1 pl-1 shrink-0">
            <input
              type="number"
              value={weightKg}
              onChange={e => setWeightKg(Number(e.target.value))}
              min={10}
              max={250}
              className="w-16 px-2 py-1 text-xs font-bold text-center border border-slate-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
            />
            <span className="text-[11px] text-slate-400">kg</span>
          </div>
        </div>

        {/* Tags Clínicas */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => toggleCondition('isShock')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
              conditions.isShock
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200 shadow-sm'
                : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>⚡ Choque / Hipotensão</span>
          </button>

          <button
            onClick={() => toggleCondition('isBronchospasm')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
              conditions.isBronchospasm
                ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-400 text-sky-900 dark:text-sky-200 shadow-sm'
                : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>🫁 Broncoespasmo / Asma</span>
          </button>

          <button
            onClick={() => toggleCondition('isTBI')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
              conditions.isTBI
                ? 'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-sm'
                : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>🧠 TCE / Neuroproteção</span>
          </button>

          <button
            onClick={() => toggleCondition('isHyperkalemiaRisk')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
              conditions.isHyperkalemiaRisk
                ? 'bg-red-100 dark:bg-red-950/60 border-red-400 text-red-900 dark:text-red-200 shadow-sm'
                : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>⚠️ Risco de Hipercalemia</span>
          </button>
        </div>
      </div>

      {/* 3. AS 4 TRILHAS CLÍNICAS (Cards de Acesso Direto) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Acesso Direto às Trilhas Clínicas
          </h3>
          <span className="text-xs text-slate-400">Toque para abrir</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Card 1: CRASH */}
          <div
            onClick={() => handleSelectTrack('CRASH')}
            className="group p-4 bg-white dark:bg-navy-800 border-2 border-red-200 dark:border-red-900/50 hover:border-emergency rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/80 text-emergency flex items-center justify-center font-black">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-emergency">
                Imediato
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3 group-hover:text-emergency transition-colors">
              CRASH
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Parada cardiorrespiratória (PCR), peri-parada ou coma profundo arreativo. Sem tempo para sequência medicamentosa.
            </p>
          </div>

          {/* Card 2: SRI */}
          <div
            onClick={() => handleSelectTrack('SRI')}
            className="group p-4 bg-white dark:bg-navy-800 border-2 border-sky-200 dark:border-sky-900/50 hover:border-sky-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-navy-600 dark:text-sky-400 flex items-center justify-center font-black">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                Padrão Ouro
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3 group-hover:text-navy-600 dark:group-hover:text-sky-400 transition-colors">
              SRI (Sequência Rápida)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Controle clássico de emergência com risco de aspiração. Preparo dos 7 Ps, pré-oxigenação e paralisia com indução simultânea.
            </p>
          </div>

          {/* Card 3: DSI / KOBE */}
          <div
            onClick={() => handleSelectTrack('DSI')}
            className="group p-4 bg-white dark:bg-navy-800 border-2 border-amber-200 dark:border-amber-900/50 hover:border-amber-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center font-black">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                Hipoxemia / Agitação
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3 group-hover:text-amber-600 transition-colors">
              DSI / KOBE
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Sequência Atrasada. Paciente que não tolera pré-oxigenação ou VAD fisiológica. Sedação dissociativa com Cetamina preservando drive.
            </p>
          </div>

          {/* Card 4: AWAKE */}
          <div
            onClick={() => handleSelectTrack('AWAKE')}
            className="group p-4 bg-white dark:bg-navy-800 border-2 border-teal-200 dark:border-teal-900/50 hover:border-teal-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 flex items-center justify-center font-black">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                VAD Anatômica
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mt-3 group-hover:text-teal-600 transition-colors">
              AWAKE (Intubação Acordado)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Via aérea difícil anatômica crítica prevista. Topicalização da orofaringe, sedação mínima titulada e ventilação espontânea preservada.
            </p>
          </div>

        </div>
      </div>

      {/* 4. ATALHOS CLÍNICOS RÁPIDOS */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        
        {/* LEMON */}
        <button
          onClick={() => setIsLemonModalOpen(true)}
          className="p-3 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:border-sky-400 transition-colors active:scale-95"
        >
          <Stethoscope className="w-5 h-5 text-sky-500 mb-1" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Escore LEMON</span>
          <span className="text-[10px] text-slate-400">
            {lemonScore > 0 ? `${lemonScore} pts marcados` : 'VAD Anatômica'}
          </span>
        </button>

        {/* Push-Dose */}
        <button
          onClick={() => setIsPushDoseModalOpen(true)}
          className="p-3 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:border-amber-400 transition-colors active:scale-95"
        >
          <Droplets className="w-5 h-5 text-amber-500 mb-1" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Push-Dose Pressor</span>
          <span className="text-[10px] text-slate-400">Noradrenalina Bolus</span>
        </button>

        {/* Checklist */}
        <button
          onClick={() => handleSelectTrack('SRI')}
          className="p-3 bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:border-navy-500 transition-colors active:scale-95"
        >
          <CheckSquare className="w-5 h-5 text-navy-600 dark:text-sky-400 mb-1" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Checklist 7 Ps</span>
          <span className="text-[10px] text-slate-400">Preparo Completo</span>
        </button>

      </div>

      {/* 5. Nota Acadêmica & Institucional */}
      <div className="pt-2 text-center text-slate-400 text-[11px]">
        <p className="font-medium">Gui-Ar • Mestrado Profissional PRFUG / DMD / CCS / UEM</p>
        <p className="text-[10px] mt-0.5">Pesquisador: Silvio F. Tolentino • Orientador: Prof. Dr. Sanderland J. T. Gurgel</p>
      </div>

    </div>
  );
}
