import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthenticationaLayout() {
  const navigate = useNavigate();
  const isLogged = Object.keys(useAppSelector(selectAuth).account).length !== 0;

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
