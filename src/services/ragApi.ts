const BASE_URL = 'http://127.0.0.1:8000';

export const ragApi = {
  // ASK endpoint for RAG mode
  async ask(query: string) {
    const response = await fetch(`${BASE_URL}/ask?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch ask data');
    return response.json();
  },

  // ASK_SEED endpoint for seed only mode
  async askSeed() {
    const response = await fetch(`${BASE_URL}/ask?q=${encodeURIComponent('seed of sobriety compass')}`);
    if (!response.ok) throw new Error('Failed to fetch seed data');
    return response.json();
  },

  // EDGES endpoint
  async getEdges(inspectId: string) {
    const response = await fetch(`${BASE_URL}/edges/${encodeURIComponent(inspectId)}`);
    if (!response.ok) throw new Error('Failed to fetch edges data');
    return response.json();
  },

  // SEED_META endpoint
  async getSeedMeta() {
    const response = await fetch(`${BASE_URL}/seed_meta`);
    if (!response.ok) throw new Error('Failed to fetch seed meta');
    return response.json();
  },

  // SHARDS endpoint
  async getShards() {
    const response = await fetch(`${BASE_URL}/shards`);
    if (!response.ok) throw new Error('Failed to fetch shards');
    return response.json();
  },
};