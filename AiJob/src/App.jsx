import { useState } from 'react'
import './index.css'

function App() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile)
    } else {
      alert('Please upload a PDF or Word document')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first')
      return
    }

    setUploading(true)
    // TODO: Implement actual file upload logic here
    setTimeout(() => {
      setUploading(false)
      alert('Resume uploaded successfully!')
      setFile(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            AI Job Recommendation System
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Upload your resume and let our AI find the perfect job matches for you
            </p>
          </div>

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
                <p className="text-gray-600">
                  Selected file: {file.name}
                </p>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`mt-4 px-6 py-2 rounded-lg ${
                    uploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  } text-white transition-all transform hover:scale-105 shadow-lg`}
                >
                  {uploading ? 'Uploading...' : 'Upload Resume'}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Supported formats: PDF, DOC, DOCX</p>
            <p>Maximum file size: 5MB</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-white/80 backdrop-blur-sm">
        <p className="text-sm">
          Made with <span className="text-red-500 animate-pulse">❤</span> by{' '}
          <a 
            href="https://soumyodeepdey.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200 transition-colors underline decoration-dotted"
          >
            Soumyodeep Dey
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App 