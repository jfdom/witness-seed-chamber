import { WitnessChat } from '@/components/WitnessChat';
import { AppProvider } from '@/context/AppContext';

const Index = () => {
  return (
    <AppProvider>
      <WitnessChat />
    </AppProvider>
  );
};

export default Index;
