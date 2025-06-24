const apiKey = import.meta.env.VITE_GPT_API_KEY;

export const sendToAI = async (resumeText) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: resumeText }
                            ]
                        }
                    ]
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch AI response: ${response.statusText}`);
        }

        const data = await response.json();
        // Gemini's response structure: data.candidates[0].content.parts[0].text
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return { raw: text };
    } catch (error) {
        console.error('Error sending to Gemini AI:', error);
        throw error;
    }
};