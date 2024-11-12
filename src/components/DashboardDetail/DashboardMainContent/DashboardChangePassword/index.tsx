'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import authService from '@/services/AuthService';
import { logError } from '@/utils/constants';

const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function DashboardChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const data = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      const res = await authService.changePassword(data);

      if (res) {
        toast.success('Password updated successfully');
      }
    } catch (error) {
      logError(error);
    }
  }

  const togglePasswordVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prevState) => !prevState);
  };

  return (
    <section className="max-w-[700px] mx-16 px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">
                  Current Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="text-xl text-gray-900 h-16 pr-10"
                      placeholder="Current Password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        togglePasswordVisibility(setShowCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">
                  New Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      className="text-xl text-gray-900 h-16 pr-10"
                      placeholder="New Password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        togglePasswordVisibility(setShowNewPassword)
                      }
                    >
                      {showNewPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">
                  Confirm Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="text-xl text-gray-900 h-16 pr-10"
                      placeholder="Confirm Password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        togglePasswordVisibility(setShowConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-center pt-6">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-8 px-8 text-xl rounded-lg"
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
