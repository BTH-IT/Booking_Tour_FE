import AdminTitle from '@/components/AdminTitle';
import AdminContent from '@/components/AdminContent';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router';

export default function AdminPage() {
  const navigate = useNavigate();
  const currentAccount = useAppSelector((state) => state.auth.account);

  if (!currentAccount || currentAccount.role?.roleName !== 'Admin') {
    return null;
  }

  return (
    <>
      <AdminTitle />
      <AdminContent />
    </>
  );
}
