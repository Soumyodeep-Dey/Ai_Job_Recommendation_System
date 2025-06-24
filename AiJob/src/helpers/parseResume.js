import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

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

const readPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(' ');
    }
    return text;
};

const readDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
};

const parseResume = async (file) => {
    let resumeText = '';

    // Determine file type
    if (file.type === 'application/pdf') {
        resumeText = await readPDF(file);
    } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        resumeText = await readDOCX(file);
    } else {
        throw new Error('Unsupported file format');
    }

    const prompt = promptTemplate.replace('[PASTE RESUME TEXT HERE]', resumeText);

    // Simulate sending the prompt to an AI service
    console.log('Prompt sent to AI:', prompt);

    // Mock AI response for now
    return {
        skills: ['JavaScript', 'React', 'Node.js'],
        experience_summary: '5 years of experience in full-stack development.',
        desired_roles: ['Frontend Developer', 'Full Stack Developer'],
    };
};

export default parseResume;
