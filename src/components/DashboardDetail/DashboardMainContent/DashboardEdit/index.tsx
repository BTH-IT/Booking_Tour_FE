import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { authActions, selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import uploadService from '@/services/UploadService';
import userService from '@/services/UserService';
import { logError } from '@/utils/constants';

const phoneRegex =
  /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  gender: z.string(),
  birthDate: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
  phone: z.string().regex(phoneRegex, {
    message: 'Please enter a valid phone number.',
  }),
  country: z.string({
    required_error: 'Please select a country.',
  }),
});

export default function DashboardEdit() {
  const user = useAppSelector(selectAuth).user;
  const account = useAppSelector(selectAuth).account;
  const dispatch = useDispatch();

  const inpRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullname,
      gender: user.gender,
      birthDate: dayjs(user.birthDate),
      phone: user.phone,
      country: user.country,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const avatarUrl = avatar
      ? await uploadService.uploadMultipleFileWithAWS3([avatar])
      : null;

    const { birthDate, ...rest } = values;
    const data = {
      ...rest,
      birthDate: values.birthDate.toDate(),
      accountId: account.id,
      avatar: avatarUrl ? avatarUrl[0].url : user.avatar,
    };

    try {
      const res = await userService.updateUser(user.id, data);

      if (res) {
        toast.success('Update profile success!!');
        dispatch(authActions.updateUser({ user: res.result }));
      }
    } catch (error) {
      logError(error);
    }
  }

  console.log('user', user);

  return (
    <section className="mx-16 max-w-[700px] px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-12"
        >
          <div className="flex items-center gap-12 flex-wrap">
            <Avatar className="w-28 h-28 bg-gray-400">
              <AvatarImage
                src={
                  avatar === null
                    ? user.avatar === null
                      ? '/avatar.png'
                      : user.avatar
                    : URL.createObjectURL(avatar)
                }
                alt="Profile picture"
              />
              <AvatarFallback>
                <div className="pt-2 flex items-center justify-center w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
                  <UserRound className="w-20 h-20 text-white" />
                </div>
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              className="bg-primary py-7 px-4 text-lg rounded-lg"
              onClick={() => inpRef.current?.click()}
            >
              Change Profile Picture
            </Button>
            <input
              type="file"
              ref={inpRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatar(file);
                }
              }}
              hidden
              accept="image/*"
            />
          </div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="First Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="py-8 [&>span]:text-xl text-gray-600 !focus-visible:ring-0 !focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="py-4 text-xl" value="Male">
                      Male
                    </SelectItem>
                    <SelectItem className="py-4 text-xl" value="Female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl text-gray-800">
                  Birth Date
                </FormLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  className="w-[180px] block py-3 text-xl"
                  format="DD/MM/YYYY"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Phone number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-gray-600">Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-xl py-8 text-gray-900 !focus-visible:ring-0 !focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem className="py-4" value="vietnam">
                      Vietnam
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="bg-primary py-8 px-8 text-lg rounded-lg"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
