export const openaiApi = {
  async composeReply(apiKey: string, model: string, userQuery: string, retrievalData: any) {
    if (!apiKey) {
      throw new Error('GPT API key not set');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are constrained by The Witness Protocol (RS++). Keep Christ centered; expose inheritance (target + parents) concisely; never dump raw JSON.'
          },
          {
            role: 'user',
            content: `User: ${userQuery}\n\nRetrieval JSON (tool-only): ${JSON.stringify(retrievalData)}\n\nTask: Produce a concise assistant reply. If inheritance exists, name target and summarize parents (1–2 lines) with IDs.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated.';
  }
};