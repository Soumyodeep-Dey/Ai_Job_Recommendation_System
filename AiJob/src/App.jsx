import { useState, useRef } from 'react';
import './index.css';
import parseResume from './helpers/parseResume';
import { sendToAI } from './helpers/sendToAI';
import JobRecommendation from './components/JobRecommendation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUploadCloud } from 'react-icons/fi';

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
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
      // Do NOT log error to console (prevents API key exposure)
      toast.error('Something went wrong. Please retry.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-x-hidden">
      {/* Glassmorphism Card */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20 pointer-events-none"></div>
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl mx-auto my-12 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 relative z-10 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4 tracking-tight drop-shadow-lg">AI Job Recommendation System</h1>
          <p className="text-center text-lg text-gray-700 mb-8">Upload your resume and let our AI find the perfect job matches for you</p>
          {/* Drag & Drop Upload */}
          <form
            className={`transition-all duration-300 border-2 border-dashed rounded-2xl p-8 text-center bg-white/60 backdrop-blur-lg shadow-lg relative ${dragActive ? 'border-blue-500 bg-blue-50/80' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onSubmit={e => e.preventDefault()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center cursor-pointer select-none"
            >
              <FiUploadCloud className="text-5xl text-blue-500 mb-2 animate-bounce" />
              <span className="text-base font-medium text-gray-700">Drag & drop your resume here, or <span className="text-blue-600 underline">browse</span></span>
              <span className="text-xs text-gray-500 mt-1">Supported: PDF, DOC, DOCX &bull; Max size: 5MB</span>
            </label>
            {dragActive && (
              <div
                className="absolute inset-0 rounded-2xl border-4 border-blue-400 border-dashed bg-blue-100/40 z-20 animate-pulse pointer-events-none"
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              />
            )}
            {file && (
              <div className="mt-6 flex flex-col items-center gap-2 animate-fade-in">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow">{file.name}</span>
                <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`mt-2 px-8 py-2 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'} text-white hover:scale-105`}
                >
                  {uploading ? (
                    <span className="flex items-center gap-2 justify-center"><span className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5"></span> Processing...</span>
                  ) : 'Upload & Analyze'}
                </button>
              </div>
            )}
          </form>
          {/* Recommendations Section */}
          {recommendations && <JobRecommendation data={recommendations} />}
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center w-full bg-black/20 backdrop-blur-md border-t border-white/10 mt-8">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-base font-medium">
            Made by {' '}
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
      {/* Spinner CSS */}
      <style>{`
        .loader {
          border-top-color: #6366f1;
          animation: spinner 0.6s linear infinite;
        }
        @keyframes spinner {
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
