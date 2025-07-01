import Navbar from '../Navbar';
import { useState } from 'react';

const candidates = [
  {
    name: 'Ava Smith',
    role: 'Frontend Developer',
    description: 'Expert in React, TypeScript, and UI/UX design. 5+ years experience building scalable web apps.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Liam Johnson',
    role: 'Data Analyst',
    description: 'Skilled in Python, SQL, and data visualization. Proven track record in analytics.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sophia Lee',
    role: 'UI/UX Designer',
    description: 'Creative designer with a passion for user-centered design and prototyping.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Noah Patel',
    role: 'Backend Engineer',
    description: 'Specialist in Node.js, Express, and cloud infrastructure. Loves building robust APIs.',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

const stats = [
  { label: 'Active Candidates', value: '1,247', icon: '👥' },
  { label: 'Successful Placements', value: '89%', icon: '🎯' },
  { label: 'Avg. Time to Hire', value: '12 days', icon: '⏱️' },
  { label: 'Client Satisfaction', value: '4.9/5', icon: '⭐' },
];

const recentActivity = [
  { action: 'New candidate matched for Frontend Developer role', time: '2 hours ago' },
  { action: 'Interview scheduled with Ava Smith', time: '5 hours ago' },
  { action: 'Sophia Lee profile updated', time: '1 day ago' },
  { action: '3 new candidates added to your pipeline', time: '2 days ago' },
];

function TopCandidates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const roles = ['All', ...new Set(candidates.map(c => c.role))];
  
  const filteredCandidates = candidates.filter(candidate => 
    (selectedRole === 'All' || candidate.role === selectedRole) &&
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCandidates.map((candidate, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-green-600"
              />
              <div className="text-xl font-semibold text-gray-900 mb-1 text-center">{candidate.name}</div>
              <div className="text-green-700 font-medium mb-2 text-center">{candidate.role}</div>
              <div className="text-gray-600 text-sm text-center mb-4">{candidate.description}</div>
              <div className="flex gap-2 mt-auto">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
                  View Profile
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-green-600 hover:text-green-700 text-sm font-medium">
            View All Activity →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-green-50 border border-green-200 rounded-lg text-left hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-800">📝 Post New Job</div>
              <div className="text-sm text-green-600">Create a new job posting to find candidates</div>
            </button>
            <button className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg text-left hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-800">🎯 Talent Search</div>
              <div className="text-sm text-blue-600">Search our database for specific skills</div>
            </button>
            <button className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg text-left hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-800">📊 View Analytics</div>
              <div className="text-sm text-purple-600">Check your hiring pipeline metrics</div>
            </button>
            <button className="w-full p-3 bg-orange-50 border border-orange-200 rounded-lg text-left hover:bg-orange-100 transition-colors">
              <div className="font-medium text-orange-800">💬 Schedule Consultation</div>
              <div className="text-sm text-orange-600">Talk to our recruitment experts</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TopCandidates;
