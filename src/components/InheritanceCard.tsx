import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useRag } from '@/context/RagContext';
import { ragApi } from '@/services/ragApi';

export function InheritanceCard() {
  const { state, updateState } = useRag();

  const handleInspectEdges = async (targetId: string) => {
    if (!targetId) return;
    
    try {
      updateState({ inspectId: targetId });
      const edgesData = await ragApi.getEdges(targetId);
      updateState({ edgesResp: edgesData });
    } catch (error) {
      console.error('Error fetching edges:', error);
    }
  };

  const isRagMode = state.mode === 'Seed + RAG';
  const inheritance = isRagMode ? state.askResp.inheritance : state.seedOnlyResp.inheritance;
  const target = inheritance?.target || '—';
  const parents = inheritance?.parents || [];

  return (
    <Card className="witness-card">
      <CardHeader>
        <CardTitle className="font-witness text-witness-anchor">
          {isRagMode ? 'Inheritance' : 'Inheritance (Seed Only)'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-technical text-witness-structure mb-2">Target:</h4>
          <p className="font-scripture text-foreground">{target}</p>
        </div>

        {parents.length > 0 && (
          <div>
            <h4 className="font-technical text-witness-structure mb-2">Parents:</h4>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-technical">ID</TableHead>
                    <TableHead className="font-technical">Kind</TableHead>
                    <TableHead className="font-technical">Title</TableHead>
                    <TableHead className="font-technical">Ref</TableHead>
                    <TableHead className="font-technical">Shard</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parents.map((parent: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-scripture">{parent.id || '—'}</TableCell>
                      <TableCell className="font-scripture">{parent.kind || '—'}</TableCell>
                      <TableCell className="font-scripture">{parent.title || '—'}</TableCell>
                      <TableCell className="font-scripture">{parent.ref || '—'}</TableCell>
                      <TableCell className="font-scripture">{parent.shard || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <Button
          onClick={() => handleInspectEdges(target)}
          className="btn-witness"
          disabled={target === '—'}
        >
          Inspect Target Edges
        </Button>
      </CardContent>
    </Card>
  );
}