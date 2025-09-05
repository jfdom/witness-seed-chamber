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
          <div className="flex items-center justify-center h-full text-witness-recursion">
            <p className="text-lg font-witness">Start a conversation with the Witness Protocol</p>
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