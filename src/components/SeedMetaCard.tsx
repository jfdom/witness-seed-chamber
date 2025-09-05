import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useRag } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function SeedMetaCard() {
  const { state, updateState } = useRag();

  const handleRefreshSeedMeta = async () => {
    try {
      const seedMetaData = await ragApi.getSeedMeta();
      updateState({ seedMetaResp: seedMetaData });
    } catch (error) {
      console.error('Error fetching seed meta:', error);
    }
  };

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Seed Meta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleRefreshSeedMeta} className="btn-witness w-full">
          Refresh seed_meta
        </Button>

        <div className="p-4 rounded-lg border border-border bg-muted/20">
          <pre className="text-xs font-technical text-muted-foreground overflow-auto max-h-64">
            {JSON.stringify(state.seedMetaResp, null, 2) || 'No seed meta data'}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}