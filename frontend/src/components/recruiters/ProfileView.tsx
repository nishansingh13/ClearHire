import axios from 'axios';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useConfig } from '../configContext/ConfigProvider';
import { matchingService, type MatchResult, getAvailableRoles } from '../../utils/matchingService';

interface Resume {
  email: string;
  name: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
  role: string;
}

function ProfileView() {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { server } = useConfig();
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [targetRole, setTargetRole] = useState<string>('Full Stack Developer');


  const passedMatchResult = location.state?.matchResult as MatchResult | undefined;
  const passedTargetRole = location.state?.targetRole as string | undefined;

  const calculateMatch = (resume: Resume, role: string) => {
    const match = matchingService.calculateMatch(
      resume.skills,
      resume.experience,
      resume.role,
      role
    );
    setMatchResult(match);
  };
  const getDefaultAvatar = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOUI5QkE0Ij4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCA1LjItNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KICA8L3N2Zz4KPC9zdmc+';
  };
  const parseExperience = (experience: string) => {
    const match = experience.match(/\*\*(.*?)\*\*:\s*(.*)/);
    if (match) {
      return {
        title: match[1],
        description: match[2]
      };
    }
    return {
      title: 'Professional Experience',
      description: experience
    };
  };
  const formatBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/); 
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};


  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        setError('Email parameter is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post(`${server}/api/resume/getResumeByEmail`, {
          email: decodeURIComponent(email)
        });
        
        if (res.data) {
          setResumeData(res.data);
          
          // Use passed match result and target role if available, otherwise calculate
          if (passedMatchResult && passedTargetRole) {
            setMatchResult(passedMatchResult);
            setTargetRole(passedTargetRole);
          } else {
            calculateMatch(res.data, targetRole);
          }
        } else {
          setError('Resume not found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email, server, passedMatchResult, passedTargetRole, targetRole]);

  // Recalculate match when target role changes
  useEffect(() => {
    if (resumeData && targetRole) {
      calculateMatch(resumeData, targetRole);
    }
  }, [targetRole, resumeData]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <div className="text-xl font-semibold text-gray-600">Loading profile...</div>
          </div>
        </div>
      </>
    );
  }

  if (error || !resumeData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-gray-400 mb-4">😞</div>
            <div className="text-xl font-semibold text-gray-600 mb-2">Profile Not Found</div>
            <div className="text-gray-500 mb-6">{error}</div>
            <button 
              onClick={() => navigate(-1)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Candidates
          </button>

          {/* Role Selector */}
          <div className="mb-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Evaluating for role:
              </label>
              <select
                value={targetRole}
                onChange={(e) => {
                  const newRole = e.target.value;
                  setTargetRole(newRole);
                  if (resumeData) {
                    calculateMatch(resumeData, newRole);
                  }
                }}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[200px]"
              >
                {getAvailableRoles().map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <img
                src={getDefaultAvatar()}
                alt={resumeData.name}
                className="w-32 h-32 rounded-full border-4 border-green-600"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.name}</h1>
                <p className="text-xl text-green-600 font-semibold mb-4">{resumeData.role}</p>
                <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {resumeData.email}
                  </div>
                  {resumeData.phone && (
                    <div className="flex items-center justify-center md:justify-start">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {resumeData.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Skills Section */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => {
                    const parsed = parseExperience(exp);
                    return (
                      <div key={index} className="border-l-4 border-green-500 pl-6 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{parsed.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{formatBoldText(parsed.description)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <p className="text-gray-700 leading-relaxed">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skills</span>
                    <span className="font-semibold text-green-600">{resumeData.skills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-green-600">{resumeData.experience.length} roles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education</span>
                    <span className="font-semibold text-green-600">{resumeData.education.length}</span>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-lg hover:bg-green-100 transition-colors font-medium">
                    📧 Send Email
                  </button>
                  <button className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    📞 Schedule Call
                  </button>
                  <button className="w-full bg-purple-50 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                    💼 Add to Shortlist
                  </button>
                </div>
              </div>

              {/* Candidate Rating */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Candidate Match</h3>
                {matchResult ? (
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${
                      matchResult.overallScore >= 85 ? 'text-green-600' :
                      matchResult.overallScore >= 70 ? 'text-blue-600' :
                      matchResult.overallScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {matchResult.overallScore}%
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {matchingService.getMatchDescription(matchResult.overallScore).level}
                      <br />
                      <span className="text-xs text-gray-500">vs {targetRole}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${
                          matchResult.overallScore >= 85 ? 'bg-green-600' :
                          matchResult.overallScore >= 70 ? 'bg-blue-600' :
                          matchResult.overallScore >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.max(matchResult.overallScore, 5)}%` }}
                      ></div>
                    </div>
                    
                    {/* Match Breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Skills Match:</span>
                        <span className="font-semibold text-green-600">{matchResult.skillsScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-semibold text-blue-600">{matchResult.experienceScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role Fit:</span>
                        <span className="font-semibold text-purple-600">{matchResult.roleScore}%</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      {matchingService.getMatchDescription(matchResult.overallScore).description}
                    </p>
                    
                    {/* Skills Analysis */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-left">
                        <div className="text-xs font-semibold text-green-700 mb-1">
                          Matched Skills ({matchResult.breakdown.matchedSkills.length})
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {matchResult.breakdown.matchedSkills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          {matchResult.breakdown.matchedSkills.length > 3 && (
                            <span className="text-xs text-green-600">
                              +{matchResult.breakdown.matchedSkills.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        {matchResult.breakdown.missingSkills.length > 0 && (
                          <>
                            <div className="text-xs font-semibold text-red-700 mb-1">
                              Growth Areas ({matchResult.breakdown.missingSkills.length})
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {matchResult.breakdown.missingSkills.slice(0, 2).map((skill, index) => (
                                <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                              {matchResult.breakdown.missingSkills.length > 2 && (
                                <span className="text-xs text-red-600">
                                  +{matchResult.breakdown.missingSkills.length - 2} more
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400 mb-2">--</div>
                    <div className="text-sm text-gray-500">Calculating match...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileView;
