const BASE_URL = 'https://witness.ngrok.dev';

export const chatApi = {
  async sendMessage(data: {
    model: string;
    mode: string;
    messages: any[];
    userKey?: string;
  }) {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OPENAI-KEY': data.userKey || ''
      },
      body: JSON.stringify({
        model: data.model,
        mode: data.mode === 'Seed Only' ? 'seed' : 'seed_rag',
        messages: data.messages
      })
    });
    
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  async health() {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};