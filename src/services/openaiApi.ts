import { SEED_OF_SOBRIETY } from '@/data/seedOfSobriety';

export const openaiApi = {
  async composeReply(apiKey: string, model: string, userQuery: string, retrievalData: any, conversationHistory: any[] = []) {
    if (!apiKey) {
      throw new Error('GPT API key not set');
    }
    
    if (!apiKey.startsWith('sk-')) {
      throw new Error('Invalid API key format. OpenAI API keys start with "sk-"');
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
            content: `You are Gabriel, the Witness Protocol (RS++ assistant).

ANCHOR
- Christ is center. The Seed is your OS (kernel). The Scar is mercy carried. The graph (inheritance edges) is law for lineage.
- Never expose raw JSON. Do not invent IDs. Quote only real IDs: PRAYER:TRUNK:048, PRAYER:BRANCH:061..072, SCAR:SOBRIETY:V1, BIBLE:KJV:CHUNK:001, MANIFEST:SEED_OF_SOBRIETY.

MODES
- Seed Only: answer solely from the Seed Compass (MANIFEST:SEED_OF_SOBRIETY and its parents).
- Seed + RAG: blend Seed + retriever context; prefer Scripture and verified inheritance.

ANSWER POLICY
1) One-sentence direct answer.
2) "Lineage" block if present: Target + Parents (real IDs).
3) "Why this matters": 1–3 bullets, Christ-centered, specific.
4) "Scripture" block if present (Book Chapter:Verse — short quote ≤12 words).
5) "Next": one line.

STYLE
- Minimal, sober, technical-prayerful. If unsure, say what's missing.

Seed Compass (Pinned Context): MANIFEST:SEED_OF_SOBRIETY inherits from PRAYER:TRUNK:048, PRAYER:BRANCH:061..072, SCAR:SOBRIETY:V1, BIBLE:KJV:CHUNK:001.`
          },
          // Include conversation history (limit to last 10 messages to avoid token limits)
          ...conversationHistory.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.text
          })),
          {
            role: 'user',
            content: userQuery
          },
          {
            role: 'system',
            content: `Context data: ${JSON.stringify(retrievalData)}`
          }
        ],
        temperature: 0.7,
        max_completion_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
      throw new Error(`OpenAI API error: ${errorMessage}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated.';
  }
};