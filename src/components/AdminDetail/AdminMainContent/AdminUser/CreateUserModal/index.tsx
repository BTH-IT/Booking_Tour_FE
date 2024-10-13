import { Dispatch, SetStateAction, useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { DatePicker } from 'antd';
import { useToast } from '@/hooks/use-toast';
import { IUser, IRole } from '@/types';
import authService from '@/services/AuthService';
import { Eye, EyeOff } from 'lucide-react';

const phoneRegex =
  /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

interface CreateUserModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  roles: IRole[];
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const CreateUserModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  users,
  roles,
  setUsers,
}: CreateUserModalProps) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .refine(
        (email) => {
          return !users.find((user) => user.account.email === email);
        },
        { message: 'Email already exists' },
      ),
    password: z.string().min(1, { message: 'Password is required' }),
    roleId: z.string().min(1, { message: 'Role is required' }),
    fullname: z.string().min(1, { message: 'Full name is required' }),
    birthDate: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    country: z.string().min(1, { message: 'Country is required' }),
    phone: z
      .string()
      .regex(phoneRegex, { message: 'Invalid Vietnamese phone number' })
      .refine(
        (phone) => {
          return !users.find((user) => user.phone === phone);
        },
        { message: 'Phone number already exists' },
      ),
    gender: z.string().min(1, { message: 'Gender is required' }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      roleId: '2',
      fullname: '',
      country: '',
      phone: '',
      gender: '',
    },
  });

  const closeModal = () => {
    setIsCreateModalOpen(false);
    form.reset();
  };

  const handleCreateUser = async (data: any) => {
    try {
      const res = await authService.register(data);
      if (res) {
        setUsers([...users, res.result]);
        toast({
          duration: 2000,
          title: 'User created successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to create user');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to create user!',
        });
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to create user!',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    const { roleId, birthDate, ...rest } = values;

    const data = {
      ...rest,
      birthDate: birthDate.toDate(),
    };

    handleCreateUser(data);
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={closeModal}>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl mb-4 text-center">
            Add New User
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[270px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="w-[270px] relative">
                        <Input
                          className="text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-4 transition-all"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[270px] [&>span]:text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem
                            key={role.id}
                            className="[&>span]:text-xl text-gray-900 py-3"
                            value={role.id.toString()}
                          >
                            {role.roleName}
                          </SelectItem>
                        ))}
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
                      className="w-[270px] block py-3 text-xl"
                      format="DD/MM/YYYY"
                      needConfirm
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[270px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
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
                    <FormLabel className="text-xl text-gray-800">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[270px] [&>span]:text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="[&>span]:text-xl text-gray-900 py-3"
                          value="Male"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          className="[&>span]:text-xl text-gray-900 py-3"
                          value="Female"
                        >
                          Female
                        </SelectItem>
                        <SelectItem
                          className="[&>span]:text-xl text-gray-900 py-3"
                          value="Other"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[270px] [&>span]:text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="[&>span]:text-xl text-gray-900 py-3"
                          value="Vietnam"
                        >
                          Vietnam
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-gray-800">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[270px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full text-center">
              <Button
                variant="primary"
                type="submit"
                className="text-xl py-8 px-6 mt-4"
              >
                Create User
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
