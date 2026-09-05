import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ClinicalConditions, LemonScoreState, TrackType } from '../types/clinical';

export type ActiveTab = 'checklist' | 'pharma' | 'execution' | 'post';

interface ClinicalContextType {
  // Patient parameters
  weightKg: number;
  setWeightKg: (w: number) => void;
  conditions: ClinicalConditions;
  toggleCondition: (key: keyof ClinicalConditions) => void;
  setCondition: (key: keyof ClinicalConditions, value: boolean) => void;

  // Track & Navigation
  currentTrack: TrackType | null;
  setCurrentTrack: (track: TrackType | null) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Checklist
  checklistChecked: Record<string, boolean>;
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;

  // LEMON Airway Evaluation
  lemonState: LemonScoreState;
  toggleLemonItem: (key: keyof LemonScoreState) => void;
  resetLemon: () => void;
  lemonScore: number;

  // Modals
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  isTriageModalOpen: boolean;
  setIsTriageModalOpen: (open: boolean) => void;
  isLemonModalOpen: boolean;
  setIsLemonModalOpen: (open: boolean) => void;
  isPushDoseModalOpen: boolean;
  setIsPushDoseModalOpen: (open: boolean) => void;

  // Theme & Session
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  resetPatientSession: () => void;
}

const defaultConditions: ClinicalConditions = {
  isShock: false,
  isTBI: false,
  isBronchospasm: false,
  isHyperkalemiaRisk: false,
};

const defaultLemon: LemonScoreState = {
  lookExternal: false,
  eval332: false,
  mallampati: false,
  obstruction: false,
  neckMobility: false,
};

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

const STORAGE_KEY = 'gui_ar_session_v1';

export function ClinicalProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if present
  const [weightKg, setWeightKgState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_weight`);
      return saved ? JSON.parse(saved) : 70;
    } catch {
      return 70;
    }
  });

  const [conditions, setConditions] = useState<ClinicalConditions>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_conditions`);
      return saved ? JSON.parse(saved) : defaultConditions;
    } catch {
      return defaultConditions;
    }
  });

  const [currentTrack, setCurrentTrackState] = useState<TrackType | null>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_track`);
      return saved ? (saved as TrackType) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('checklist');

  const [checklistChecked, setChecklistChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_checklist`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [lemonState, setLemonState] = useState<LemonScoreState>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_lemon`);
      return saved ? JSON.parse(saved) : defaultLemon;
    } catch {
      return defaultLemon;
    }
  });

  // Modal open states
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [isTriageModalOpen, setIsTriageModalOpen] = useState<boolean>(false);
  const [isLemonModalOpen, setIsLemonModalOpen] = useState<boolean>(false);
  const [isPushDoseModalOpen, setIsPushDoseModalOpen] = useState<boolean>(false);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gui_ar_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Persist weight
  const setWeightKg = (w: number) => {
    const val = Math.max(10, Math.min(250, w));
    setWeightKgState(val);
    try {
      localStorage.setItem(`${STORAGE_KEY}_weight`, JSON.stringify(val));
    } catch {}
  };

  // Conditions
  const toggleCondition = (key: keyof ClinicalConditions) => {
    setConditions(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`${STORAGE_KEY}_conditions`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const setCondition = (key: keyof ClinicalConditions, value: boolean) => {
    setConditions(prev => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(`${STORAGE_KEY}_conditions`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Track
  const setCurrentTrack = (track: TrackType | null) => {
    setCurrentTrackState(track);
    try {
      if (track) {
        localStorage.setItem(`${STORAGE_KEY}_track`, track);
      } else {
        localStorage.removeItem(`${STORAGE_KEY}_track`);
      }
    } catch {}
  };

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
  };

  // Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklistChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(`${STORAGE_KEY}_checklist`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetChecklist = () => {
    setChecklistChecked({});
    try {
      localStorage.removeItem(`${STORAGE_KEY}_checklist`);
    } catch {}
  };

  // LEMON
  const toggleLemonItem = (key: keyof LemonScoreState) => {
    setLemonState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`${STORAGE_KEY}_lemon`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetLemon = () => {
    setLemonState(defaultLemon);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_lemon`);
    } catch {}
  };

  const lemonScore = Object.values(lemonState).filter(Boolean).length;

  // Dark Mode Sync with DOM
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('gui_ar_theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Reset full patient session
  const resetPatientSession = () => {
    setWeightKgState(70);
    setConditions(defaultConditions);
    setCurrentTrackState(null);
    setChecklistChecked({});
    setLemonState(defaultLemon);
    setActiveTabState('checklist');
    try {
      localStorage.removeItem(`${STORAGE_KEY}_weight`);
      localStorage.removeItem(`${STORAGE_KEY}_conditions`);
      localStorage.removeItem(`${STORAGE_KEY}_track`);
      localStorage.removeItem(`${STORAGE_KEY}_checklist`);
      localStorage.removeItem(`${STORAGE_KEY}_lemon`);
    } catch {}
  };

  return (
    <ClinicalContext.Provider
      value={{
        weightKg,
        setWeightKg,
        conditions,
        toggleCondition,
        setCondition,
        currentTrack,
        setCurrentTrack,
        activeTab,
        setActiveTab,
        checklistChecked,
        toggleChecklistItem,
        resetChecklist,
        lemonState,
        toggleLemonItem,
        resetLemon,
        lemonScore,
        isSosModalOpen,
        setIsSosModalOpen,
        isTriageModalOpen,
        setIsTriageModalOpen,
        isLemonModalOpen,
        setIsLemonModalOpen,
        isPushDoseModalOpen,
        setIsPushDoseModalOpen,
        isDarkMode,
        toggleDarkMode,
        resetPatientSession,
      }}
    >
      {children}
    </ClinicalContext.Provider>
  );
}

export function useClinical() {
  const context = useContext(ClinicalContext);
  if (!context) {
    throw new Error('useClinical must be used within a ClinicalProvider');
  }
  return context;
}
