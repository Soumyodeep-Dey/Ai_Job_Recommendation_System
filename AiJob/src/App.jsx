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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            AI Job Recommendation System
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Upload your resume and let our AI find the perfect job matches for you
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
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
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white transition-colors`}
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
    </div>
  )
}

export default App 