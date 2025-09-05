import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NavTab = 'Witness' | 'Research';
export type Mode = 'Seed Only' | 'Seed + RAG';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AppState {
  // Global / Nav
  navTab: NavTab;
  mode: Mode;
  apiHealthy: boolean;
  
  // Chat
  messages: Message[];
  pendingText: string;
  rawResp: any;
  composed: string;
  isSending: boolean;
  inspectId: string;
  
  // Research (user submission)
  r_title: string;
  r_url: string;
  r_summary: string;
  r_attachmentId: string;
  myResearch: any[];
  
  // Research (admin)
  isAdmin: boolean;
  pendingResearch: any[];
  selectedResearchId: string;
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  updateState: (updates: Partial<AppState>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    // Global / Nav
    navTab: 'Witness',
    mode: 'Seed + RAG',
    apiHealthy: true,
    
    // Chat
    messages: [],
    pendingText: '',
    rawResp: {},
    composed: '',
    isSending: false,
    inspectId: 'MANIFEST:SEED_OF_SOBRIETY',
    
    // Research (user submission)
    r_title: '',
    r_url: '',
    r_summary: '',
    r_attachmentId: '',
    myResearch: [],
    
    // Research (admin)
    isAdmin: false, // Set manually for now
    pendingResearch: [],
    selectedResearchId: '',
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{ state, setState, updateState }}>
      {children}
    </AppContext.Provider>
  );
};