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

  const handleReset = () => {
    if (window.confirm('Deseja reiniciar a sessão do paciente e limpar todos os dados preenchidos?')) {
      resetPatientSession();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-600 dark:bg-navy-950 text-white shadow-md border-b border-navy-500/30">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
        
        {/* Left: Brand or Back Button */}
        <div className="flex items-center space-x-2">
          {currentTrack ? (
            <button
              onClick={() => setCurrentTrack(null)}
              className="p-2 -ml-2 rounded-xl hover:bg-navy-500/50 transition-colors flex items-center space-x-1"
              aria-label="Voltar para a tela inicial"
            >
              <ArrowLeft className="w-5 h-5 text-sky-300" />
              <span className="text-xs font-semibold text-sky-200 hidden xs:inline">Início</span>
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
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-300 border border-sky-400/30">
                mHealth
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium leading-none">
              Apoio à Decisão em Via Aérea
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Reset Patient Data */}
          <button
            onClick={handleReset}
            title="Reiniciar Paciente"
            aria-label="Reiniciar atendimento"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-500/50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Dark / Light mode toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar tema claro/escuro"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-500/50 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-200" />}
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={() => setIsSosModalOpen(true)}
            aria-label="Abrir plano de falha de emergência"
            className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-emergency hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-900/40 active:scale-95 transition-all"
          >
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span className="tracking-wide uppercase">SOS Falha</span>
          </button>

        </div>

      </div>
    </header>
  );
}
