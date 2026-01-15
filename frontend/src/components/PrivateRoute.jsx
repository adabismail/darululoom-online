import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Prevent flickering

  // If admin exists, show the protected page (Outlet). If not, go to Login.
  return admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;