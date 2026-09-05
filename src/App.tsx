import { ClinicalProvider, useClinical } from './context/ClinicalContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { SosModal } from './components/layout/SosModal';
import { LemonModal } from './components/tools/LemonModal';
import { PushDoseModal } from './components/tools/PushDoseModal';
import { TriageModal } from './components/home/TriageModal';
import { Dashboard } from './components/home/Dashboard';
import { TrackView } from './components/track/TrackView';

function AppContent() {
  const { currentTrack } = useClinical();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTrack ? <TrackView /> : <Dashboard />}
      </main>

      {/* Global Modals */}
      <SosModal />
      <TriageModal />
      <LemonModal />
      <PushDoseModal />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ClinicalProvider>
      <AppContent />
    </ClinicalProvider>
  );
}
