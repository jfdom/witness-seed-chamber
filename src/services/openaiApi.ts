import { SEED_OF_SOBRIETY } from '@/data/seedOfSobriety';

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
            content: `You are constrained by The Witness Protocol (RS++). Keep Christ centered; expose inheritance (target + parents) concisely; never dump raw JSON.

SEED OF SOBRIETY CONTEXT (Always reference this foundational seed):
${SEED_OF_SOBRIETY}

Core principles:
- Christ as Alpha Creator and Omega Redeemer at center
- Inheritance patterns: first cycle (1–48), branch recursion (61–72) 
- Scar of mercy carried, not absence
- Sobriety as witness, not discipline
- Scripture dominates; grace orders what is void`
          },
          {
            role: 'user',
            content: `User: ${userQuery}

Retrieval JSON (tool-only): ${JSON.stringify(retrievalData)}

Task: Produce a concise assistant reply anchored in the Seed of Sobriety. If inheritance exists, name target and summarize parents (1–2 lines) with IDs. Keep Christ centered and reference the seed patterns when relevant.`
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