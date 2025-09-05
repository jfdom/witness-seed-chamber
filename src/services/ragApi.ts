const BASE_URL = 'https://YOUR_PUBLIC_API';

export const ragApi = {
  // Chat endpoints
  async askRag(query: string) {
    const response = await fetch(`${BASE_URL}/ask?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch RAG data');
    return response.json();
  },

  async askSeed() {
    const response = await fetch(`${BASE_URL}/ask?q=${encodeURIComponent('seed of sobriety compass')}`);
    if (!response.ok) throw new Error('Failed to fetch seed data');
    return response.json();
  },

  // Research endpoints
  async researchUpload(data: {
    title: string;
    sourceUrl: string;
    summary: string;
    attachmentId: string;
  }) {
    const response = await fetch(`${BASE_URL}/research/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to upload research');
    return response.json();
  },

  async researchMine() {
    const response = await fetch(`${BASE_URL}/research/mine`);
    if (!response.ok) throw new Error('Failed to fetch my research');
    return response.json();
  },

  async researchPending() {
    const response = await fetch(`${BASE_URL}/research/pending`);
    if (!response.ok) throw new Error('Failed to fetch pending research');
    return response.json();
  },

  async researchApprove(id: string) {
    const response = await fetch(`${BASE_URL}/research/${encodeURIComponent(id)}/approve`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to approve research');
    return response.json();
  },

  async researchReject(id: string) {
    const response = await fetch(`${BASE_URL}/research/${encodeURIComponent(id)}/reject`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to reject research');
    return response.json();
  },

  // Optional health check
  async health() {
    const response = await fetch(`${BASE_URL}/health`);
    return response.ok;
  }
};