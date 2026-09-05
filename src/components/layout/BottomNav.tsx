import { Home, Compass, Pill, CheckSquare, Stethoscope } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';

export function BottomNav() {
  const {
    currentTrack,
    setCurrentTrack,
    activeTab,
    setActiveTab,
    setIsTriageModalOpen,
    setIsLemonModalOpen
  } = useClinical();

  const handleOpenPharma = () => {
    if (!currentTrack) {
      setIsTriageModalOpen(true);
      return;
    }
    setActiveTab('pharma');
  };

  const handleOpenChecklist = () => {
    if (!currentTrack) {
      setIsTriageModalOpen(true);
      return;
    }
    setActiveTab('checklist');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-t border-slate-200 dark:border-navy-800 shadow-lg safe-bottom">
      <div className="max-w-md mx-auto px-2 min-h-[64px] flex items-center justify-around">
        
        {/* Início */}
        <button
          onClick={() => setCurrentTrack(null)}
          aria-label="Voltar ao início"
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[56px] py-1.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 ${
            currentTrack === null
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-0.5">Início</span>
        </button>

        {/* Triagem */}
        <button
          onClick={() => setIsTriageModalOpen(true)}
          aria-label="Abrir triagem rápida"
          className="flex flex-col items-center justify-center min-w-[60px] min-h-[56px] py-1.5 text-slate-500 dark:text-slate-400 hover:text-navy-600 dark:hover:text-sky-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl"
        >
          <Compass className="w-5 h-5" />
          <span className="text-xs mt-0.5">Triagem</span>
        </button>

        {/* Doses */}
        <button
          onClick={handleOpenPharma}
          aria-label="Abrir cálculo de doses"
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[56px] py-1.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 ${
            currentTrack !== null && activeTab === 'pharma'
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <Pill className="w-5 h-5" />
          <span className="text-xs mt-0.5">Doses</span>
        </button>

        {/* Checklist */}
        <button
          onClick={handleOpenChecklist}
          aria-label="Abrir checklist"
          className={`flex flex-col items-center justify-center min-w-[60px] min-h-[56px] py-1.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 ${
            currentTrack !== null && activeTab === 'checklist'
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-xs mt-0.5">Checklist</span>
        </button>

        {/* LEMON */}
        <button
          onClick={() => setIsLemonModalOpen(true)}
          aria-label="Abrir escore LEMON"
          className="flex flex-col items-center justify-center min-w-[60px] min-h-[56px] py-1.5 text-slate-500 dark:text-slate-400 hover:text-navy-600 dark:hover:text-sky-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl"
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-xs mt-0.5">LEMON</span>
        </button>

      </div>
    </nav>
  );
}
