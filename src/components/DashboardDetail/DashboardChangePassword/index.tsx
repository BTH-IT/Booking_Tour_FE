import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, EyeOffIcon } from 'lucide-react'; // Assuming you are using Heroicons

export default function DashboardChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter((prevState) => !prevState);
  };

  return (
    <section className="max-w-[700px] mx-16">
      <form className="space-y-8 mt-12">
        <div className="relative space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="currentPassword">
            Current Password
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            type={showCurrentPassword ? 'text' : 'password'}
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="currentPassword"
            placeholder="Current Password"
          />
          <button
            type="button"
            className="absolute right-4 top-12 transition-all"
            onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
          >
            {showCurrentPassword ? (
              <Eye className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="relative space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="newPassword">
            New Password
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            type={showNewPassword ? 'text' : 'password'}
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="newPassword"
            placeholder="New Password"
          />
          <button
            type="button"
            className="absolute right-4 top-12 transition-all"
            onClick={() => togglePasswordVisibility(setShowNewPassword)}
          >
            {showNewPassword ? (
              <Eye className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="relative space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="confirmPassword">
            Confirm Password<span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            type={showCurrentPassword ? 'text' : 'password'}
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            className="absolute right-4 top-12 transition-all"
            onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
          >
            {showCurrentPassword ? (
              <Eye className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="bg-blue-500 py-8 px-5 text-xl rounded-lg hover:bg-blue-600"
          >
            Update Password
          </Button>
        </div>
      </form>
    </section>
  );
}
