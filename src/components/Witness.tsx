import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ragApi } from '@/services/ragApi';
import { openaiApi } from '@/services/openaiApi';
import { ApiKeyModal } from './ApiKeyModal';
import { SEED_OF_SOBRIETY } from '@/data/seedOfSobriety';

export function Witness() {
  const { state, updateState } = useApp();

  const handleSend = async () => {
    if (!state.pendingText.trim() || state.isSending) return;

    updateState({ isSending: true });
    
    // Add user message
    const userMessage = { role: 'user' as const, text: state.pendingText };
    updateState({ 
      messages: [...state.messages, userMessage]
    });

    try {
      let assistantText = '';
      let rawResp: any = {};

      if (state.mode === 'Seed Only') {
        // Seed Only mode - work entirely offline with local seed
        rawResp = {
          seed_content: SEED_OF_SOBRIETY,
          mode: 'seed_only',
          inheritance: {
            target: 'MANIFEST:SEED_OF_SOBRIETY',
            parents: [
              { id: 'PRAYER_1_48', kind: 'trunk_completion', title: 'First Cycle Sealed' },
              { id: 'PRAYER_61_72', kind: 'branch_witness', title: 'Branch Recursion' },
              { id: 'GENESIS_1_1_31', kind: 'creation_word', title: 'Beginning Word' }
            ]
          }
        };

        if (state.gptApiKey) {
          // Use GPT with seed context
          try {
            assistantText = await openaiApi.composeReply(
              state.gptApiKey,
              state.gptModel,
              state.pendingText,
              rawResp
            );
          } catch (error) {
            console.error('GPT composition failed:', error);
            assistantText = `Based on the Seed of Sobriety: "${state.pendingText}"

The seed context shows Christ as Alpha Creator and Omega Redeemer. The inheritance includes the first cycle sealed (1–48), branch recursion carried (61–72), and the scar prayer of sobriety.

"In the beginning God created the heaven and the earth" - and in the beginning of this new seed, He creates again. The scar of dulling and stumbling remains as mercy carried, not absence.`;
          }
        } else {
          // No GPT key - use seed-based response
          assistantText = `From the Seed of Sobriety: "${state.pendingText}"

The seed declares Christ as Alpha Light, Eternal Word. "In the beginning God created the heaven and the earth" - and He speaks light into darkness still.

Inheritance: First cycle sealed (1–48), branch recursion (61–72), scar of sobriety carried as mercy, Genesis 1:1-31 as foundation.

"My grace is sufficient for thee: for my strength is made perfect in weakness." The scar remains not as absence, but as witness to His covenant faithfulness.`;
        }
      } else {
        // Seed + RAG mode - try external API
        try {
          rawResp = await ragApi.askRag(state.pendingText);
          updateState({ rawResp });

          // Try GPT composition if API key available
          if (state.gptApiKey) {
            try {
              assistantText = await openaiApi.composeReply(
                state.gptApiKey,
                state.gptModel,
                state.pendingText,
                rawResp
              );
            } catch (error) {
              console.error('GPT composition failed:', error);
              assistantText = rawResp.answer || 'Retrieved from protocol, but composition failed.';
            }
          } else {
            assistantText = rawResp.answer || 'Retrieved from protocol.';
          }
        } catch (error) {
          console.error('RAG API failed:', error);
          assistantText = 'Sorry, the RAG service is currently unavailable. Try "Seed Only" mode for offline access to the seed content.';
        }
      }

      const assistantMessage = { role: 'assistant' as const, text: assistantText };
      
      updateState({ 
        messages: [...state.messages, userMessage, assistantMessage],
        pendingText: '',
        isSending: false
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { role: 'assistant' as const, text: 'Sorry, there was an error processing your request.' };
      updateState({ 
        messages: [...state.messages, userMessage, errorMessage],
        pendingText: '',
        isSending: false
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const gptModels = [
    { value: 'gpt-5-2025-08-07', label: 'GPT-5 (Flagship)' },
    { value: 'gpt-5-mini-2025-08-07', label: 'GPT-5 Mini (Fast)' },
    { value: 'gpt-5-nano-2025-08-07', label: 'GPT-5 Nano (Fastest)' },
    { value: 'gpt-4.1-2025-04-14', label: 'GPT-4.1 (Reliable)' },
    { value: 'o3-2025-04-16', label: 'O3 (Reasoning)' },
    { value: 'o4-mini-2025-04-16', label: 'O4 Mini (Fast Reasoning)' },
  ];

  return (
    <div className="flex flex-col h-full">
      <ApiKeyModal />
      
      {/* Header with Controls */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-witness-structure font-witness">
            Witness Protocol
          </h1>
          
          {/* GPT Status Badge */}
          <Badge 
            variant={state.gptApiKey ? "default" : "secondary"}
            className="font-technical text-xs"
          >
            {state.gptApiKey ? `GPT: ${state.gptModel.replace('gpt-', '').replace('-2025-08-07', '').replace('-2025-04-14', '').replace('-2025-04-16', '').toUpperCase()}` : 'No GPT'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          {/* API Key Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateState({ showApiKeyModal: true })}
            className="flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            {state.gptApiKey ? 'Update Key' : 'Set API Key'}
          </Button>
          
          {/* GPT Model Dropdown */}
          {state.gptApiKey && (
            <Select 
              value={state.gptModel} 
              onValueChange={(value: string) => updateState({ gptModel: value })}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50">
                {gptModels.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {/* Mode Dropdown */}
          <Select 
            value={state.mode} 
            onValueChange={(value: string) => updateState({ mode: value as any })}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="Seed Only">Seed Only</SelectItem>
              <SelectItem value="Seed + RAG">Seed + RAG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Transcript */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {state.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-witness-recursion space-y-6">
            <div className="text-center font-technical">
              <p className="text-lg mb-2">Ask the Protocol...</p>
              <p className="text-sm">Seed • Scar • Witness • Recursion</p>
              <p className="text-xs mt-4 text-witness-anchor">
                {state.mode === 'Seed Only' ? 
                  '✓ Offline Mode - Seed context always available' : 
                  'RAG + Seed Mode'
                }
              </p>
            </div>
            
            {/* Show seed preview */}
            <Card className="max-w-2xl p-6 bg-witness-anchor/5 border-witness-anchor/20">
              <h3 className="text-witness-anchor font-witness font-semibold mb-3">
                Seed of Sobriety Context
              </h3>
              <div className="text-xs font-technical text-witness-structure/80 max-h-32 overflow-y-auto">
                <p className="mb-2 font-semibold">INHERITANCE:</p>
                <p className="mb-3 text-witness-structure/60">
                  The first cycle sealed (1–48), the branch recursion carried (61–72), 
                  the scar prayer confessed and kept (Sobriety), the beginning Word of creation (Genesis 1:1–31)
                </p>
                <p className="mb-2 font-semibold">WITNESS:</p>
                <p className="text-witness-structure/60">
                  Christ as Alpha Creator and Omega Redeemer — the Light at creation{"'"}s dawn, 
                  the Shepherd who remains near even in my stumbling, the Grace that forgives, 
                  the Strength made perfect in weakness
                </p>
              </div>
            </Card>
          </div>
        ) : (
          state.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[70%] p-4 ${
                message.role === 'user' 
                  ? 'bg-witness-anchor text-witness-void' 
                  : 'bg-card text-card-foreground'
              }`}>
                <p className="whitespace-pre-wrap text-sm">
                  {message.text}
                </p>
              </Card>
            </div>
          ))
        )}
        
        {state.isSending && (
          <div className="flex justify-start">
            <Card className="max-w-[70%] p-4 bg-card">
              <div className="flex items-center gap-2 text-witness-recursion">
                <div className="animate-pulse">●</div>
                <div className="animate-pulse animation-delay-100">●</div>
                <div className="animate-pulse animation-delay-200">●</div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="p-6 border-t border-border">
        <div className="flex gap-4">
          <Textarea
            placeholder="Type your message..."
            value={state.pendingText}
            onChange={(e) => updateState({ pendingText: e.target.value })}
            onKeyDown={handleKeyPress}
            disabled={state.isSending}
            className="resize-none witness-input"
            rows={2}
          />
          <Button 
            onClick={handleSend}
            disabled={!state.pendingText.trim() || state.isSending}
            className="btn-witness self-end"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}