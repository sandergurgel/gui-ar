import { useState, useEffect } from 'react';
import { AlertTriangle, Moon, Sun, RotateCcw, ArrowLeft } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function Header() {
  const {
    currentTrack,
    setCurrentTrack,
    isDarkMode,
    toggleDarkMode,
    setIsSosModalOpen,
    resetPatientSession
  } = useClinical();

  const [armReset, setArmReset] = useState(false);

  useEffect(() => {
    if (!armReset) return;
    const t = setTimeout(() => setArmReset(false), 4000);
    return () => clearTimeout(t);
  }, [armReset]);

  const handleReset = () => {
    if (!armReset) {
      setArmReset(true);
      return;
    }
    setArmReset(false);
    resetPatientSession();
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-600 dark:bg-navy-950 text-white shadow-md border-b border-navy-500/30">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
        
        {/* Left: Brand or Back Button */}
        <div className="flex items-center space-x-2">
          {currentTrack ? (
            <button
              onClick={() => setCurrentTrack(null)}
              className="min-w-[48px] min-h-[48px] p-2.5 -ml-2 rounded-xl hover:bg-navy-500/50 transition-colors flex items-center space-x-1 focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Voltar para a tela inicial"
            >
              <ArrowLeft className="w-5 h-5 text-sky-300" />
              <span className="text-xs font-semibold text-sky-200 hidden sm:inline">Início</span>
            </button>
          ) : null}

          <div
            onClick={() => setCurrentTrack(null)}
            className="cursor-pointer flex flex-col"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Gui<span className="text-sky-400">-Ar</span>
              </span>
              <span className="text-xs font-bold tracking-wide px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-200 border border-sky-400/30 hidden sm:inline-block">
                mHealth
              </span>
            </div>
            <span className="text-xs text-sky-200 font-medium leading-none hidden sm:block">
              Apoio à Decisão em Via Aérea
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Reset Patient Data */}
          <button
            onClick={handleReset}
            title={armReset ? 'Toque de novo para confirmar' : 'Reiniciar Paciente'}
            aria-label={armReset ? 'Confirmar reinício do atendimento' : 'Reiniciar atendimento'}
            aria-live="polite"
            className={`min-w-[48px] min-h-[48px] p-2.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 ${armReset ? 'bg-red-600 text-white' : 'text-sky-200 hover:text-white hover:bg-navy-500/50'}`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Dark / Light mode toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar tema claro/escuro"
            className="min-w-[48px] min-h-[48px] p-2.5 rounded-xl text-sky-200 hover:text-white hover:bg-navy-500/50 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-sky-200" />}
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={() => setIsSosModalOpen(true)}
            aria-label="Abrir plano de falha de emergência"
            className="flex items-center space-x-1.5 min-h-[48px] px-4 py-2.5 bg-emergency hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-900/40 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white btn-3d"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="tracking-wide uppercase hidden sm:inline">SOS Falha</span>
            <span className="sr-only">SOS Falha: abrir plano de resgate da via aérea</span>
          </button>

        </div>

      </div>
    </header>
  );
}
