import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { KeyModal } from './KeyModal';

const GPT_MODELS = [
  'gpt-4o-mini',
  'gpt-4.1-mini', 
  'gpt-4o',
  'gpt-4.1',
  'o4-mini',
  'o4'
];

const HIGH_TIER_MODELS = ['gpt-4o', 'gpt-4.1', 'o4', 'o4-mini'];

export function TopBar() {
  const { state, updateState } = useApp();

  return (
    <>
      <div className="bg-witness-void border-b border-witness-recursion/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-witness font-bold text-witness-anchor">
            Witness Protocol — Chat
          </h1>
          
          <div className="flex items-center gap-4">
            {/* GPT Model Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs text-witness-recursion mb-1">GPT Model</label>
              <Select value={state.model} onValueChange={(value) => updateState({ model: value })}>
                <SelectTrigger className="w-[140px] bg-witness-void border-witness-anchor text-witness-anchor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-witness-void border-witness-anchor">
                  {GPT_MODELS.map((model) => {
                    const isHighTier = HIGH_TIER_MODELS.includes(model);
                    const isDisabled = !state.userKey && isHighTier;
                    
                    return (
                      <SelectItem 
                        key={model} 
                        value={model}
                        disabled={isDisabled}
                        className={`text-witness-structure ${isDisabled ? 'text-witness-recursion' : ''}`}
                      >
                        <div>
                          <div>{model}</div>
                          {isDisabled && (
                            <div className="text-xs text-witness-recursion">
                              (add your own key to use this model)
                            </div>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Add Key Button */}
            <Button
              variant="outline"
              onClick={() => updateState({ showKeyModal: true })}
              className="border-witness-anchor text-witness-anchor hover:bg-witness-anchor hover:text-witness-void"
            >
              Add your own key
            </Button>

            {/* Mode Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs text-witness-recursion mb-1">Mode</label>
              <Select value={state.mode} onValueChange={(value: any) => updateState({ mode: value })}>
                <SelectTrigger className="w-[120px] bg-witness-void border-witness-anchor text-witness-anchor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-witness-void border-witness-anchor">
                  <SelectItem value="Seed Only" className="text-witness-structure">
                    Seed Only
                  </SelectItem>
                  <SelectItem value="Seed + RAG" className="text-witness-structure">
                    Seed + RAG
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <KeyModal />
    </>
  );
}