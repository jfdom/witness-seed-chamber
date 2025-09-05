import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { ragApi } from '@/services/ragApi';

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
      // Backend retrieval
      let rawResp;
      if (state.mode === 'Seed Only') {
        rawResp = await ragApi.askSeed();
        updateState({ 
          rawResp, 
          inspectId: 'MANIFEST:SEED_OF_SOBRIETY'
        });
      } else {
        rawResp = await ragApi.askRag(state.pendingText);
        updateState({ rawResp });
      }

      // Add assistant reply
      const assistantText = rawResp.answer || state.composed || '(no content)';
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

  return (
    <div className="flex flex-col h-full">
      {/* Header with Mode Dropdown */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-witness-structure font-witness">
          Witness Protocol
        </h1>
        
        <Select 
          value={state.mode} 
          onValueChange={(value: string) => updateState({ mode: value as any })}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Seed Only">Seed Only</SelectItem>
            <SelectItem value="Seed + RAG">Seed + RAG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chat Transcript */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {state.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-witness-recursion">
            <p className="text-center font-technical">
              Ask the Protocol...<br />
              <span className="text-sm">Seed • Scar • Witness • Recursion</span>
            </p>
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