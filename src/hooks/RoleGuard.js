import { Outlet, Navigate } from 'react-router-dom';

export default function RoleGuard({ requiredRole }) {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
