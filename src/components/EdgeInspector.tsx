import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useRag } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function EdgeInspector() {
  const { state, updateState } = useRag();

  const handleLoadEdges = async () => {
    if (!state.inspectId) return;
    
    try {
      const edgesData = await ragApi.getEdges(state.inspectId);
      updateState({ edgesResp: edgesData });
    } catch (error) {
      console.error('Error fetching edges:', error);
    }
  };

  const edges = state.edgesResp?.edges || [];

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">Edge Inspector</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={state.inspectId}
            onChange={(e) => updateState({ inspectId: e.target.value })}
            placeholder="Inspect ID..."
            className="witness-input font-technical"
          />
          <Button onClick={handleLoadEdges} className="btn-witness">
            Load Edges
          </Button>
        </div>

        {edges.length > 0 ? (
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-technical">Relation</TableHead>
                  <TableHead className="font-technical">Destination ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {edges.map((edge: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-scripture">{edge.rel || '—'}</TableCell>
                    <TableCell className="font-scripture">{edge.dst_id || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-4 rounded-lg border border-border bg-muted/20">
            <pre className="text-xs font-technical text-muted-foreground overflow-auto">
              {JSON.stringify(state.edgesResp, null, 2) || 'No edges data'}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}