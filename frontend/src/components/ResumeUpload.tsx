import axios from 'axios';
import React, { useState } from 'react'

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
  fileName: string;
  fileSize: number;
  uploadStatus: string;
}

interface ResumeUploadProps {
  selectedRole: string;
}

function ResumeUpload({ selectedRole }: ResumeUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should not exceed 10MB');
      return;
    }

    setSelectedFile(file);
    setError('');
    setUploadResult(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if (!selectedRole) {
      setError('Please select a job role first');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    // Add selected role to the form data
    formData.append('selectedRole', selectedRole);

    try {
      const response = await fetch('http://localhost:8080/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const save = await axios.post('http://localhost:8080/api/resume/save', data);
      if(save.status==200){
        console.log('Resume saved successfully:', save.data);
      }
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      

      if (response.ok) {
        console.log('Upload successful:', data);
        setUploadResult(data);
        setSelectedFile(null);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setError('');
    
    // Trigger file input dialog
    setTimeout(() => {
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    }, 100);
  };

  return (
    <div className="w-full">
      {/* Upload Area - Only show if role is selected */}
      {!uploadResult && selectedRole && (
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <p className="text-lg text-gray-600 mb-2">
              Drag and drop your resume here, or{' '}
              <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                browse
              </label>
            </p>
            <p className="text-sm text-gray-500">PDF files only, up to 10MB</p>
            
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6 text-center">
            <button
              onClick={uploadResume}
              disabled={!selectedFile || uploading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !selectedFile || uploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {uploading ? 'Parsing Resume...' : 'Upload & Parse Resume'}
            </button>
          </div>
        </div>
      )}

      {/* Upload Area - Disabled state when no role selected */}
      {!uploadResult && !selectedRole && (
        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <p className="text-lg text-gray-400 mb-2">
              Resume upload will be available after selecting a job role
            </p>
            <p className="text-sm text-gray-400">Please select a job role above first</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Success Display with Animated Tick */}
      {uploadResult && (
        <div className="text-center py-8">
          {/* Animated Check Circle */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-green-600 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  animation: 'checkmark 0.6s ease-in-out 0.3s both'
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Resume Uploaded Successfully! ✓
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              Your resume has been processed and saved.
            </p>
            <p className="text-blue-600 font-medium">
              Stay connected for further updates!
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={resetUpload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload Another Resume
          </button>
        </div>
      )}

      {/* @ts-expect-error This is builtin */}
      <style jsx="">{`
        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-45deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(-45deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

export default ResumeUpload;