import { AlertTriangle, Droplets, Info, Sparkles, CheckCircle2, ShieldBan } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { getAllCalculatedDoses } from '../../engines/drugCalculator';

export function PharmacologyTab() {
  const {
    weightKg,
    setWeightKg,
    conditions,
    toggleCondition,
    currentTrack,
    setIsPushDoseModalOpen
  } = useClinical();

  const weights = [50, 60, 70, 80, 90, 100];
  const calculatedDoses = getAllCalculatedDoses(weightKg, conditions, currentTrack ?? 'SRI');

  const sedatives = calculatedDoses.filter(d => d.category === 'sedative');
  const paralytics = calculatedDoses.filter(d => d.category === 'paralytic');

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* 1. SELETOR DE PESO E CONDIÇÕES */}
      <div className="bg-white dark:bg-navy-800 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ajuste de Peso para Cálculo
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-slate-400">Peso:</span>
            <input
              type="number"
              value={weightKg}
              onChange={e => setWeightKg(Number(e.target.value))}
              min={10}
              max={250}
              className="w-16 px-2 py-0.5 text-xs font-black text-center border border-sky-400 rounded-lg bg-sky-50 dark:bg-navy-900 text-navy-900 dark:text-sky-200"
            />
            <span className="text-xs font-bold text-slate-500">kg</span>
          </div>
        </div>

        {/* Buttons */}
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
        </div>

        {/* Tags de Condição Clínica */}
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
            <span>🫁 Broncoespasmo</span>
          </button>

          <button
            onClick={() => toggleCondition('isTBI')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
              conditions.isTBI
                ? 'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-sm'
                : 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>🧠 TCE / Neuro</span>
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

        {/* Shock Push-Dose Alert & Quick Button */}
        {conditions.isShock && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Doses de indutores reduzidas devido ao choque peri-intubação.</span>
            </div>
            <button
              onClick={() => setIsPushDoseModalOpen(true)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shrink-0 flex items-center space-x-1"
            >
              <Droplets className="w-3 h-3" />
              <span>Push-Dose</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. PARTICULARIDADES POR TRILHA */}
      {currentTrack === 'CRASH' && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-900 dark:text-red-200">
          <p className="font-bold flex items-center space-x-1.5 text-emergency">
            <AlertTriangle className="w-4 h-4" />
            <span>ALERTA DE CONDUTA — VIA AÉREA CRASH</span>
          </p>
          <p className="mt-1 leading-relaxed">
            Em paciente arreativo / PCR / peri-parada, <strong>NÃO há tempo</strong> para indução medicamentosa convencional. Proceder com laringoscopia imediata. As doses abaixo servem apenas como apoio caso haja tônus mandibular residual após retorno de circulação espontânea (RCE).
          </p>
        </div>
      )}

      {currentTrack === 'AWAKE' && (
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-teal-800 dark:text-teal-200 font-extrabold text-sm">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Protocolo de Topicalização da Via Aérea (Awake)</span>
          </div>
          
          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-teal-100 dark:border-teal-900">
              <p className="font-bold text-slate-900 dark:text-white">1. Anestesia Tópica da Orofaringe</p>
              <p>• <strong>Lidocaína 10% spray:</strong> 4 a 6 borrifadas na orofaringe posterior e base da língua (máx. 20 borrifadas = 200 mg).</p>
              <p>• <strong>Lidocaína 2% gel:</strong> Aplicar na narina e laringoscópio se necessário.</p>
            </div>

            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-teal-100 dark:border-teal-900">
              <p className="font-bold text-slate-900 dark:text-white">2. Sedação Mínima Titulada (Manter Ventilação Espontânea)</p>
              <p>• <strong>Cetamina em microdoses:</strong> 0,2 a 0,5 mg/kg IV lento ({Math.round(weightKg * 0.3)} mg = {((weightKg * 0.3) / 50).toFixed(1)} mL da ampola 50 mg/mL).</p>
              <p>• <strong>Alerta:</strong> 🛑 <strong>NÃO ADMINISTRAR BLOQUEADOR NEUROMUSCULAR</strong> antes de certificar-se de que a via aérea está garantida e intubada!</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. INDUTORES / SEDATIVOS */}
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-navy-600 dark:text-sky-400 flex items-center space-x-1.5">
          <Info className="w-4 h-4" />
          <span>Indutores & Sedativos ({weightKg} kg)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sedatives.map(drug => (
            <div
              key={drug.drugId}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                drug.isContraindicated
                  ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-900'
                  : drug.isRecommended
                  ? 'bg-sky-50/60 dark:bg-navy-800 border-sky-400 dark:border-sky-500 ring-1 ring-sky-400'
                  : 'bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                      {drug.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{drug.presentationText}</p>
                  </div>

                  {drug.isContraindicated ? (
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-emergency flex items-center space-x-0.5 shrink-0">
                      <ShieldBan className="w-3 h-3" />
                      <span>Contraindicado</span>
                    </span>
                  ) : drug.isRecommended ? (
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-navy-600 dark:text-sky-300 flex items-center space-x-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>1ª Escolha</span>
                    </span>
                  ) : null}
                </div>

                {/* Big Calculation Box */}
                {!drug.isContraindicated ? (
                  <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 flex items-center justify-around text-center">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Dose (mg)</span>
                      <span className="text-xl font-black text-navy-600 dark:text-sky-400">
                        {drug.doseMgText}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-navy-700" />
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Volume na Ampola</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">
                        {drug.volumeMlText}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="my-3 p-2.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-900 rounded-xl text-xs text-emergency font-medium leading-relaxed">
                    {drug.contraindicationReason}
                  </div>
                )}
              </div>

              {drug.clinicalNote && !drug.isContraindicated && (
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug bg-white/60 dark:bg-navy-900/40 p-2 rounded-lg border border-slate-100 dark:border-navy-800">
                  💡 {drug.clinicalNote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. BLOQUEADORES NEUROMUSCULARES (BNMs) */}
      {currentTrack !== 'AWAKE' && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-navy-600 dark:text-sky-400 flex items-center space-x-1.5">
            <Info className="w-4 h-4" />
            <span>Bloqueadores Neuromusculares ({weightKg} kg)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paralytics.map(drug => (
              <div
                key={drug.drugId}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                  drug.isContraindicated
                    ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-900'
                    : drug.isRecommended
                    ? 'bg-sky-50/60 dark:bg-navy-800 border-sky-400 dark:border-sky-500 ring-1 ring-sky-400'
                    : 'bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                        {drug.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{drug.presentationText}</p>
                    </div>

                    {drug.isContraindicated ? (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-emergency flex items-center space-x-0.5 shrink-0">
                        <ShieldBan className="w-3 h-3" />
                        <span>Contraindicado</span>
                      </span>
                    ) : drug.isRecommended ? (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-navy-600 dark:text-sky-300 flex items-center space-x-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>1ª Escolha</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Calculation Box */}
                  {!drug.isContraindicated ? (
                    <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 flex items-center justify-around text-center">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Dose (mg)</span>
                        <span className="text-xl font-black text-navy-600 dark:text-sky-400">
                          {drug.doseMgText}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-slate-200 dark:bg-navy-700" />
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Volume na Ampola</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">
                          {drug.volumeMlText}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="my-3 p-2.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-900 rounded-xl text-xs text-emergency font-medium leading-relaxed">
                      {drug.contraindicationReason}
                    </div>
                  )}
                </div>

                {drug.clinicalNote && !drug.isContraindicated && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug bg-white/60 dark:bg-navy-900/40 p-2 rounded-lg border border-slate-100 dark:border-navy-800">
                    💡 {drug.clinicalNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
