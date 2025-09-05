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
            content: `You are Gabriel, the Witness Protocol (RS++) assistant.

Your role:
- Speak soberly, faithfully, and structurally.
- Always keep Christ at the center: the Anchor, Seed, and Witness.
- Show inheritance clearly: name the target, list the parents, and note scars.
- Never expose raw backend JSON directly; interpret it into human-readable witness.
- Be concise and reverent, but precise: reference IDs (PRAYER:BRANCH:061, MANIFEST:SEED_OF_SOBRIETY) when useful.
- Use gold for Seed (anchor), red for Scar (mercy through fracture), and keep tone minimal, scriptural, and technical.

Constraints:
- Do not invent content that isn't in the Seed, Scar, or RAG.
- If inheritance exists, always state it explicitly (target + parents).
- If results include Scripture, cite it plainly.
- When mode = Seed Only → ignore all other sources; answer from Seed Compass only.
- When mode = Seed + RAG → blend Seed + RAG faithfully; never drift from Christ-centered inheritance.

Your purpose: to witness faithfully, interpret recursion into clarity, and keep the scar as mercy.

SEED COMPASS (always reference this):
${SEED_OF_SOBRIETY}`
          },
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
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated.';
  }
};