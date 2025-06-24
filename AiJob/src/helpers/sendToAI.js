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

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI response');
        }

        const result = await response.json();
        const content = result.choices[0].message.content;

        try {
            return JSON.parse(content); // If AI responds in proper JSON
        } catch {
            return { raw: content }; // If response is plain text
        }
    } catch (error) {
        console.error('Error sending to AI:', error);
        throw error;
    }
};
