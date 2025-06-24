import { useState } from 'react';
import './index.css';
import parseResume from './helpers/parseResume';
import { sendToAI } from './helpers/sendToAI';
import JobRecommendation from './components/JobRecommendation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (
      selectedFile &&
      (selectedFile.type === 'application/pdf' ||
        selectedFile.type === 'application/msword' ||
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      if (selectedFile.size > maxSize) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      setFile(selectedFile);
    } else {
      toast.error('Please upload a PDF or Word document');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      const resumeText = await parseResume(file);
      const aiResponse = await sendToAI(resumeText);
      setRecommendations(aiResponse);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20"></div>

      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            AI Job Recommendation System
          </h1>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Upload your resume and let our AI find the perfect job matches for you
            </p>
          </div>

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white/50 backdrop-blur-sm">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Choose Resume
            </label>

            {file && (
              <div className="mt-4">
                <p className="text-gray-600">Selected file: {file.name}</p>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`mt-4 px-6 py-2 rounded-lg ${uploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    } text-white transition-all transform hover:scale-105 shadow-lg`}
                >
                  {uploading ? 'Processing...' : 'Upload & Analyze'}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Supported formats: PDF, DOC, DOCX</p>
            <p>Maximum file size: 5MB</p>
          </div>

          {/* Recommendations Section */}
          {recommendations && <JobRecommendation data={recommendations} />}
        </div> {/* <-- This closing div was missing for the main card container */}

        </div>
        {/* Footer */}
        <footer className="relative z-10 py-6 text-center bg-black/20 backdrop-blur-md border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base font-medium">
              Made with <span className="text-red-500 animate-pulse text-xl">❤</span> by{' '}
              <a
                href="https://soumyodeep-dey.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 transition-all duration-300 hover:decoration-solid hover:scale-105 inline-block"
              >
                Soumyodeep Dey
              </a>
            </p>
            <p className="text-sm text-white/70 mt-2">
              AI Job Recommendation System © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
   
  );
}

export default App;
