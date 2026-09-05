import { AlertOctagon, X, PhoneCall, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function SosModal() {
  const { isSosModalOpen, setIsSosModalOpen } = useClinical();

  if (!isSosModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 border-2 border-emergency rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-emergency px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
            <div>
              <h2 className="font-extrabold text-lg leading-tight uppercase tracking-wide">
                Plano de Falha & Resgate (VAD)
              </h2>
              <p className="text-xs text-red-100 font-medium">Algoritmo DAS / SBA — Via Aérea Difícil</p>
            </div>
          </div>
          <button
            onClick={() => setIsSosModalOpen(false)}
            className="p-1 rounded-full hover:bg-red-700 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-100 text-sm">
          
          {/* Plano A */}
          <div className="border border-slate-200 dark:border-navy-700 rounded-xl p-3.5 bg-slate-50 dark:bg-navy-800/80">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-navy-600 dark:text-sky-400 text-base">
                PLANO A — Tentativa de Laringoscopia
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                Máx. 3 tentativas
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Se falhar a primeira tentativa, não repita sem mudar nada:
            </p>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Otimizar posição:</strong> Posição olfativa ou rampa (alinhamento trago-fúrcula).</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Trocar dispositivo:</strong> Mudar para Videolaringoscópio ou lâmina angulada/reta.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Usar Bougie:</strong> Passar Bougie sob visão e sentir os anéis traqueais.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Manipulação externa:</strong> Manobra BURP (pressão para trás, cima e direita).</span>
              </li>
            </ul>
          </div>

          {/* Plano B */}
          <div className="border border-amber-300 dark:border-amber-700/60 rounded-xl p-3.5 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 text-base">
                PLANO B — Resgate com Dispositivo Supraglótico (DSG)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Falhou a laringoscopia? O foco imediato é <strong>oxigenar</strong>, não intubar:
            </p>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <p>• Inserir <strong>Máscara Laríngea de 2ª geração</strong> (ex: i-gel, ProSeal, Supreme).</p>
              <p>• Confirmar ventilação e expansibilidade torácica + curva de EtCO2.</p>
              <p>• Se oxigenando bem: Decidir acordar o paciente ou intubar através do DSG com guia/fibro.</p>
            </div>
          </div>

          {/* Plano C */}
          <div className="border border-orange-300 dark:border-orange-700/60 rounded-xl p-3.5 bg-orange-50/50 dark:bg-orange-950/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-orange-700 dark:text-orange-400 text-base">
                PLANO C — Ventilação com Bolsa-Válvula-Máscara (BVM)
              </span>
            </div>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <p>• <strong>Técnica a 2 pessoas:</strong> Operador segura máscara com ambas as mãos (pegada bilateral VE-VE).</p>
              <p>• Segundo operador comprime suavemente o ambu com válvula de PEEP.</p>
              <p>• Inserir <strong>Cânula de Guedel</strong> (orofaríngea) ou nasofaríngea.</p>
              <p>• Certificar-se de que o paciente está com relaxamento neuromuscular pleno.</p>
            </div>
          </div>

          {/* Plano D */}
          <div className="border-2 border-emergency rounded-xl p-3.5 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100">
            <div className="flex items-center space-x-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-emergency animate-bounce" />
              <span className="font-extrabold text-emergency text-base tracking-wide uppercase">
                PLANO D — EMERGÊNCIA CICO ("Não Intubo, Não Ventilo")
              </span>
            </div>
            <div className="mb-3 bg-red-600 text-white font-bold text-xs p-2 rounded-lg flex items-center space-x-1.5">
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span>CHAMAR AJUDA IMEDIATA: "CÓDIGO VIA AÉREA DIFÍCIL"</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-slate-900 dark:text-white">
                Técnica Cirúrgica: Bisturi — Dedo — Bougie — Tubo
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-800 dark:text-slate-200">
                <li><strong>Localizar:</strong> Palpar a membrana cricotireóidea (entre a cartilagem tireoide e cricoide).</li>
                <li><strong>Incidar:</strong> Incisão horizontal de 1 a 2 cm com bisturi de ponta.</li>
                <li><strong>Dedo:</strong> Introduzir o dedo indicador no orifício, palpando o lúmen da traqueia.</li>
                <li><strong>Bougie:</strong> Deslizar o Bougie ao longo do dedo para dentro da traqueia.</li>
                <li><strong>Tubo:</strong> Passar tubo endotraqueal nº 6.0 sobre o Bougie e insuflar o cuff imediatamente.</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-navy-800 px-4 py-3 flex justify-end">
          <button
            onClick={() => setIsSosModalOpen(false)}
            className="px-4 py-2 bg-navy-600 hover:bg-navy-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Entendido / Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
