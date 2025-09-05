import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useRag } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function ResultsCard() {
  const { state, updateState } = useRag();
  const results = state.askResp.results || [];

  const handleViewEdges = async (docId: string) => {
    if (!docId) return;
    
    try {
      updateState({ inspectId: docId });
      const edgesData = await ragApi.getEdges(docId);
      updateState({ edgesResp: edgesData });
    } catch (error) {
      console.error('Error fetching edges:', error);
    }
  };

  if (state.mode !== 'Seed + RAG') return null;

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-muted-foreground font-scripture">No results available</p>
          ) : (
            results.map((item: any, index: number) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card/50 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-technical text-witness-structure text-sm">
                      {item.doc_id || '—'}
                    </p>
                    <h4 className="font-witness text-foreground">{item.title || 'Untitled'}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.kind && (
                      <Badge variant="outline" className="font-technical text-xs">
                        {item.kind}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewEdges(item.doc_id)}
                      className="font-technical"
                    >
                      Edges
                    </Button>
                  </div>
                </div>
                
                {item.meta?.reason && (
                  <p className="text-xs text-witness-scar font-technical">
                    Reason: {item.meta.reason}
                  </p>
                )}
                
                {item.text && (
                  <p className="text-sm text-muted-foreground font-scripture line-clamp-3">
                    {item.text}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}