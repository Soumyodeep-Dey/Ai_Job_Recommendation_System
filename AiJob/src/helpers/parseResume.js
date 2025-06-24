import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
import mammoth from 'mammoth';

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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

    if (file.type === 'application/pdf') {
        resumeText = await readPDF(file);
    } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        resumeText = await readDOCX(file);
    } else {
        throw new Error('Unsupported file format');
    }
    
    return resumeText;
};
  

export default parseResume;
