import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthenticationaLayout() {
  const navigate = useNavigate();
  const isLogged = Boolean(useAppSelector(selectAuth).account);

  if (!isLogged) {
    navigate('/');
    return <></>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
