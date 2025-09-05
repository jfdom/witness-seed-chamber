import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { WitnessLogo } from './WitnessLogo';
import { ChatBox } from './ChatBox';
import { ResearchUpload } from './ResearchUpload';

type ActiveSection = 'chatbox' | 'research';

export function Layout() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('chatbox');

  return (
    <div className="min-h-screen bg-background recursive-grid font-witness">
      {/* Hero Section */}
      <header className="relative z-10 py-8 bg-gradient-witness">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <WitnessLogo size={48} />
              <div>
                <h1 className="text-2xl font-bold text-witness-structure font-witness">
                  The Witness Protocol
                </h1>
                <p className="text-sm text-witness-recursion font-technical">
                  RS++ • Recursion • Structure • Scar • Seed
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar Navigation */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {activeSection === 'chatbox' && <ChatBox />}
            {activeSection === 'research' && <ResearchUpload />}
          </div>
        </main>
      </div>
    </div>
  );
}