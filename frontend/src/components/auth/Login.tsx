import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import {toast} from 'sonner';
import { useConfig } from '../configContext/ConfigProvider';

interface FormData {
    name : string,
    email : string,
    phone: string,
    experience: string,
    bio: string,
    password : string,
    confirmpassword : string
}

function Login() {
    
    const {loggedIn,setLoggedIn} = useConfig();
    useEffect(()=>{
      console.log(loggedIn)
    },[loggedIn])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleSubmit = async(formdata:FormData)=>{
        if (!isLogin) {
            if (formdata.password !== formdata.confirmpassword) {
                toast.error("Passwords do not match");
                return;
            }
            if (!formdata.name || formdata.name.trim() === '') {
                toast.error("Name is required");
                return;
            }
            if (!formdata.phone || formdata.phone.trim() === '') {
                toast.error("Phone number is required");
                return;
            }
            if (!formdata.experience || formdata.experience.trim() === '') {
                toast.error("Experience level is required");
                return;
            }
        }

        const endpoint = isLogin ? "/users/login" : "/users/register";
        const payload = isLogin 
            ? { email: formdata.email, password: formdata.password }
            : { 
                name: formdata.name, 
                email: formdata.email, 
                phone: formdata.phone,
                experience: formdata.experience,
                bio: formdata.bio,
                password: formdata.password 
              };

        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8080${endpoint}`, payload, {
                withCredentials: true
            });
            
            console.log(res);
            if(res.status !== 200){
                console.log(isLogin ? "Error in login" : "Error in signup");
                return;
            }
            else {
              setLoggedIn(true);
              toast.success(isLogin ? "Login successful" : "Signup successful");
              setFormData({
                name: '',
                email: '',
                phone: '',
                experience: '',
                bio: '',
                password: '',
                confirmpassword: ''
              });
              navigate("/top-candidates")
            }
            const data = res.data;
            console.log(data);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(isLogin ? `${error?.response?.data} ` : `${error?.response?.data}`);
           
        }
        finally {
            setLoading(false);
        }
    } 
    
    const [formdata,setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        experience: '',
        bio: '',
        password: '',
        confirmpassword: ''
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D1D6E1] to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md md:max-w-2xl w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ClearHire</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account to continue' : 'Sign up to get started'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              !isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login/Signup Form */}
        <form className="mt-8 space-y-6">
          <div className={`grid gap-4 ${!isLogin ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Name Field (Only for Signup) */}
            {!isLogin && (
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formdata?.name || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Email Field */}
            <div className={!isLogin ? 'md:col-span-2' : ''}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formdata?.email || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field (Only for Signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formdata?.phone || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            {/* Experience Field (Only for Signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formdata?.experience || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900"
                >
                  <option value="">Select your experience level</option>
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                  <option value="Senior Level (5-8 years)">Senior Level (5-8 years)</option>
                  <option value="Lead/Principal (8+ years)">Lead/Principal (8+ years)</option>
                </select>
              </div>
            )}

            {/* Password Field */}
            <div className={!isLogin ? '' : 'md:col-span-2'}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={formdata?.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Only for Signup) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formdata?.confirmpassword || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmpassword: e.target.value
                      }))
                    }
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Bio Field (Only for Signup) */}
            {!isLogin && (
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formdata?.bio || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bio: e.target.value
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                  placeholder="Tell us about your professional background..."
                />
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password (Only for Login) */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              onClick={() => handleSubmit(formdata)}
              disabled={loading}
              type="button"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white 
                ${loading ? 'bg-green-700 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-200 transform hover:scale-[1.02]`}
            >
              {loading 
                ? isLogin 
                  ? 'Signing In...' 
                  : 'Creating Account...' 
                : isLogin 
                  ? 'Sign In' 
                  : 'Create Account'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              {isLogin ? 'Sign up for free' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login