
import ResumeUpload from '../ResumeUpload'
import Navbar from '../Navbar'
// import ClientAccount from './ClientAccount'  // Uncomment when adding account navigation

function ClientMainPage() {
  return (
    <>
      <Navbar/>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to ClearHire
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload your resume and let our AI-powered system match you with the perfect opportunities. 
              Get discovered by top employers looking for talent like yours.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Resume</h2>
                <p className="text-gray-600">
                  Upload your resume in PDF, DOC, or DOCX format to get started
                </p>
              </div>
              
              <ResumeUpload/>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Tips for better results:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use a clear, professional format</li>
                  <li>• Include relevant keywords for your industry</li>
                  <li>• Keep your resume updated with recent experience</li>
                  <li>• Ensure file size is under 5MB</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Features & Benefits */}
            <div className="space-y-8">
              
              {/* Process Steps */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Upload Resume</h3>
                      <p className="text-gray-600 text-sm">Upload your resume and let our AI analyze your skills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">AI Matching</h3>
                      <p className="text-gray-600 text-sm">Our system matches you with relevant job opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Get Discovered</h3>
                      <p className="text-gray-600 text-sm">Connect with employers actively seeking your skills</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose ClearHire?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">Fast Processing</h3>
                    <p className="text-gray-600 text-xs mt-1">Instant resume analysis</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">Secure</h3>
                    <p className="text-gray-600 text-xs mt-1">Your data is protected</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">Smart Matching</h3>
                    <p className="text-gray-600 text-xs mt-1">AI-powered recommendations</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">Top Employers</h3>
                    <p className="text-gray-600 text-xs mt-1">Connect with leading companies</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-semibold mb-6">Join Thousands of Successful Candidates</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-1">10K+</div>
                    <div className="text-blue-100 text-sm">Resumes Processed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-blue-100 text-sm">Partner Companies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">95%</div>
                    <div className="text-blue-100 text-sm">Match Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientMainPage