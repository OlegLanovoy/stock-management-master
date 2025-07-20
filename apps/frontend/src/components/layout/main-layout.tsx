import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { getMe } from '../../services/auth.service';

export function MainLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => setIsAuth(!!data))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null; // или лоадер

  if (!isAuth) return <Navigate to="/auth" replace />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-white overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
