import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
    useEffect(()=>{
        console.log("auth",authenticated)
    },[authenticated])
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/users/token", {
        withCredentials: true, 
      })
      .then((res) => {
        console.log("data",res);
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    if(loading) return (<>
    <div className="w-full h-screen flex justify-center items-center">  <Loader2 className='animate-spin w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-green-600'/></div>

  </>)
  if (!authenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
