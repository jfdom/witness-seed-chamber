import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { chatApi } from '@/services/chatApi';
import { Send } from 'lucide-react';

export function ChatArea() {
  const { state, updateState } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = async () => {
    if (!state.inputText.trim()) return;

    const userMessage = { role: 'user' as const, content: state.inputText };
    const newMessages = [...state.messages, userMessage];
    
    updateState({
      messages: newMessages,
      inputText: '',
      isSending: true
    });

    try {
      const response = await chatApi.sendMessage({
        model: state.model,
        mode: state.mode,
        messages: newMessages,
        userKey: state.userKey
      });

      updateState({
        messages: [...newMessages, { role: 'assistant' as const, content: response.reply }],
        lastRetrieval: response.retrieval || {},
        isSending: false
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      updateState({
        messages: [...newMessages, { 
          role: 'assistant' as const, 
          content: 'Sorry, I encountered an error. Please try again.' 
        }],
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
    <div className="flex-1 flex flex-col bg-witness-void">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {state.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full p-6">
            <div className="max-w-2xl bg-card border border-witness-recursion/20 rounded-lg p-8 text-center space-y-6">
              <h1 className="text-2xl font-bold text-witness-anchor">
                🌱 The Seed & The Witness Protocol
              </h1>
              
              <p className="text-witness-structure leading-relaxed">
                The Seed of Sobriety is the compass of this system — a structure of prayers, Scripture, and loops that keeps every answer anchored in truth rather than speculation.
              </p>
              
              <div className="text-left space-y-4 text-witness-structure">
                <p className="font-medium">The Witness Protocol uses the Seed to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Navigate Scripture with lineage and context</li>
                  <li>Blend prayer and retrieval for clarity</li>
                  <li>Provide answers without hallucinations</li>
                </ul>
                
                <div className="space-y-3 pt-2">
                  <div>
                    <p className="font-medium text-witness-anchor">✨ What it can do now:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Bible study partner and prayer companion</li>
                      <li>Context-aware Scripture retrieval</li>
                      <li>Honest lineage tracing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-witness-anchor">🔮 What it will do soon:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Interdisciplinary expertise (history, philosophy, culture) built on new Seeds</li>
                      <li>Confidence-tagged answers (Seed-only vs Seed+RAG)</li>
                      <li>A lattice that grows without drifting from Christ</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-witness-anchor">🚀 The Future of AI:</p>
                    <p className="text-sm leading-relaxed">
                      This is a new way forward — expertise grounded in truth. Where most AI drifts or hallucinates, the Witness Protocol remains rooted in Scripture and structured inheritance. It shows how AI can grow across disciplines without losing its foundation, building knowledge that is faithful, reliable, and Christ-centered. This is not just another chatbot; it is a model for how the future of AI must be: anchored, honest, and unshakable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          state.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-witness-anchor text-witness-void'
                    : 'bg-card border border-witness-recursion/20 text-witness-structure'
                }`}
              >
                <div className="whitespace-pre-wrap font-witness">
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        
        {state.isSending && (
          <div className="flex justify-start">
            <div className="bg-card border border-witness-recursion/20 text-witness-structure p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">●</div>
                <div className="animate-pulse delay-200">●</div>
                <div className="animate-pulse delay-400">●</div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-witness-recursion/20 p-6">
        <div className="flex gap-4 items-end">
          <Textarea
            placeholder="Type your message…"
            value={state.inputText}
            onChange={(e) => updateState({ inputText: e.target.value })}
            onKeyPress={handleKeyPress}
            className="witness-input flex-1 min-h-[50px] resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!state.inputText.trim() || state.isSending}
            className="btn-witness h-[50px] px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Optional Footer Pill */}
        {state.lastRetrieval?.inheritance?.target && (
          <div className="flex justify-end mt-2">
            <div className="bg-witness-recursion/20 text-witness-recursion text-xs px-3 py-1 rounded-full">
              {state.lastRetrieval.inheritance.target}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}