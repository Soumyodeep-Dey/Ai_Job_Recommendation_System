import * as pdfjsLib from 'pdfjs-dist'

const prompt = `
Extract the candidate's key skills, experience, and desired job roles from the following resume text:

[PASTE RESUME TEXT HERE]

Return the result in JSON format like:
{
  "skills": [...],
  "experience_summary": "...",
  "desired_roles": [...]
}
`

const readPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        text += content.items.map((item) => item.str).join(' ')
    }
    return text
}

const parseResume = async (file) => {
    const resumeText = await readPDF(file)
    const promptWithResume = prompt.replace('[PASTE RESUME TEXT HERE]', resumeText)

    // Simulate sending the prompt to an AI service
    // In a real application, you would send this to your AI model
    console.log('Prompt sent to AI:', promptWithResume)

    // Mock response for demonstration purposes
    return {
        skills: ['JavaScript', 'React', 'Node.js'],
        experience_summary: '5 years of experience in full-stack development.',
        desired_roles: ['Frontend Developer', 'Full Stack Developer']
    }
}