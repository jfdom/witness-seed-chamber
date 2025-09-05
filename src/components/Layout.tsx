import { useEffect } from 'react';
import { WitnessLogo } from './WitnessLogo';
import { Witness } from './Witness';
import { Research } from './Research';
import { useApp } from '@/context/AppContext';
import { ragApi } from '@/services/ragApi';

export function Layout() {
  const { state, updateState } = useApp();

  useEffect(() => {
    // Check API health on load
    ragApi.health()
      .then((healthy) => updateState({ apiHealthy: healthy }))
      .catch(() => updateState({ apiHealthy: false }));
  }, []);

  return (
    <div className="flex min-h-screen bg-background recursive-grid">
      {/* Left Navigation */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          {/* Logo/Title Area */}
          <div className="flex items-center gap-3 mb-8">
            <WitnessLogo size={32} />
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground font-witness">
                Witness Protocol
              </h1>
              <p className="text-xs text-sidebar-foreground/60 font-technical">
                Chat & Research
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <button
              onClick={() => updateState({ navTab: 'Witness' })}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-technical text-sm transition-colors ${
                state.navTab === 'Witness'
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <span className="text-witness-anchor">●</span>
              Witness
            </button>
            <button
              onClick={() => updateState({ navTab: 'Research' })}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-technical text-sm transition-colors ${
                state.navTab === 'Research'
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <span className="text-witness-scar">◆</span>
              Research
            </button>
          </nav>
        </div>

        {/* API Health Indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs ${
            state.apiHealthy 
              ? 'bg-green-900/20 text-green-400 border border-green-900/40' 
              : 'bg-red-900/20 text-red-400 border border-red-900/40'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              state.apiHealthy ? 'bg-green-400' : 'bg-red-400'
            }`} />
            {state.apiHealthy ? 'API Online' : 'API Offline'}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {state.navTab === 'Witness' && <Witness />}
        {state.navTab === 'Research' && <Research />}
      </main>
    </div>
  );
}