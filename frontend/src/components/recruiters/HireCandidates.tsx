import axios from 'axios';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../configContext/ConfigProvider';

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
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { server } = useConfig();
  const getDefaultAvatar = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNSIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOUI5QkE0Ij4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCA1LjItNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KICA8L3N2Zz4KPC9zdmc+';
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
  const filteredCandidates = resumeData.filter(resume => 
    (selectedRole === 'All' || resume.role === selectedRole) &&
    resume.name && resume.name!="not found" && resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const getResumes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${server}/api/resume/getResumeData`);
        setResumeData(res.data || []);
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setResumeData([]);
      } finally {
        setLoading(false);
      }
    };
    getResumes();
  }, []);

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
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Candidates ({filteredCandidates.length})
        </h2>
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No candidates found matching your criteria.</div>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate, idx) => (
              <div
                key={candidate.email || `candidate-${idx}`}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={getDefaultAvatar()}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-green-600"
                />
                <div className="text-xl font-semibold text-gray-900 mb-1 text-center">{candidate.name || 'Unknown Candidate'}</div>
                <div className="text-green-700 font-medium mb-2 text-center">{candidate.role || 'Professional'}</div>
                <div className="text-gray-600 text-sm text-center mb-4 line-clamp-3">
                  {getDescription(candidate)}
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  📧 {candidate.email || 'No email provided'}
                  {candidate.phone && (
                    <>
                      <br />
                      📞 {candidate.phone}
                    </>
                  )}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => navigate(`/profile/${encodeURIComponent(candidate.email || '')}`)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Schedule Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
    </>
  );
}

export default HireCandidates;
