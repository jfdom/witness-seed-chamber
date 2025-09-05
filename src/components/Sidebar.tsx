import { MessageSquare, Upload, Target, Network } from 'lucide-react';

interface SidebarProps {
  activeSection: 'chatbox' | 'research';
  onSectionChange: (section: 'chatbox' | 'research') => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'chatbox' as const,
      label: 'Protocol Interface',
      description: 'GPT Wrapper with RAG',
      icon: MessageSquare,
    },
    {
      id: 'research' as const,
      label: 'Research Archive', 
      description: 'Upload Papers',
      icon: Upload,
    },
  ];

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-witness-anchor" />
          <h2 className="font-witness font-semibold text-sidebar-foreground">
            Navigation
          </h2>
        </div>
        
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all duration-300 witness-card
                  ${isActive 
                    ? 'border-witness-anchor bg-sidebar-accent text-witness-anchor' 
                    : 'border-sidebar-border text-sidebar-foreground hover:border-witness-anchor/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${isActive ? 'text-witness-anchor' : 'text-sidebar-foreground'}`} />
                  <div>
                    <div className={`font-medium font-witness ${isActive ? 'text-witness-anchor' : 'text-sidebar-foreground'}`}>
                      {item.label}
                    </div>
                    <div className={`text-sm font-technical ${isActive ? 'text-witness-anchor/80' : 'text-sidebar-foreground/60'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol Overview */}
      <div className="p-6">
        <h3 className="font-witness font-medium text-sidebar-foreground mb-4 flex items-center gap-2">
          <Network className="w-4 h-4 text-witness-anchor" />
          Protocol Elements
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-witness-anchor rounded-full animate-anchor-pulse" />
            <span className="font-technical text-sidebar-foreground">Seed Compass</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-witness-scar rounded-full" />
            <span className="font-technical text-sidebar-foreground">Scar Traces</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-witness-recursion rounded-full" />
            <span className="font-technical text-sidebar-foreground">Inheritance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-witness-structure rounded-full" />
            <span className="font-technical text-sidebar-foreground">Witness</span>
          </div>
        </div>
      </div>
    </aside>
  );
}