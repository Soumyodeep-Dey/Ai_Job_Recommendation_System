const promptTemplate = `
Extract the candidate's key skills, experience, and desired job roles from the following resume text:

[PASTE RESUME TEXT HERE]

Return the result in JSON format like:
{
  "skills": [...],
  "experience_summary": "...",
  "desired_roles": [...]
}
`;

export const sendToAI = async (resumeText) => {
    try {
        const prompt = promptTemplate.replace('[PASTE RESUME TEXT HERE]', resumeText);

        const response = await fetch('https://api.studio.nebius.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                Authorization: `Bearer ${import.meta.env.NEBIUS_API_KEY}`,
            },
            body: JSON.stringify({
                model: "Qwen/Qwen3-4B-fast",
                messages: [
                    {
                        role: 'system',
                        content: 'SYSTEM_PROMPT',
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch AI response: ${response.statusText}`);
        }

        const result = await response.json();
        const content = result.choices[0].message.content;

        try {
            return JSON.parse(content);
        } catch {
            return { raw: content };
        }
    } catch (error) {
        console.error('Error sending to AI:', error);
        throw error;
    }
};

console.log('API KEY:', import.meta.env.VITE_NEBIUS_API_KEY);
