import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useRag } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function ShardsCard() {
  const { state, updateState } = useRag();

  const handleRefreshShards = async () => {
    try {
      const shardsData = await ragApi.getShards();
      updateState({ shardsResp: shardsData });
    } catch (error) {
      console.error('Error fetching shards:', error);
    }
  };

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Shards</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleRefreshShards} className="btn-witness w-full">
          Refresh shards
        </Button>

        <div className="p-4 rounded-lg border border-border bg-muted/20">
          <pre className="text-xs font-technical text-muted-foreground overflow-auto max-h-64">
            {JSON.stringify(state.shardsResp, null, 2) || 'No shards data'}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}