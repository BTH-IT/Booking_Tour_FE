import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { formatDate } from '@/utils/constants';

export default function DashboardProfile() {
  const navigate = useNavigate();

  const user = useAppSelector(selectAuth).user;

  return (
    <section className="mx-16">
      <div className="bg-gray-100 p-14 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-16">
          <div className="text-3xl font-semibold text-blue-500">My Profile</div>
          <Button
            variant="outline"
            className="text-xl py-6 text-blue-500 border-blue-600 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => navigate('/dashboard?tab=edit-profile')}
          >
            Edit Profile
          </Button>
        </div>
        <div className="flex gap-14">
          <Avatar className="w-28 h-28 bg-gray-400">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
            <AvatarFallback>
              <div className="pt-2 flex items-center justify-center w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
                <UserRound className="w-20 h-20 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="mb-2">
              <p className="text-2xl text-gray-500 pb-1">Name</p>
              <p className="text-xl text-gray-800">{user.fullname}</p>
            </div>
            <div className="mb-2">
              <p className="text-xl text-gray-500 pb-1">Gender</p>
              <p className="text-xl text-gray-800">{user.gender}</p>
            </div>
            <div className="mb-2">
              <p className="text-xl text-gray-500 pb-1">Birth Date</p>
              <p className="text-xl text-gray-800">
                {formatDate(user.birthDate)}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-xl text-gray-500 pb-1">Country</p>
              <p className="text-xl text-gray-800">{user.country}</p>
            </div>
            <div className="mb-2">
              <p className="text-xl text-gray-500 pb-1">Email</p>
              <p className="text-xl text-gray-800">nghuy3103@gmail.com</p>
            </div>
            <div className="mb-2">
              <p className="text-2xl text-gray-500 pb-1">Phone</p>
              <p className="text-xl text-gray-800">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
