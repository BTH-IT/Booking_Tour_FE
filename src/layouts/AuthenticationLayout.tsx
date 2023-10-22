import { KEY_LOCALSTORAGE } from '@/utils/constants';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthenticationaLayout() {
  const isLogged =  Boolean(JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER) || ""))
  const navigate = useNavigate();

  if (!isLogged) {
    navigate("/");
    return <></>
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
