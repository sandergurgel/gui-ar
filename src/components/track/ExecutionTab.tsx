import { AlertOctagon, Flame, Shield, Wind, Eye, ChevronRight } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function ExecutionTab() {
  const { currentTrack, setIsSosModalOpen } = useClinical();

  return (
    <div className="space-y-4">
      
      {/* Track-specific instructions */}
      {currentTrack === 'CRASH' && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-emergency font-extrabold text-base">
            <Flame className="w-5 h-5" />
            <span>Conduta de Execução — Via Aérea CRASH</span>
          </div>
          
          <div className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-red-100 dark:border-red-900 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">1. Ação Imediata Sem Medicamentos</p>
              <p>Paciente arreativo / PCR. Iniciar laringoscopia direta ou videolaringoscopia imediatamente sem esperar medicações.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-red-100 dark:border-red-900 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">2. Uso Precoce de Bougie</p>
              <p>Inserir o Bougie sob visualização direta ou às cegas caso a laringoscopia seja Cormack-Lehane II ou III.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-red-100 dark:border-red-900 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">3. Falha Imediata? Inserir Dispositivo Supraglótico (DSG)</p>
              <p>Se houver qualquer dificuldade de intubação, passar Máscara Laríngea de 2ª geração sem hesitação para manter a oxigenação durante a RCP.</p>
            </div>
          </div>
        </div>
      )}

      {currentTrack === 'SRI' && (
        <div className="bg-sky-50/70 dark:bg-navy-800 border border-sky-200 dark:border-navy-700 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-navy-600 dark:text-sky-400 font-extrabold text-base">
            <Shield className="w-5 h-5" />
            <span>Conduta de Execução — Sequência Rápida (SRI)</span>
          </div>

          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Passo 1: Pré-Oxigenação Plena (3 a 5 minutos)</p>
              <p>Máscara com reservatório a 15 L/min. Meta: SpO2 &gt; 95% para maximizar o tempo de apneia segura.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Passo 2: Indução + Bloqueio em Sequência Rápida</p>
              <p>Infundir o indutor (ex: Etomidato) em bólus rápido, seguido imediatamente do bloqueador (ex: Rocurônio 1,2 mg/kg ou Succinilcolina).</p>
              <p className="text-amber-700 dark:text-amber-300 font-medium flex items-start gap-1.5">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Evite ventilar com pressão positiva durante a latência de 45-60s, exceto se SpO2 &lt; 90%. Com calma, um passo de cada vez.</span>
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-700 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Passo 3: Laringoscopia & Bougie</p>
              <p>Aos 45-60 segundos (relaxamento completo da mandíbula), introduzir laringoscópio, avançar Bougie na traqueia e passar o tubo.</p>
            </div>
          </div>
        </div>
      )}

      {currentTrack === 'DSI' && (
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-extrabold text-base">
            <Wind className="w-5 h-5" />
            <span>Conduta de Execução — Sequência Atrasada (DSI / KOBE)</span>
          </div>

          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Fase 1: Dissociação com Cetamina</p>
              <p>Infundir Cetamina 1,0 mg/kg IV lento (em 30-60 segundos). O paciente entrará em estado dissociativo (olhos abertos, nistagmo, respiração espontânea preservada).</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Fase 2: Pré-Oxigenação Eficaz (3 Minutos)</p>
              <p>Agora calmo e cooperativo, posicionar máscara não reinalante com reservatório ou VNI/CPAP com PEEP por 3 minutos até SpO2 &gt; 93-95%.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Fase 3: Paralisia & Intubação</p>
              <p>Com a oxigenação otimizada, administrar o bloqueador neuromuscular (Rocurônio 1,2 mg/kg), aguardar 60 segundos e intubar com Bougie.</p>
            </div>
          </div>
        </div>
      )}

      {currentTrack === 'AWAKE' && (
        <div className="bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-teal-700 dark:text-teal-400 font-extrabold text-base">
            <Eye className="w-5 h-5" />
            <span>Conduta de Execução — Intubação Acordado (AWAKE)</span>
          </div>

          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">1. Topicalização e Explicação ao Paciente</p>
              <p>Explicar cada etapa ao paciente. Aplicar Lidocaína 10% spray na orofaringe e base da língua para abolir reflexo de vômito.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">2. Sedação Mínima Titulada</p>
              <p>Cetamina 0,2 a 0,3 mg/kg IV para conforto sem perda do drive respiratório ou reflexos de proteção.</p>
            </div>

            <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">3. Laringoscopia com Paciente Respirando</p>
              <p>Introduzir Videolaringo ou Fibrobroncoscópio suavemente. Passar o tubo através das cordas vocais, insuflar o cuff e confirmar com EtCO2. Só então induzir e aprofundar a sedação.</p>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY RESCUE BANNER */}
      <div className="sticky top-16 z-10 p-4 bg-red-50 dark:bg-red-950/40 border-2 border-emergency rounded-2xl text-red-900 dark:text-red-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emergency font-extrabold text-base uppercase tracking-wide">
            <AlertOctagon className="w-5 h-5" aria-hidden="true" />
            <span>Falhou? Não insista sozinho</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Máximo 3 tentativas. Sem oxigenação, abra o resgate com máscara laríngea ou via cirúrgica.
          </p>
        </div>

        <button
          onClick={() => setIsSosModalOpen(true)}
          aria-label="Abrir plano de resgate A a D"
          className="w-full sm:w-auto min-h-[56px] px-5 py-3.5 bg-emergency hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>Abrir resgate (A a D)</span>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

    </div>
  );
}
