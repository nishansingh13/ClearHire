import  { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { toast } from 'sonner';
import { useConfig } from '../configContext/ConfigProvider';
import {  useNavigate } from 'react-router';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
}

function ClientAccount() {
  const {setLoggedIn} = useConfig();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: ''
  });

  useEffect(() => {
    fetchUserProfile();
    
  }, []);
 const handleLogout = async () => {
  try {
    const res = await axios.get('http://localhost:8080/users/logout', {
      withCredentials: true
    });
    if (res.status === 200) {
      toast.success("Successfully Logout");
      navigate("/login")
      setLoggedIn(false);
    }
  } catch (err) {
    console.error(err);
  }
};

  const fetchUserProfile = async () => {
    // Using mock data instead of API call
    const res = await axios.get("http://localhost:8080/users/profile", {
      withCredentials: true
    });
    const data = res.data;
    console.log(data);
    if(res.status == 200) {
    setUserProfile({
      name : data?.name,
      email: data?.email,
      experience: data?.experience || '',
      phone: data?.phone || '',
      location: data?.location || '',
      bio: data?.bio || '',

    });
    setEditForm({
       name : data?.name,
      email: data?.email,
      phone: data?.phone || '',
      location: data?.location || '',
      bio: data?.bio || '',
    });
    }
  }; 

  const handleInputChange = (field: keyof UserProfile, value: string | string[]) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillsChange = (skillsText: string) => {
    const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    handleInputChange('skills', skillsArray);
  };

  const saveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    // Simulate saving with mock logic
    try {
      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      await axios.put("http://localhost:8080/users/update", {
        name: editForm?.name,
        location: editForm?.location,
        phone: editForm?.phone,
        bio: editForm?.bio,
        experience: editForm?.experience
      }, {
        withCredentials: true
          
      });
      setUserProfile({
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        location: editForm.location,
        experience: editForm.experience,
        bio: editForm.bio,
      });
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditForm(userProfile || {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      skills: [],
      experience: ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };


  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Account Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Manage your personal information and keep your profile up to date for better job matching
            </p>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header with App Theme */}
            <div className="bg-white px-8 py-12 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col lg:flex-row lg:items-center mb-6 lg:mb-0">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 mx-auto lg:mx-0">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{userProfile?.name || 'Welcome!'}</h2>
                    <p className="text-gray-600 text-lg">{userProfile?.email}</p>
                    <div className="flex items-center justify-center lg:justify-start mt-2">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-500">{userProfile?.location || 'Location not set'}</span>
                    </div>
                  </div>
                </div>
                
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 mx-auto lg:mx-0"
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-3 mx-auto lg:mx-0">
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveProfile}
                      disabled={saving}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                        saving
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700 shadow-lg transform hover:scale-105'
                      }`}
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800 font-medium">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Personal Information Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Name */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 outline-none"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-medium">
                          {userProfile?.name}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      {editing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 outline-none"
                          placeholder="Enter your email address"
                        />
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-medium">
                          {userProfile?.email}
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      {editing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 outline-none"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-medium">
                          {userProfile?.phone}
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 outline-none"
                          placeholder="City, State/Country"
                        />
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-medium">
                          {userProfile?.location || 'Not specified'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information Card */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Professional Information</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Bio */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Bio</label>
                      {editing ? (
                        <textarea
                          value={editForm.bio || ''}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 resize-none outline-none"
                          placeholder="Tell us about your professional background..."
                        />
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 min-h-[120px]">
                          {userProfile?.bio || 'No bio provided'}
                        </div>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                      {editing ? (
                        <select
                          value={editForm.experience || ''}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 outline-none"
                        >
                          <option value="">Select experience level</option>
                          <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                          <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                          <option value="Senior Level (5-8 years)">Senior Level (5-8 years)</option>
                          <option value="Lead/Principal (8+ years)">Lead/Principal (8+ years)</option>
                        </select>
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-medium">
                          {userProfile?.experience || 'Not specified'}
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Skills & Technologies</label>
                      {editing ? (
                        <div>
                          <textarea
                            value={editForm.skills?.join(', ') || ''}
                            onChange={(e) => handleSkillsChange(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400 resize-none outline-none"
                            placeholder="JavaScript, React, Node.js, Python, SQL..."
                          />
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Separate skills with commas
                          </p>
                        </div>
                      ) : (
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 min-h-[80px]">
                          {userProfile?.skills && userProfile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {userProfile.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">No skills listed</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              {editing && (
                <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-3">💡 Tips for a standout profile:</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-sm text-green-700">Keep your information current for better job matching</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-sm text-green-700">Add relevant skills that match your expertise</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-sm text-green-700">Write a compelling bio highlighting your strengths</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-sm text-green-700">Ensure contact information is accurate and professional</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* @ts-expect-error This is builtin */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .group:hover .group-hover\\:shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
    </>
  );
}

export default ClientAccount;
