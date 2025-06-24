const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${YOUR_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: yourPrompt }],
    }),
})
const result = await response.json()
const recommendations = result.choices[0].message.content
export const sendToAI = async (file) => {
    try {
        const resumeText = await readPDF(file)
        const promptWithResume = prompt.replace('[PASTE RESUME TEXT HERE]', resumeText)

        // Send the prompt to the AI service
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: promptWithResume }],
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to fetch AI response')
        }

        const result = await response.json()
        return result.choices[0].message.content
    } catch (error) {
        console.error('Error sending to AI:', error)
        throw error
    }
}  