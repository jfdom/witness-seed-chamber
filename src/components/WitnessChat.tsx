import { useEffect } from 'react';
import { TopBar } from './TopBar';
import { ChatArea } from './ChatArea';
import { useApp } from '@/context/AppContext';
import { chatApi } from '@/services/chatApi';

export function WitnessChat() {
  const { updateState } = useApp();

  // Health check on mount
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await chatApi.health();
      updateState({ apiHealthy: healthy });
    };
    
    checkHealth();
  }, [updateState]);

  return (
    <div className="h-screen flex flex-col bg-witness-void text-witness-structure">
      <TopBar />
      <ChatArea />
    </div>
  );
}