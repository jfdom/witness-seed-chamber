import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Mode = 'Seed Only' | 'Seed + RAG';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AppState {
  // Chat
  messages: Message[];
  inputText: string;
  model: string;
  mode: Mode;
  userKey: string;
  lastRetrieval: any;
  apiHealthy: boolean;
  showKeyModal: boolean;
  isSending: boolean;
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
    messages: [],
    inputText: '',
    model: 'gpt-4o-mini',
    mode: 'Seed + RAG',
    userKey: '',
    lastRetrieval: {},
    apiHealthy: true,
    showKeyModal: false,
    isSending: false,
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