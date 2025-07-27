import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
import { useConfig } from "../configContext/ConfigProvider";
import API from "../../utils/api";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { loggedIn, setLoggedIn, server } = useConfig();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setLoggedIn(false);
          setLoading(false);
          return;
        }
        
        try {
          const response = await API.get(`${server}/users/token`);
          if (response.status === 200) {
            setLoggedIn(true);
          } else {
            throw new Error('Token validation failed');
          }
        } catch (tokenError) {
          console.error('Token validation failed:', tokenError);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
          setLoggedIn(false);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoggedIn(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [setLoggedIn, server]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="text-gray-600 text-sm md:text-base font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  if (!loggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
