import { useNavigate } from 'react-router'
import Navbar from './Navbar'

function HowItWorks() {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">How ClearHire Works</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              ClearHire revolutionizes recruitment with AI-powered resume parsing, intelligent matching, 
              and seamless workflows for both candidates and recruiters.
            </p>
          </div>
        </section>

        {/* AI-Powered Core */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🤖 AI-Powered Intelligence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At the heart of ClearHire is our advanced AI system powered by OpenAI GPT-4, 
                transforming how resumes are processed and candidates are matched.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Intelligent Resume Parsing</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">PDF Text Extraction</h4>
                      <p className="text-gray-600">Apache PDFBox extracts raw text from uploaded PDF resumes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">GPT-4 Processing</h4>
                      <p className="text-gray-600">AI analyzes and structures data into name, email, phone, skills, experience, and education</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Smart Validation</h4>
                      <p className="text-gray-600">Fallback mechanisms ensure data quality and handle parsing errors gracefully</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-4">Sample AI Output:</h4>
                <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "skills": [
    "JavaScript", "React", "Node.js",
    "Python", "MongoDB", "AWS"
  ],
  "experience": [
    "**Senior Developer at TechCorp**
     (2021-2024): Led team of 5...",
    "**Software Engineer at StartupX**
     (2019-2021): Built scalable..."
  ],
  "education": [
    "BS Computer Science - MIT (2019)"
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* For Candidates */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">👨‍💼 For Job Seekers</h2>
              <p className="text-xl text-gray-600">Simple, AI-powered profile creation that showcases your potential</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Register & Login</h3>
                <p className="text-gray-600">Create your account with secure JWT authentication stored in localStorage for universal compatibility</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Select Job Role</h3>
                <p className="text-gray-600">Choose your target position from options like Full Stack Developer, Frontend Developer, Backend Developer</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Upload Resume</h3>
                <p className="text-gray-600">Upload your PDF resume (up to 10MB) and watch our AI extract structured data in real-time</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Discovered</h3>
                <p className="text-gray-600">Your profile becomes searchable by recruiters who can filter by role, skills, and experience</p>
              </div>
            </div>

            {/* Upload Process Detail */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📄 Smart Resume Upload Process</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg mb-4">
                    <svg className="w-12 h-12 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Drag & Drop Upload</h4>
                  <p className="text-gray-600">Intuitive file upload with validation for PDF format and 10MB size limit</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-4">
                    <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI Processing</h4>
                  <p className="text-gray-600">Real-time parsing with loading indicators and progress feedback</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-lg mb-4">
                    <svg className="w-12 h-12 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Instant Results</h4>
                  <p className="text-gray-600">Structured profile data ready for recruiter discovery with success animation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Recruiters */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🎯 For Recruiters</h2>
              <p className="text-xl text-gray-600">Powerful tools to find, evaluate, and hire the perfect candidates</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Access Platform</h3>
                <p className="text-gray-600">Log in to access the recruiter dashboard with candidate browsing capabilities</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Browse & Filter</h3>
                <p className="text-gray-600">Search candidates by role, skills, name with advanced filtering options</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Review Profiles</h3>
                <p className="text-gray-600">Access detailed candidate profiles with AI-parsed resume data and structured information</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Take Action</h3>
                <p className="text-gray-600">Schedule interviews, send messages, or download original resumes for further evaluation</p>
              </div>
            </div>

            {/* Recruiter Features */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔍 Advanced Candidate Discovery</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Smart Filtering System</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Filter by job roles (Frontend, Backend, Full Stack)</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Search by specific skills and technologies</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Quick name-based candidate lookup</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time search results with loading states</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Detailed Profile View</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>AI-structured contact information</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Categorized skills and technologies</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Formatted work experience with dates</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Educational background and qualifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🏗️ Technical Architecture</h2>
              <p className="text-xl text-gray-600">Built with modern technologies for scalability and performance</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Frontend (React)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• React 19 with TypeScript</li>
                  <li>• Vite for fast development</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• Axios for API communication</li>
                  <li>• localStorage-based authentication</li>
                  <li>• Responsive design for all devices</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Backend (Spring Boot)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Spring Boot 3.5.3 with Java 21</li>
                  <li>• JWT authentication with BCrypt</li>
                  <li>• RESTful API architecture</li>
                  <li>• Apache PDFBox for PDF processing</li>
                  <li>• OpenAI GPT-4 integration</li>
                  <li>• Comprehensive error handling</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Database & Deployment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• MongoDB Atlas (Cloud NoSQL)</li>
                  <li>• Users and Resumes collections</li>
                  <li>• Docker containerized backend</li>
                  <li>• Vercel frontend deployment</li>
                  <li>• Render backend hosting</li>
                  <li>• Environment-based configuration</li>
                </ul>
              </div>
            </div>

            {/* Data Flow */}
            <div className="mt-16 bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Data Flow Process</h3>
              <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4 md:space-y-0">
                <div className="bg-white rounded-lg p-4 shadow text-center min-w-0 flex-shrink-0">
                  <div className="font-semibold text-blue-600">PDF Upload</div>
                  <div className="text-sm text-gray-600">User uploads resume</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-white rounded-lg p-4 shadow text-center min-w-0 flex-shrink-0">
                  <div className="font-semibold text-green-600">Text Extraction</div>
                  <div className="text-sm text-gray-600">PDFBox processes file</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-white rounded-lg p-4 shadow text-center min-w-0 flex-shrink-0">
                  <div className="font-semibold text-purple-600">AI Processing</div>
                  <div className="text-sm text-gray-600">GPT-4 structures data</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-white rounded-lg p-4 shadow text-center min-w-0 flex-shrink-0">
                  <div className="font-semibold text-orange-600">Database Storage</div>
                  <div className="text-sm text-gray-600">MongoDB saves profile</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="bg-white rounded-lg p-4 shadow text-center min-w-0 flex-shrink-0">
                  <div className="font-semibold text-red-600">Recruiter Access</div>
                  <div className="text-sm text-gray-600">Searchable profiles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Performance */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🔒 Security & Performance</h2>
              <p className="text-xl text-gray-600">Enterprise-grade security with optimal performance</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">🛡️ Security Features</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">JWT Authentication</h4>
                      <p className="text-gray-600">Secure token-based authentication with localStorage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8A6 6 0 006 8v2.5a1.5 1.5 0 01-3 0V8a9 9 0 0118 0v2.5a1.5 1.5 0 01-3 0V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Password Encryption</h4>
                      <p className="text-gray-600">BCrypt hashing for secure password storage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">CORS Protection</h4>
                      <p className="text-gray-600">Configurable cross-origin resource sharing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Universal Compatibility</h4>
                      <p className="text-gray-600">Works on all devices including iPhone Safari and incognito modes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">⚡ Performance Optimizations</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Vite Build System</h4>
                      <p className="text-gray-600">Lightning-fast development and optimized production builds</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Efficient API Design</h4>
                      <p className="text-gray-600">RESTful endpoints with proper error handling and validation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Cloud Infrastructure</h4>
                      <p className="text-gray-600">MongoDB Atlas, Vercel, and Render for scalable deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Real-time Feedback</h4>
                      <p className="text-gray-600">Loading states, progress indicators, and success animations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience ClearHire?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the future of recruitment with AI-powered resume parsing and intelligent candidate matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg" onClick={()=>navigate("/top-candidates")}>
                Browse Candidates
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition text-lg" onClick={()=>navigate("/apply")}>
                Join as Candidate
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HowItWorks
