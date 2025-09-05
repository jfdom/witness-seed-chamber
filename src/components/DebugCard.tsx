import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRag } from '@/context/RagContext';

export function DebugCard() {
  const { state } = useRag();

  if (state.mode !== 'Seed + RAG') return null;

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg border border-border bg-muted/20">
          <pre className="text-xs font-technical text-muted-foreground overflow-auto max-h-64">
            {JSON.stringify(state.askResp.debug || {}, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}