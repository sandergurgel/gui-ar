import { CheckSquare, Pill, Activity, Wind, Flame, Shield, Eye, ArrowLeft } from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { ChecklistTab } from './ChecklistTab';
import { PharmacologyTab } from './PharmacologyTab';
import { ExecutionTab } from './ExecutionTab';
import { PostIntubationTab } from './PostIntubationTab';

export function TrackView() {
  const { currentTrack, setCurrentTrack, activeTab, setActiveTab, weightKg } = useClinical();

  if (!currentTrack) return null;

  const trackInfo = {
    CRASH: {
      name: 'Trilha CRASH',
      badge: 'Via Aérea Imediata',
      desc: 'Parada Cardiorrespiratória ou Peri-Parada / Coma Arreativo.',
      color: 'border-emergency text-emergency',
      bg: 'bg-red-500',
      icon: Flame,
    },
    SRI: {
      name: 'Trilha SRI',
      badge: 'Sequência Rápida de Intubação',
      desc: 'Controle clássico de emergência com risco de aspiração e tempo para preparo.',
      color: 'border-navy-600 text-navy-600 dark:text-sky-400',
      bg: 'bg-navy-600',
      icon: Shield,
    },
    DSI: {
      name: 'Trilha DSI / KOBE',
      badge: 'Sequência Atrasada',
      desc: 'Hipoxemia refratária, agitação combativa ou VAD fisiológica crítica.',
      color: 'border-amber-600 text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-600',
      icon: Wind,
    },
    AWAKE: {
      name: 'Trilha AWAKE',
      badge: 'Intubação Acordado',
      desc: 'Via aérea difícil anatômica crítica prevista mantendo ventilação espontânea.',
      color: 'border-teal-600 text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-600',
      icon: Eye,
    },
  }[currentTrack];

  const Icon = trackInfo.icon;

  const tabs = [
    { id: 'checklist' as const, label: '① Preparo & Checklist', icon: CheckSquare },
    { id: 'pharma' as const, label: `② Farmacologia (${weightKg} kg)`, icon: Pill },
    { id: 'execution' as const, label: '③ Execução & Falha', icon: Activity },
    { id: 'post' as const, label: '④ Pós-Intubação', icon: Wind },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-4 pb-20">
      
      {/* Track Banner */}
      <div className="bg-white dark:bg-navy-800 rounded-2xl p-4 border border-slate-200 dark:border-navy-700 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTrack(null)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-navy-700 hover:bg-slate-200 dark:hover:bg-navy-600 transition-colors"
            title="Voltar ao início"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${trackInfo.bg}`} />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none">
                {trackInfo.name}
              </h2>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                {trackInfo.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {trackInfo.desc}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-slate-400">
          <Icon className="w-6 h-6 opacity-60" />
        </div>
      </div>

      {/* Top Tabs Switcher */}
      <div className="flex items-center space-x-1.5 overflow-x-auto bg-slate-200/80 dark:bg-navy-950 p-1 rounded-2xl border border-slate-300/60 dark:border-navy-800">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all select-none ${
                isActive
                  ? 'bg-white dark:bg-navy-800 text-navy-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'pharma' && <PharmacologyTab />}
        {activeTab === 'execution' && <ExecutionTab />}
        {activeTab === 'post' && <PostIntubationTab />}
      </div>

    </div>
  );
}
