import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useConfig } from "../configContext/ConfigProvider";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { loggedIn, setLoggedIn } = useConfig();
  
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      // If token exists, assume user is logged in
      // The API interceptor will handle invalid tokens
      setLoggedIn(true);
      setLoading(false);
    };

    checkAuth();
  }, [setLoggedIn]);

    if(loading) return (<>
    <div className="w-full h-screen flex justify-center items-center">  <Loader2 className='animate-spin w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-green-600'/></div>

  </>)
  if (!loggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
