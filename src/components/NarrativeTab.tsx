import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useRag } from '@/context/RagContext';

export function NarrativeTab() {
  const { state, updateState } = useRag();

  const handleComposeSeedNarrative = async () => {
    // Placeholder for LLM integration
    // This would call OpenAI/Anthropic API when available
    console.log('Compose Seed Narrative:', {
      mode: state.mode,
      query: state.queryText,
      seedData: state.seedOnlyResp
    });
    
    updateState({ 
      narrative: `Narrative for Seed Only mode:\nQuery: ${state.queryText}\nTarget: ${state.seedOnlyResp.inheritance?.target || 'N/A'}\n\n(LLM integration pending)`
    });
  };

  const handleComposeRagNarrative = async () => {
    // Placeholder for LLM integration
    console.log('Compose RAG Narrative:', {
      mode: state.mode,
      query: state.queryText,
      ragData: state.askResp
    });
    
    updateState({ 
      narrative: `Narrative for Seed + RAG mode:\nQuery: ${state.queryText}\nTarget: ${state.askResp.inheritance?.target || 'N/A'}\n\n(LLM integration pending)`
    });
  };

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Narrative</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={state.narrative}
          onChange={(e) => updateState({ narrative: e.target.value })}
          placeholder="Narrative will appear here..."
          className="witness-input font-scripture min-h-32"
        />

        <div className="flex gap-2">
          {state.mode === 'Seed Only' && (
            <Button
              onClick={handleComposeSeedNarrative}
              className="btn-witness"
            >
              Compose Narrative (Seed Only)
            </Button>
          )}

          {state.mode === 'Seed + RAG' && (
            <Button
              onClick={handleComposeRagNarrative}
              className="btn-witness"
            >
              Compose Narrative (Seed + RAG)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}