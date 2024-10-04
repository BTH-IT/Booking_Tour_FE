import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import userService from '@/services/UserService';
import { IRole, IUser } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Plus, Search, Trash } from 'lucide-react';
import { formatDate, formatPhoneNumber } from '@/utils/constants';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import Pagination from '@/components/Pagination';
import { Separator } from '@/components/ui/separator';
import roleService from '@/services/RoleService';
import CommonModal from '@/components/CommonModal';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 6;

const AdminUser = () => {
  const { toast } = useToast();

  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      const [userRes, roleRes] = await Promise.all([
        userService.getAllUsers(),
        roleService.getAllRoles(),
      ]);

      userRes?.result
        ? setUsers(userRes.result)
        : console.error('Failed to fetch users');
      roleRes?.result
        ? setRoles(roleRes.result)
        : console.error('Failed to fetch roles');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(users);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleRemoveUser = async (userId: string) => {
    try {
      const res = await userService.deleteUser(userId);
      if (res) {
        toast({
          duration: 2000,
          title: 'User deleted successfully!',
        });
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to delete user!',
      });
    }
  };

  return (
    <main className="flex-1 mx-10 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between mb-10">
          <div className="relative w-64">
            <Search className="absolute left-2 top-4 h-6 w-6 text-gray-500" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 text-xl text-gray-800 pl-10 py-7 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="py-7 text-xl"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add User
          </Button>
        </div>
        <div className="min-h-[415px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="!border-solid !border-b-[0.5px] !border-gray-400">
              <TableRow>
                <TableHead className="text-xl text-gray-900 py-5">
                  Full Name
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Email
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Birth Date
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Countries
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Phone Number
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Gender
                </TableHead>
                <TableHead className="text-xl text-gray-900 py-5">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user: IUser) => (
                <TableRow key={user.id}>
                  <TableCell className="w-[15%] text-xl text-gray-600">
                    {user.fullname}
                  </TableCell>
                  <TableCell className="w-[15%] text-xl text-gray-600">
                    {user.account.email}
                  </TableCell>
                  <TableCell className="w-[12%] text-xl text-gray-600">
                    {formatDate(user.birthDate)}
                  </TableCell>
                  <TableCell className="w-[15%] text-xl text-gray-600">
                    {user.country}
                  </TableCell>
                  <TableCell className="w-[15%] text-xl text-gray-600">
                    {formatPhoneNumber(user.phone)}
                  </TableCell>
                  <TableCell className="w-[12%] text-xl text-gray-600">
                    {user.gender}
                  </TableCell>
                  <TableCell className="w-[10%] text-xl text-gray-600">
                    {user.account.role.roleName}
                  </TableCell>
                  <TableCell className="w-[10%] text-center">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-2 rounded-full w-12 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          <MoreHorizontal className="w-8 h-8" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[100px]" align="end">
                        <DropdownMenuLabel className="text-xl text-gray-800">
                          Actions
                        </DropdownMenuLabel>
                        <Separator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="text-xl py-3 px-2 text-gray-800 cursor-pointer"
                        >
                          <Edit className="w-6 h-6 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user);
                            setIsDeleteModalOpen(true);
                          }}
                          className="py-3 px-2 cursor-pointer"
                        >
                          <Trash className="w-6 h-6 mr-2 text-red-500" />
                          <span className="text-xl text-red-500">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <CreateUserModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        roles={roles}
        users={users}
        setUsers={setUsers}
      />
      <EditUserModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        roles={roles}
        users={users}
        setUsers={setUsers}
        user={currentUser}
      />
      <CommonModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        width={400}
        height={500}
        title="Are you sure you want to delete this user?"
        acceptTitle="Delete"
        acceptClassName="text-xl hover:bg-red-50 hover:text-red-700 text-red-600 transition-all duration-400"
        ocClickAccept={async () => {
          await handleRemoveUser(currentUser?.id || '');
          setIsDeleteModalOpen(false);
        }}
      />
    </main>
  );
};

export default AdminUser;
