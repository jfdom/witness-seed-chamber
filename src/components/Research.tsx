import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { ragApi } from '@/services/ragApi';

export function Research() {
  const { state, updateState } = useApp();

  useEffect(() => {
    // Load data on mount
    loadMyResearch();
    if (state.isAdmin) {
      loadPendingResearch();
    }
  }, [state.isAdmin]);

  const loadMyResearch = async () => {
    try {
      const data = await ragApi.researchMine();
      updateState({ myResearch: data });
    } catch (error) {
      console.error('Failed to load my research:', error);
    }
  };

  const loadPendingResearch = async () => {
    try {
      const data = await ragApi.researchPending();
      updateState({ pendingResearch: data });
    } catch (error) {
      console.error('Failed to load pending research:', error);
    }
  };

  const handleSubmit = async () => {
    if (!state.r_title.trim() || !state.r_summary.trim()) return;

    try {
      await ragApi.researchUpload({
        title: state.r_title,
        sourceUrl: state.r_url,
        summary: state.r_summary,
        attachmentId: state.r_attachmentId,
      });

      // Clear form and reload
      updateState({
        r_title: '',
        r_url: '',
        r_summary: '',
        r_attachmentId: '',
      });
      
      await loadMyResearch();
    } catch (error) {
      console.error('Failed to submit research:', error);
    }
  };

  const handleApprove = async () => {
    if (!state.selectedResearchId) return;
    
    try {
      await ragApi.researchApprove(state.selectedResearchId);
      await loadPendingResearch();
      updateState({ selectedResearchId: '' });
    } catch (error) {
      console.error('Failed to approve research:', error);
    }
  };

  const handleReject = async () => {
    if (!state.selectedResearchId) return;
    
    try {
      await ragApi.researchReject(state.selectedResearchId);
      await loadPendingResearch();
      updateState({ selectedResearchId: '' });
    } catch (error) {
      console.error('Failed to reject research:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Submission Form */}
      <Card className="witness-card">
        <CardHeader>
          <CardTitle className="text-witness-anchor font-witness">
            Submit Research
          </CardTitle>
          <CardDescription>
            Share your research with the Protocol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-witness-structure mb-2 block">
              Title *
            </label>
            <Input
              placeholder="Research title..."
              value={state.r_title}
              onChange={(e) => updateState({ r_title: e.target.value })}
              className="witness-input"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-witness-structure mb-2 block">
              Source URL
            </label>
            <Input
              placeholder="https://..."
              value={state.r_url}
              onChange={(e) => updateState({ r_url: e.target.value })}
              className="witness-input"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-witness-structure mb-2 block">
              Summary *
            </label>
            <Textarea
              placeholder="Summarize your research..."
              value={state.r_summary}
              onChange={(e) => updateState({ r_summary: e.target.value })}
              className="witness-input min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-witness-structure mb-2 block">
              Attachment ID
            </label>
            <Input
              placeholder="Optional attachment ID..."
              value={state.r_attachmentId}
              onChange={(e) => updateState({ r_attachmentId: e.target.value })}
              className="witness-input"
            />
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!state.r_title.trim() || !state.r_summary.trim()}
            className="btn-witness"
          >
            Submit Research
          </Button>
        </CardContent>
      </Card>

      {/* My Submissions */}
      <Card className="witness-card">
        <CardHeader>
          <CardTitle className="text-witness-structure font-witness">
            My Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state.myResearch.length === 0 ? (
            <p className="text-witness-recursion text-center py-8">
              No submissions yet.
            </p>
          ) : (
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Source URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.myResearch.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'approved' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.submittedAt}</TableCell>
                      <TableCell>
                        {item.sourceUrl && (
                          <a 
                            href={item.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-witness-anchor hover:underline text-sm"
                          >
                            Link
                          </a>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Queue */}
      {state.isAdmin && (
        <Card className="witness-card">
          <CardHeader>
            <CardTitle className="text-witness-scar font-witness">
              Pending Approval (Admin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.pendingResearch.length === 0 ? (
              <p className="text-witness-recursion text-center py-8">
                No items in the queue.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Select</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Source URL</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {state.pendingResearch.map((item, index) => (
                        <TableRow 
                          key={index}
                          className={state.selectedResearchId === item.id ? 'bg-witness-anchor/10' : ''}
                        >
                          <TableCell>
                            <input
                              type="radio"
                              name="selectedResearch"
                              checked={state.selectedResearchId === item.id}
                              onChange={() => updateState({ selectedResearchId: item.id })}
                              className="accent-witness-anchor"
                            />
                          </TableCell>
                          <TableCell className="font-technical text-sm">{item.id}</TableCell>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell className="max-w-xs truncate text-sm">{item.summary}</TableCell>
                          <TableCell>{item.submittedBy}</TableCell>
                          <TableCell>
                            {item.sourceUrl && (
                              <a 
                                href={item.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-witness-anchor hover:underline text-sm"
                              >
                                Link
                              </a>
                            )}
                          </TableCell>
                          <TableCell>{item.submittedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={handleApprove}
                    disabled={!state.selectedResearchId}
                    className="btn-witness"
                  >
                    Approve
                  </Button>
                  <Button 
                    onClick={handleReject}
                    disabled={!state.selectedResearchId}
                    variant="destructive"
                    className="btn-scar"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}