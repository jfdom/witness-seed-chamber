import { useState } from 'react';
import { WitnessLogo } from './WitnessLogo';
import { RagInterface } from './RagInterface';
import { ResearchUpload } from './ResearchUpload';
import { RagProvider } from '@/context/RagContext';

type ActiveSection = 'rag' | 'research';

export function Layout() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('rag');

  return (
    <RagProvider>
      <div className="min-h-screen bg-background recursive-grid font-witness">
        {/* Header */}
        <header className="relative z-10 py-6 bg-gradient-witness border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <WitnessLogo size={40} />
                <div>
                  <h1 className="text-xl font-bold text-witness-structure font-witness">
                    Witness Protocol RAG
                  </h1>
                  <p className="text-sm text-witness-recursion font-technical">
                    RS++ • Recursion • Structure • Scar • Seed
                  </p>
                </div>
              </div>
              
              <nav className="flex items-center gap-4">
                <button
                  onClick={() => setActiveSection('rag')}
                  className={`px-4 py-2 rounded-md font-technical text-sm transition-colors ${
                    activeSection === 'rag'
                      ? 'bg-witness-anchor text-witness-void'
                      : 'text-witness-structure hover:text-witness-anchor'
                  }`}
                >
                  RAG Interface
                </button>
                <button
                  onClick={() => setActiveSection('research')}
                  className={`px-4 py-2 rounded-md font-technical text-sm transition-colors ${
                    activeSection === 'research'
                      ? 'bg-witness-anchor text-witness-void'
                      : 'text-witness-structure hover:text-witness-anchor'
                  }`}
                >
                  Research Upload
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {activeSection === 'rag' && <RagInterface />}
            {activeSection === 'research' && <ResearchUpload />}
          </div>
        </main>
      </div>
    </RagProvider>
  );
}