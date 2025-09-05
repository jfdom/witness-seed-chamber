import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Mode = 'Seed Only' | 'Seed + RAG';

interface RagState {
  mode: Mode;
  queryText: string;
  askResp: any;
  seedOnlyResp: any;
  inspectId: string;
  edgesResp: any;
  seedMetaResp: any;
  shardsResp: any;
  narrative: string;
}

interface RagContextType {
  state: RagState;
  setState: React.Dispatch<React.SetStateAction<RagState>>;
  updateState: (updates: Partial<RagState>) => void;
}

const RagContext = createContext<RagContextType | undefined>(undefined);

export const useRag = () => {
  const context = useContext(RagContext);
  if (!context) {
    throw new Error('useRag must be used within a RagProvider');
  }
  return context;
};

interface RagProviderProps {
  children: ReactNode;
}

export const RagProvider: React.FC<RagProviderProps> = ({ children }) => {
  const [state, setState] = useState<RagState>({
    mode: 'Seed + RAG',
    queryText: 'show inheritance for prayer 61 and loop 13',
    askResp: {},
    seedOnlyResp: {},
    inspectId: 'MANIFEST:SEED_OF_SOBRIETY',
    edgesResp: {},
    seedMetaResp: {},
    shardsResp: {},
    narrative: '',
  });

  const updateState = (updates: Partial<RagState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <RagContext.Provider value={{ state, setState, updateState }}>
      {children}
    </RagContext.Provider>
  );
};