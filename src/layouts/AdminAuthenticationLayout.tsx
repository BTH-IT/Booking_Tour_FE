import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminAuthenticationaLayout() {
  const navigate = useNavigate();
  const account = useAppSelector(selectAuth).account;

  useEffect(() => {
    if (account?.role?.roleName !== 'Admin') {
      console.log(account?.role?.roleName);

      navigate('/');
    }
  }, [account]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
