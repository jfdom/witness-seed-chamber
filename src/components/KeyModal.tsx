import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';

export function KeyModal() {
  const { state, updateState } = useApp();
  const [tempKey, setTempKey] = useState(state.userKey);

  const handleSave = () => {
    updateState({ 
      userKey: tempKey,
      showKeyModal: false 
    });
  };

  const handleClear = () => {
    setTempKey('');
    updateState({ 
      userKey: '',
      showKeyModal: false 
    });
  };

  const handleClose = () => {
    setTempKey(state.userKey);
    updateState({ showKeyModal: false });
  };

  return (
    <Dialog open={state.showKeyModal} onOpenChange={handleClose}>
      <DialogContent className="witness-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-witness-anchor font-witness">
            Use your own OpenAI API key
          </DialogTitle>
          <DialogDescription className="text-witness-recursion">
            Enter your OpenAI API key to access premium models.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="sk-..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="witness-input"
          />
          
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={handleClear}
              className="border-witness-scar text-witness-scar hover:bg-witness-scar hover:text-witness-structure"
            >
              Clear
            </Button>
            <Button 
              onClick={handleSave}
              className="btn-witness"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}