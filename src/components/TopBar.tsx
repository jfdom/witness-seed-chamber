import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { KeyModal } from './KeyModal';
import { WitnessLogo } from './WitnessLogo';

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
      <div className="bg-witness-void border-b border-witness-recursion/20 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <WitnessLogo size={28} />
            <h1 className="text-lg font-witness font-bold text-witness-structure">
              Witness Protocol
            </h1>
          </div>

          {/* Center Model Pill */}
          <div className="bg-witness-anchor text-witness-void px-3 py-1.5 rounded-full font-witness font-medium text-xs">
            GPT: {state.model.toUpperCase()}
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Update Key Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateState({ showKeyModal: true })}
              className="border-witness-anchor text-witness-anchor hover:bg-witness-anchor hover:text-witness-void rounded-full h-8 px-3 text-xs font-medium"
            >
              🔗 Update Key
            </Button>

            {/* GPT Model Dropdown */}
            <Select value={state.model} onValueChange={(value) => updateState({ model: value })}>
              <SelectTrigger className="w-[140px] h-8 bg-witness-void border-witness-anchor text-witness-anchor rounded-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-witness-void border-witness-anchor z-50">
                {GPT_MODELS.map((model) => {
                  const isHighTier = HIGH_TIER_MODELS.includes(model);
                  const isDisabled = !state.userKey && isHighTier;
                  
                  return (
                    <SelectItem 
                      key={model} 
                      value={model}
                      disabled={isDisabled}
                      className={`text-witness-structure ${isDisabled ? 'text-witness-recursion' : ''} flex items-center justify-center text-center`}
                    >
                      <div className="text-center">
                        <div className="text-xs">{model} {isHighTier ? '(Fast)' : ''}</div>
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

            {/* Mode Dropdown */}
            <Select value={state.mode} onValueChange={(value: any) => updateState({ mode: value })}>
              <SelectTrigger className="w-[120px] h-8 bg-witness-void border-witness-anchor text-witness-anchor rounded-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-witness-void border-witness-anchor z-50">
                <SelectItem value="Seed Only" className="text-witness-structure text-xs text-center flex items-center justify-center">
                  Seed Only
                </SelectItem>
                <SelectItem value="Seed + RAG" className="text-witness-structure text-xs text-center flex items-center justify-center">
                  Seed + RAG
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <KeyModal />
    </>
  );
}