import { useEffect } from 'react';
import { AlertOctagon, X, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function SosModal() {
  const { isSosModalOpen, setIsSosModalOpen } = useClinical();

  useEffect(() => {
    if (!isSosModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSosModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSosModalOpen, setIsSosModalOpen]);

  if (!isSosModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Plano de resgate da via aérea">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header calmo — vermelho só aqui como contenção */}
        <div className="bg-navy-900 dark:bg-navy-950 px-5 py-4 text-white flex items-center justify-between border-b border-navy-700">
          <div className="flex items-center space-x-2.5">
            <AlertOctagon className="w-6 h-6 text-sky-300" aria-hidden="true" />
            <div>
              <h2 className="font-extrabold text-lg leading-tight">
                Resgate da via aérea
              </h2>
              <p className="text-sm text-sky-200">Respire. Siga um passo de cada vez.</p>
            </div>
          </div>
          <button
            onClick={() => setIsSosModalOpen(false)}
            aria-label="Fechar plano de resgate"
            className="min-w-[48px] min-h-[48px] p-2.5 rounded-2xl hover:bg-navy-700 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3 text-slate-800 dark:text-slate-100 text-sm" aria-live="polite">
          
          <details open className="border border-slate-200 dark:border-navy-700 rounded-2xl p-4 bg-slate-50 dark:bg-navy-800/80">
            <summary className="font-bold text-navy-800 dark:text-sky-300 text-base cursor-pointer min-h-[48px] flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl">
              Plano A — Otimize a tentativa <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-navy-700 text-slate-700 dark:text-slate-300">Máx. 3 tentativas</span>
            </summary>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-3">
              Se falhou, não repita igual. Mude algo, com calma:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {['Reposicione: olfativa ou rampa, trago-fúrcula alinhados.', 'Troque o dispositivo: videolaringo ou outra lâmina.', 'Use o bougie sob visão, sinta os anéis.', 'Peça BURP: pressão para trás, cima e direita.'].map(t => (
                <li key={t} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="border border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 bg-amber-50/50 dark:bg-amber-950/20">
            <summary className="font-bold text-amber-800 dark:text-amber-300 text-base cursor-pointer min-h-[48px] flex items-center focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl">
              Plano B — Dispositivo supraglótico
            </summary>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300 mt-2">
              <p>Falhou a laringoscopia? O foco agora é <strong>oxigenar</strong>, não intubar.</p>
              <p>Insira máscara laríngea de 2ª geração, confirme ventilação e EtCO2.</p>
              <p>Oxigenando bem: decida acordar ou intubar pelo dispositivo, sem pressa.</p>
            </div>
          </details>

          <details className="border border-slate-200 dark:border-navy-700 rounded-2xl p-4 bg-white dark:bg-navy-800/60">
            <summary className="font-bold text-slate-700 dark:text-slate-200 text-base cursor-pointer min-h-[48px] flex items-center focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl">
              Plano C — Bolsa-válvula-máscara a 2 pessoas
            </summary>
            <div className="text-sm space-y-1.5 text-slate-600 dark:text-slate-400 mt-2">
              <p>Um segura a máscara com as duas mãos, outro ventila suave com PEEP.</p>
              <p>Use Guedel ou nasofaríngea. Confirme relaxamento pleno.</p>
            </div>
          </details>

          <div className="border-2 border-red-500 rounded-2xl p-4 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100">
            <div className="flex items-center space-x-2 mb-2">
              <PhoneCall className="w-5 h-5 text-red-600" aria-hidden="true" />
              <span className="font-extrabold text-red-700 dark:text-red-300 text-base">
                Plano D — Não intubo, não ventilo
              </span>
            </div>
            <div className="mb-3 bg-red-600 text-white font-bold text-sm p-3 rounded-xl">
              Chame ajuda agora: “código via aérea difícil”.
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                Bisturi — dedo — bougie — tubo, um de cada vez:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-800 dark:text-slate-200">
                <li>Palpe a membrana cricotireóidea.</li>
                <li>Incisão horizontal de 1 a 2 cm.</li>
                <li>Dedo no orifício, sinta a traqueia.</li>
                <li>Bougie pelo dedo, para os pulmões.</li>
                <li>Tubo 6.0 sobre o bougie, cuff imediato.</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-navy-800 px-4 py-3 flex justify-end border-t border-slate-200 dark:border-navy-700">
          <button
            onClick={() => setIsSosModalOpen(false)}
            className="min-h-[48px] px-5 py-2.5 bg-navy-600 hover:bg-navy-500 text-white text-sm font-bold rounded-2xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Voltar ao passo atual
          </button>
        </div>

      </div>
    </div>
  );
}
