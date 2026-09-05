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
      setCurrentTrack('SRI');
    }
    setActiveTab('pharma');
  };

  const handleOpenChecklist = () => {
    if (!currentTrack) {
      setCurrentTrack('SRI');
    }
    setActiveTab('checklist');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-t border-slate-200 dark:border-navy-800 shadow-lg safe-bottom">
      <div className="max-w-md mx-auto px-2 h-14 flex items-center justify-around">
        
        {/* Início */}
        <button
          onClick={() => setCurrentTrack(null)}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            currentTrack === null
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Início</span>
        </button>

        {/* Triagem */}
        <button
          onClick={() => setIsTriageModalOpen(true)}
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-500 dark:text-slate-400 hover:text-navy-600 dark:hover:text-sky-400 transition-colors"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Triagem</span>
        </button>

        {/* Calculadora */}
        <button
          onClick={handleOpenPharma}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            currentTrack !== null && activeTab === 'pharma'
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <Pill className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Drogas</span>
        </button>

        {/* Checklist */}
        <button
          onClick={handleOpenChecklist}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            currentTrack !== null && activeTab === 'checklist'
              ? 'text-navy-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-600'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Checklist</span>
        </button>

        {/* LEMON */}
        <button
          onClick={() => setIsLemonModalOpen(true)}
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-500 dark:text-slate-400 hover:text-navy-600 dark:hover:text-sky-400 transition-colors"
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">LEMON</span>
        </button>

      </div>
    </nav>
  );
}
