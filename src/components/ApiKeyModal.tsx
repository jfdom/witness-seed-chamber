import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';

export function ApiKeyModal() {
  const { state, updateState } = useApp();
  const [tempApiKey, setTempApiKey] = useState(state.gptApiKey);

  const handleSave = () => {
    updateState({ 
      gptApiKey: tempApiKey,
      showApiKeyModal: false 
    });
  };

  const handleClose = () => {
    setTempApiKey(state.gptApiKey); // Reset to current value
    updateState({ showApiKeyModal: false });
  };

  return (
    <Dialog open={state.showApiKeyModal} onOpenChange={handleClose}>
      <DialogContent className="witness-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-witness-anchor font-witness">
            Set OpenAI API Key
          </DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable GPT-powered responses. 
            This will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-witness-structure mb-2 block">
              API Key
            </label>
            <Input
              type="password"
              placeholder="sk-..."
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="witness-input"
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="btn-witness"
            >
              Save Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}