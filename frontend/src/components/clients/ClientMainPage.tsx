import ResumeUpload from '../ResumeUpload'
import Navbar from '../Navbar'
import { jobRolesByCategory } from '../roles/roles'
import { useState } from 'react'; // Removed unused 'useEffect' import
// import ClientAccount from './ClientAccount'  // Uncomment when adding account navigation

function ClientMainPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [data, setData] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const handleInputChange = (query: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = query.target.value.toLowerCase();
    setSearchInput(inputValue); // Track the input value
    
    if (inputValue.trim() === '') {
      // If input is empty, show roles from selected category or empty array
     setData(
    selectedCategory && selectedCategory in jobRolesByCategory
    ? jobRolesByCategory[selectedCategory as keyof typeof jobRolesByCategory]
    : []
);

      return;
    }
    
    if (selectedCategory) {
      const categoryRoles = jobRolesByCategory[selectedCategory as keyof typeof jobRolesByCategory] || [];
      const filteredRoles = categoryRoles.filter(role =>
        role.toLowerCase().includes(inputValue)
      );
      setData(filteredRoles);
    } else {
      setData([]);
    }
  }
  
  const handleSearch = (query: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(query.target.value);
    setSearchInput(''); // Clear search input when category changes
    setData(query.target.value ? jobRolesByCategory[query.target.value as keyof typeof jobRolesByCategory] || [] : []);
  }
  
  const handleRoleClick = (role: string) => {
    console.log('Selected role:', role);
    setSelectedRole(selectedRole === role ? '' : role);
  }

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

          {/* Job Category Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Explore Job Categories</h2>
              <p className="text-gray-600">Select a category to see available job roles</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Keywords
                </label>
                <input 
                  type="text"
                  value={searchInput}
                  onChange={(e)=>handleInputChange(e)}
                  placeholder="Enter keywords (e.g., developer, manager, analyst)" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category
                </label>
                <select 
                  onChange={(e) => handleSearch(e)} 
                  value={selectedCategory}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white"
                >
                  <option value="">Select a category</option>
                  {Object.keys(jobRolesByCategory).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Roles Display */}
            {data.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  {/* Dynamic title based on search context */}
                  {selectedCategory ? `Available Roles in ${selectedCategory}` : 'Search Results'}
                </h3>
                {/* Show selected role info */}
                {selectedRole && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-sm text-green-700">
                      <span className="font-medium">Selected Role:</span> {selectedRole}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {data.map((role, index) => (
                    <div
                      key={index}
                      onClick={() => handleRoleClick(role)}
                      className={`${
                        selectedRole === role 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 ring-2 ring-green-200' 
                          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                      } border rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer group`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${
                          selectedRole === role 
                            ? 'bg-green-100 group-hover:bg-green-200' 
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        } rounded-full flex items-center justify-center transition-colors`}>
                          {selectedRole === role ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H6a2 2 0 00-2 2v3M7 7h10" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            selectedRole === role 
                              ? 'text-green-800 group-hover:text-green-700' 
                              : 'text-gray-800 group-hover:text-blue-700'
                          } transition-colors`}>
                            {role}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedRole === role ? 'Selected' : 'Click to select'}
                          </p>
                        </div>
                        <svg className={`w-4 h-4 ${
                          selectedRole === role 
                            ? 'text-green-400 group-hover:text-green-500' 
                            : 'text-gray-400 group-hover:text-blue-500'
                        } transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              
              {/* Role selection validation message */}
              {!selectedRole && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700 text-center">
                    <span className="font-medium">Please select a job role above before uploading your resume</span>
                  </p>
                </div>
              )}
              
              <ResumeUpload selectedRole={selectedRole} />
              
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

           
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientMainPage