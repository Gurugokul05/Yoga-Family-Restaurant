import React, { useEffect ,useState} from 'react'
import { auth } from '../firebase/firebase'
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const UserRoute = () => {
  const [allow, setAllow] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const logOut = onAuthStateChanged(auth,(user)=>{
        setAllow(user);
        setLoading(false);
      });
      return ()=> logOut();
    },[])
    if (loading) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <div className="spinner"></div>
          </div>
        );
      }
      return allow ? <Outlet /> : <Navigate to="/login" />;
  
}

export default UserRoute