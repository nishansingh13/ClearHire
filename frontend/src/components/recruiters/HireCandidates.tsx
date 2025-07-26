import axios from 'axios';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const stats = [
  { label: 'Active Candidates', value: '1,247', icon: '👥' },
  { label: 'Successful Placements', value: '89%', icon: '🎯' },
  { label: 'Avg. Time to Hire', value: '12 days', icon: '⏱️' },
  { label: 'Client Satisfaction', value: '4.9/5', icon: '⭐' },
];


function HireCandidates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [matchResults, setMatchResults] = useState<{ [email: string]: MatchResult }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { server } = useConfig();
  const getDefaultAvatar = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOUI5QkE0Ij4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCA1LjItNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KICA8L3N2Zz4KPC9zdmc+';
  };
  const calculateMatches = (resumes: Resume[], role: string) => {
    const results: { [email: string]: MatchResult } = {};
    resumes.forEach(resume => {
      if (resume.email && resume.skills && resume.experience && resume.role) {
        results[resume.email] = matchingService.calculateMatch(
          resume.skills,
          resume.experience,
          resume.role,
          role
        );
      }
    });
    setMatchResults(results);
  };

  const getDescription = (resume: Resume) => {
    const skillsText = resume.skills && resume.skills.length > 0 
      ? `Skills: ${resume.skills.slice(0, 3).join(', ')}` 
      : '';
    const experienceText = resume.experience && resume.experience.length > 0 
      ? `Experience: ${resume.experience[0]}` 
      : '';
    return skillsText + (skillsText && experienceText ? '. ' + experienceText : experienceText) || 'Professional candidate with diverse background.';
  };
  const roles = ['All', ...new Set(resumeData.map(resume => resume.role).filter(role => role && role.trim() !== ''))];
  const filteredCandidates = resumeData
    .filter(resume => 
      (selectedRole === 'All' || resume.role === selectedRole) &&
      resume.name && resume.name !== "not found" && resume.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by match score (highest first)
      const matchA = matchResults[a.email]?.overallScore || 0;
      const matchB = matchResults[b.email]?.overallScore || 0;
      return matchB - matchA;
    });

  useEffect(() => {
    const getResumes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${server}/api/resume/getResumeData`);
        const data = res.data || [];
        setResumeData(data);
        calculateMatches(data, targetRole);
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setResumeData([]);
      } finally {
        setLoading(false);
      }
    };
    getResumes();
  }, [server, targetRole]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="w-full max-w-7xl mx-auto mt-10 px-4 text-center">
          <div className="text-2xl font-semibold text-gray-600">Loading candidates...</div>
        </div>
      </>
    );
  }

  return (
   <>
    <Navbar />
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Top Candidates</h1>
        <p className="text-gray-600 text-lg">Discover exceptional talent matched to your requirements</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-green-600 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search candidates by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            value={targetRole}
            onChange={(e) => {
              setTargetRole(e.target.value);
              calculateMatches(resumeData, e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {getAvailableRoles().map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Advanced Filters
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Showing match scores for: <span className="font-semibold text-green-600">{targetRole}</span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Candidates ({filteredCandidates.length})
          </h2>
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center">
              📊 Sorted by match score (highest first)
            </span>
          </div>
        </div>
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No candidates found matching your criteria.</div>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate, idx) => {
              const matchResult = matchResults[candidate.email];
              return (
              <div
                key={candidate.email || `candidate-${idx}`}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow duration-200 h-[480px]"
              >
                {/* Candidate Info */}
                <div className="flex flex-col items-center text-center flex-1">
                  <img
                    src={getDefaultAvatar()}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover mb-3 border-4 border-green-600"
                  />
                  <div className="text-lg font-semibold text-gray-900 mb-1">{candidate.name || 'Unknown Candidate'}</div>
                  <div className="text-green-700 font-medium mb-2">{candidate.role || 'Professional'}</div>
                  <div className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {getDescription(candidate)}
                  </div>
                  
                  {/* Skills Preview - Compact */}
                  <div className="mb-3 w-full">
                    {matchResult && matchResult.breakdown.matchedSkills.length > 0 ? (
                      <>
                        <div className="text-xs text-gray-600 mb-1">Top Skills:</div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {matchResult.breakdown.matchedSkills.slice(0, 2).map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {matchResult.breakdown.matchedSkills.length > 2 && (
                            <span className="text-xs text-gray-500">+{matchResult.breakdown.matchedSkills.length - 2}</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-gray-400 italic">No matched skills</div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    📧 {candidate.email || 'No email provided'}
                    {candidate.phone && (
                      <>
                        <br />
                        📞 {candidate.phone}
                      </>
                    )}
                  </div>
                </div>

                {/* Match Score Footer - Compact */}
                {matchResult && (
                  <div className="p-2 bg-gray-50 rounded-lg mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">Match Score</span>
                      <span className={`text-sm font-bold ${
                        matchResult.overallScore >= 85 ? 'text-green-600' :
                        matchResult.overallScore >= 70 ? 'text-blue-600' :
                        matchResult.overallScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {matchResult.overallScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div 
                        className={`h-1.5 rounded-full ${
                          matchResult.overallScore >= 85 ? 'bg-green-600' :
                          matchResult.overallScore >= 70 ? 'bg-blue-600' :
                          matchResult.overallScore >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.max(matchResult.overallScore, 5)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {matchingService.getMatchDescription(matchResult.overallScore).level}
                    </div>
                  </div>
                )}
                
                {/* Buttons - Always at bottom */}
                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => navigate(`/profile/${encodeURIComponent(candidate.email || '')}`, {
                      state: { 
                        matchResult: matchResult,
                        targetRole: targetRole
                      }
                    })}
                    className="flex-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="flex-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>


    </div>
    </>
  );
}

export default HireCandidates;
