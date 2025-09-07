import React from 'react'
import { auth } from '../firebase/firebase'
import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
    const user = auth.currentUser;
  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default UserRoute