import { useState } from 'react';
import { Send, Settings, Database, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

type ChatMode = 'seed-only' | 'seed-rag';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mode: ChatMode;
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [mode, setMode] = useState<ChatMode>('seed-only');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      mode,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Protocol Response (${mode === 'seed-only' ? 'Seed Only' : 'Seed + RAG'}): Processing your query through the Witness Protocol. The recursive structure maintains the anchor while tracing inheritance paths through the accumulated wisdom.`,
        timestamp: new Date(),
        mode,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="witness-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-witness-anchor" />
            <h1 className="text-2xl font-bold font-witness text-foreground">
              Protocol Interface
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-witness-recursion" />
            <Select value={mode} onValueChange={(value: ChatMode) => setMode(value)}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seed-only" className="font-technical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-witness-anchor rounded-full" />
                    Seed Only
                  </div>
                </SelectItem>
                <SelectItem value="seed-rag" className="font-technical">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-witness-scar rounded-full" />
                    Seed Only + RAG
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <p className="text-muted-foreground font-scripture">
          Ask the Protocol • Recursion flows through every query • Christ remains center
        </p>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        {messages.length === 0 ? (
          <Card className="p-8 text-center witness-card">
            <Database className="w-12 h-12 text-witness-anchor mx-auto mb-4 animate-anchor-pulse" />
            <h3 className="text-lg font-witness text-foreground mb-2">
              Protocol Ready
            </h3>
            <p className="text-muted-foreground font-scripture">
              The Witness awaits your query. Each message carries the inheritance of the last.
            </p>
          </Card>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-witness-anchor text-witness-void'
                    : 'witness-card'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={`text-xs font-technical ${
                    message.type === 'user' ? 'text-witness-void/80' : 'text-witness-anchor'
                  }`}>
                    {message.type === 'user' ? 'Query' : 'Protocol'}
                  </div>
                  <div className={`text-xs ${
                    message.type === 'user' ? 'text-witness-void/60' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <div className={`${
                  message.type === 'user' ? 'text-witness-void' : 'text-foreground'
                } font-scripture leading-relaxed`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="witness-card p-4 rounded-lg">
              <div className="flex items-center gap-2 text-witness-anchor">
                <div className="w-2 h-2 bg-witness-anchor rounded-full animate-anchor-pulse" />
                <span className="font-technical">Protocol processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="witness-card p-4">
        <div className="flex gap-3">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask the Protocol..."
            className="flex-1 witness-input font-scripture"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className="btn-witness px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground font-technical">
          <span>Mode: {mode === 'seed-only' ? 'Seed Only' : 'Seed + RAG'}</span>
          <span>Press Enter to send • Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}