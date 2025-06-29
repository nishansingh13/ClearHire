import React from 'react';

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

function TopCandidates() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Top Candidates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidates.map((candidate, idx) => (
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
            <div className="text-gray-600 text-sm text-center">{candidate.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCandidates;
