import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

export default function DashboardProfile() {
  return (
    <section className='mx-16'>
      <div className='bg-gray-100 p-14 rounded-2xl shadow-sm'>
        <div className='flex justify-between items-center mb-16'>
          <div className='text-3xl font-semibold text-blue-500'>My Profile</div>
          <Button
            variant='outline'
            className='text-xl py-6 text-blue-500 border-blue-600 hover:bg-blue-50 hover:text-blue-600'
          >
            Edit Profile
          </Button>
        </div>
        <div className='flex gap-14'>
          <Avatar className='w-28 h-28 bg-gray-400'>
            <AvatarImage src='/placeholder-avatar.jpg' alt='Profile picture' />
            <AvatarFallback>
              <div className='pt-2 flex items-center justify-center w-28 h-28 bg-gray-400 rounded-full overflow-hidden'>
                <UserRound className='w-20 h-20 text-white' />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 grid grid-cols-2 gap-4'>
            <div className='mb-2'>
              <p className='text-2xl text-gray-500 pb-1'>Name</p>
              <p className='text-xl text-gray-800'>a b</p>
            </div>
            <div className='mb-2'>
              <p className='text-xl text-gray-500 pb-1'>Gender</p>
              <p className='text-xl text-gray-800'>-</p>
            </div>
            <div className='mb-2'>
              <p className='text-xl text-gray-500 pb-1'>Birth Date</p>
              <p className='text-xl text-gray-800'>December 3, 2003</p>
            </div>
            <div className='mb-2'>
              <p className='text-xl text-gray-500 pb-1'>Country</p>
              <p className='text-xl text-gray-800'>Vietnam</p>
            </div>
            <div className='mb-2'>
              <p className='text-xl text-gray-500 pb-1'>Email</p>
              <p className='text-xl text-gray-800'>nghuy3103@gmail.com</p>
            </div>
            <div className='mb-2'>
              <p className='text-2xl text-gray-500 pb-1'>Phone</p>
              <p className='text-xl text-gray-800'>123</p>
            </div>
            <div className='col-span-2'>
              <p className='text-2xl text-gray-600 pb-1'>Contact Address</p>
              <p className='text-xl text-gray-800'>-</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-16'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-semibold text-blue-600'>Room Reviews</h2>
          <Button
            variant='link'
            className='text-2xl text-gray-400 hover:no-underline'
          >
            View All Reviews
          </Button>
        </div>
        {/* Add room reviewList content here */}
      </div>
    </section>
  );
}
