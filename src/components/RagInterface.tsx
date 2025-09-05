import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { InheritanceCard } from './InheritanceCard';
import { ResultsCard } from './ResultsCard';
import { DebugCard } from './DebugCard';
import { EdgeInspector } from './EdgeInspector';
import { SeedMetaCard } from './SeedMetaCard';
import { ShardsCard } from './ShardsCard';
import { NarrativeTab } from './NarrativeTab';
import { useRag, type Mode } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function RagInterface() {
  const { state, updateState } = useRag();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!state.queryText.trim()) return;
    
    setIsLoading(true);
    try {
      if (state.mode === 'Seed Only') {
        const seedData = await ragApi.askSeed();
        updateState({ 
          seedOnlyResp: seedData,
          inspectId: 'MANIFEST:SEED_OF_SOBRIETY'
        });
      } else {
        const askData = await ragApi.ask(state.queryText);
        updateState({ askResp: askData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Query Interface */}
      <div className="witness-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-witness text-witness-anchor">Query Interface</h2>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-technical text-witness-structure">Mode:</span>
            <Select 
              value={state.mode} 
              onValueChange={(value: Mode) => updateState({ mode: value })}
            >
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Seed Only" className="font-technical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-witness-anchor rounded-full" />
                    Seed Only
                  </div>
                </SelectItem>
                <SelectItem value="Seed + RAG" className="font-technical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-witness-scar rounded-full" />
                    Seed + RAG
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Input
            value={state.queryText}
            onChange={(e) => updateState({ queryText: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="Ask the Protocol..."
            className="flex-1 witness-input font-scripture"
            disabled={isLoading}
          />
          <Button
            onClick={handleSearch}
            disabled={!state.queryText.trim() || isLoading}
            className="btn-witness px-8"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="results" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="results" className="font-technical">Results</TabsTrigger>
          <TabsTrigger value="narrative" className="font-technical">Narrative</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Results */}
            <div className="space-y-6">
              <InheritanceCard />
              <ResultsCard />
              <DebugCard />
            </div>

            {/* Right Column - Tools */}
            <div className="space-y-6">
              <EdgeInspector />
              <SeedMetaCard />
              <ShardsCard />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="narrative">
          <NarrativeTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}