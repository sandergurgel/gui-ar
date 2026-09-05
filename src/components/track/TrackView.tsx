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
      name: 'CRASH',
      badge: 'Via aérea imediata',
      desc: 'Parada ou peri-parada. Ação imediata, um passo de cada vez.',
      color: 'border-red-300 text-red-700 dark:text-red-300',
      bg: 'bg-red-500',
      banner: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900',
      icon: Flame,
    },
    SRI: {
      name: 'SRI',
      badge: 'Sequência rápida',
      desc: 'Caminho habitual com tempo para preparo. Você está guiado.',
      color: 'border-sky-400 text-navy-700 dark:text-sky-300',
      bg: 'bg-navy-600',
      banner: 'bg-navy-900 dark:bg-navy-800 border-navy-700 text-white',
      icon: Shield,
    },
    DSI: {
      name: 'DSI / KOBE',
      badge: 'Sequência atrasada',
      desc: 'Hipoxemia ou agitação. Dissociar, oxigenar, depois intubar.',
      color: 'border-amber-400 text-amber-700 dark:text-amber-300',
      bg: 'bg-amber-500',
      banner: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
      icon: Wind,
    },
    AWAKE: {
      name: 'AWAKE',
      badge: 'Acordado',
      desc: 'Via difícil prevista. Espontânea preservada, com calma.',
      color: 'border-teal-400 text-teal-700 dark:text-teal-300',
      bg: 'bg-teal-500',
      banner: 'bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800',
      icon: Eye,
    },
  }[currentTrack];

  const Icon = trackInfo.icon;

  const tabs = [
    { id: 'checklist' as const, label: 'Preparo', full: 'Preparo & Checklist', icon: CheckSquare },
    { id: 'pharma' as const, label: `Doses ${weightKg}kg`, full: `Doses (${weightKg} kg)`, icon: Pill },
    { id: 'execution' as const, label: 'Execução', full: 'Execução & Falha', icon: Activity },
    { id: 'post' as const, label: 'Pós', full: 'Pós-intubação', icon: Wind },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-4 pb-20">
      
      {/* Track Banner */}
      <div className={`rounded-3xl p-4 border shadow-sm flex items-center justify-between gap-3 ${trackInfo.banner}`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTrack(null)}
            aria-label="Voltar ao início"
            className="min-w-[48px] min-h-[48px] p-2.5 rounded-2xl bg-slate-100 dark:bg-navy-700 hover:bg-slate-200 dark:hover:bg-navy-600 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Voltar ao início"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>

          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${trackInfo.bg}`} aria-hidden="true" />
              <h2 className={`text-lg sm:text-xl font-extrabold leading-none ${currentTrack === 'SRI' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {trackInfo.name}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                {trackInfo.badge}
              </span>
            </div>
            <p className={`text-sm mt-1.5 leading-relaxed ${currentTrack === 'SRI' ? 'text-sky-200' : 'text-slate-600 dark:text-slate-400'}`}>
              {trackInfo.desc}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 opacity-60">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>

      {/* Tabs calmas */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-200/80 dark:bg-navy-950 p-1.5 rounded-2xl border border-slate-300/60 dark:border-navy-800" role="tablist" aria-label="Etapas da trilha">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.full}
              title={tab.full}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[88px] min-h-[48px] py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-1.5 transition-all select-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isActive
                  ? 'bg-white dark:bg-navy-800 text-navy-700 dark:text-sky-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'pharma' && <PharmacologyTab />}
        {activeTab === 'execution' && <ExecutionTab />}
        {activeTab === 'post' && <PostIntubationTab />}
      </div>

    </div>
  );
}
