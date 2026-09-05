import { useState } from 'react';
import { CheckCircle2, Wind, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function PostIntubationTab() {
  const { weightKg } = useClinical();

  // Mechanical ventilation calculator based on height and sex
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(170);

  // Predicted Body Weight (PBW) formula:
  // Male: 50 + 0.91 * (height - 152.4)
  // Female: 45.5 + 0.91 * (height - 152.4)
  const pbw =
    sex === 'male'
      ? Math.round((50 + 0.91 * (heightCm - 152.4)) * 10) / 10
      : Math.round((45.5 + 0.91 * (heightCm - 152.4)) * 10) / 10;

  const validPbw = Math.max(30, Math.min(120, pbw));
  const tidalVolume6 = Math.round(validPbw * 6);
  const tidalVolume8 = Math.round(validPbw * 8);

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* 1. CONFIRMAÇÃO DA POSIÇÃO DO TUBO */}
      <div className="bg-white dark:bg-navy-800 p-4 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-navy-600 dark:text-sky-400 font-extrabold text-sm sm:text-base">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <span>1. Confirmação do Tubo Traqueal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl space-y-1">
            <span className="font-extrabold text-success uppercase tracking-wider block">
              Padrão-Ouro (Primário)
            </span>
            <p className="font-bold text-slate-900 dark:text-white">
              Capnografia Contínua com Onda (EtCO2)
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Observar curva gráfica retangular por pelo menos 6 ciclos respiratórios completos. Ausência de onda = esôfago até prova em contrário!
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block">
              Confirmação Secundária
            </span>
            <p className="font-bold text-slate-900 dark:text-white">
              Ausculta em 5 Pontos & Expansão
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              1º Epigástrio (silêncio total / sem borborigmo) ➔ 2º Ápices e bases pulmonares bilaterais simétricas.
            </p>
          </div>
        </div>

        <div className="p-2.5 bg-sky-50 dark:bg-navy-900/60 rounded-xl border border-sky-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span><strong>Fixação do Tubo:</strong> Registrar profundidade na rima labial</span>
          <span className="font-bold text-navy-600 dark:text-sky-400 bg-white dark:bg-navy-800 px-2 py-0.5 rounded border border-slate-200 dark:border-navy-700">
            21 a 23 cm (Adulto)
          </span>
        </div>
      </div>

      {/* 2. VENTILAÇÃO MECÂNICA PROTETORA INICIAL */}
      <div className="bg-white dark:bg-navy-800 p-4 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-navy-600 dark:text-sky-400 font-extrabold text-sm sm:text-base">
            <Wind className="w-5 h-5 text-sky-500" />
            <span>2. Ventilação Protetora Inicial (6 mL/kg Predito)</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Diretriz Brasileira de VM</span>
        </div>

        {/* Height and Sex Input */}
        <div className="p-3 bg-slate-50 dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-600 dark:text-slate-300">Sexo Biológico:</span>
            <div className="inline-flex rounded-lg border border-slate-300 dark:border-navy-700 overflow-hidden">
              <button
                onClick={() => setSex('male')}
                className={`px-3 py-1 font-bold transition-colors ${
                  sex === 'male'
                    ? 'bg-navy-600 text-white dark:bg-sky-500 dark:text-navy-950'
                    : 'bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Masc
              </button>
              <button
                onClick={() => setSex('female')}
                className={`px-3 py-1 font-bold transition-colors ${
                  sex === 'female'
                    ? 'bg-navy-600 text-white dark:bg-sky-500 dark:text-navy-950'
                    : 'bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Fem
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-600 dark:text-slate-300">Altura:</span>
            <input
              type="number"
              value={heightCm}
              onChange={e => setHeightCm(Number(e.target.value))}
              min={130}
              max={220}
              className="w-16 px-2 py-1 font-bold text-center border border-slate-300 dark:border-navy-600 rounded-lg bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
            />
            <span className="font-bold text-slate-400">cm</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Peso Predito (PBW)</span>
            <span className="font-black text-navy-600 dark:text-sky-400 text-sm">
              {validPbw} kg
            </span>
          </div>
        </div>

        {/* Calculated Ventilator Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 bg-sky-50/70 dark:bg-navy-900/60 border border-sky-200 dark:border-navy-700 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Volume Corrente (VC)</span>
            <span className="text-xl font-black text-navy-600 dark:text-sky-400">
              {tidalVolume6} mL
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">6 mL/kg (faixa: {tidalVolume6}-{tidalVolume8})</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-700 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">PEEP Inicial</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              5 a 8
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">cmH2O</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-700 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Freq. Respiratória</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              12 a 16
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">rpm</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-700 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">FiO2 Inicial</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              100%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Titular p/ SpO2 92-96%</span>
          </div>
        </div>
      </div>

      {/* 3. SEDOANALGESIA CONTÍNUA */}
      <div className="bg-white dark:bg-navy-800 p-4 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-navy-600 dark:text-sky-400 font-extrabold text-sm sm:text-base">
          <HeartHandshake className="w-5 h-5 text-indigo-500" />
          <span>3. Sedoanalgesia Contínua em Bomba de Infusão</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Iniciar antes do término do efeito do indutor inicial para evitar despertar em pânico e assincronia:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 space-y-1">
            <p className="font-bold text-slate-900 dark:text-white">
              • Analgesia: Fentanil (50 mcg/mL puro)
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Iniciar a 1 a 2 mcg/kg/hora. Exemplo {weightKg} kg: <strong>1,5 a 3 mL/hora</strong> em BIC.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 space-y-1">
            <p className="font-bold text-slate-900 dark:text-white">
              • Sedação: Midazolam (5 mg/mL) ou Cetamina ou Propofol
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Midazolam diluído (50 mg em 90 mL SF = 0,5 mg/mL) ou puro em BIC para meta de RASS -4 a -3 nas primeiras horas.
            </p>
          </div>
        </div>
      </div>

      {/* 4. VIGILÂNCIA E RX DE TÓRAX */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs space-y-2">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200 font-bold">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Vigilância Hemodinâmica & Imagem</span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          • <strong>Queda da Pressão Arterial:</strong> A transição para ventilação com pressão positiva reduz o retorno venoso e pode precipitar hipotensão grave. Mantenha drogas vasoativas disponíveis.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          • <strong>Radiografia de Tórax no Leito:</strong> Solicitar imediatamente para confirmar altura da ponta do tubo (3 a 4 cm acima da carina) e excluir pneumotórax ou intubação seletiva.
        </p>
      </div>

    </div>
  );
}
