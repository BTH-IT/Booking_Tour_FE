import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserRound, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DatePicker } from "antd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DashboardEdit() {
  const [date, setDate] = useState<Date>();

  return (
    <section className="mx-16 max-w-[700px]">
      <form className="space-y-8 mt-12">
        <div className="flex items-center gap-32">
          <Avatar className="w-28 h-28 bg-gray-400">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
            <AvatarFallback>
              <div className="pt-2 flex items-center justify-center w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
                <UserRound className="w-20 h-20 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
          <Button className="bg-blue-500 py-8 px-5 text-xl rounded-lg hover:bg-blue-600">
            Change Profile Picture
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="firstName">
            First Name
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="firstName"
            placeholder="First Name"
            defaultValue="a"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="lastName">
            Last Name
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="lastName"
            placeholder="Last Name"
            defaultValue="b"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="gender">
            Gender
          </Label>
          <Select>
            <SelectTrigger
              className="py-8 text-xl text-gray-600 !focus-visible:ring-0 !focus-visible:ring-offset-0"
              id="gender"
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="py-4" value="male">
                Male
              </SelectItem>
              <SelectItem className="py-4" value="female">
                Female
              </SelectItem>
              <SelectItem className="py-4" value="other">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="day">
            Date of birth
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <DatePicker
            className="block w-[200px] py-4 text-xl"
            format="DD/MM/YYYY"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="email">
            Email
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="email"
            type="email"
            placeholder="Email"
            defaultValue="nghuy31203@gmail.com"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="phone">
            Phone
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Input
            className="text-xl text-gray-900 h-16 border-0 border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            id="phone"
            type="tel"
            placeholder="Phone number"
            defaultValue="123"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="country">
            Country
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Select>
            <SelectTrigger
              className="text-xl py-8 text-gray-900 !focus-visible:ring-0 !focus-visible:ring-offset-0"
              id="country"
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="py-4" value="vietnam">
                Vietnam
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xl text-gray-600" htmlFor="address">
            Contact Address
            <span className="text-red-500 text-xl"> *</span>
          </Label>
          <Textarea
            className="text-xl p-4 text-gray-900 !ring-0 !focus-visible:ring-0 !focus-visible:ring-offset-0"
            id="address"
            placeholder="Enter your address"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="bg-blue-500 py-8 px-5 text-xl rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </section>
  );
}
