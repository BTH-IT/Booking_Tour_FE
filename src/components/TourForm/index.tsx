import { Input } from '@/components/ui/input';
import ReactQuill from 'react-quill';
import { DatePicker } from 'antd';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const TourForm = ({ form }: { form: any }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl text-gray-800">Tour name</FormLabel>
            <FormControl>
              <Input
                className="text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-10">
        <FormField
          control={form.control}
          name="dateFrom"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xl text-gray-800">Date From</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                className="w-[180px] block py-3 text-xl"
                format="DD/MM/YYYY"
                needConfirm
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateTo"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xl text-gray-800">To</FormLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                className="w-[180px] block py-3 text-xl"
                format="DD/MM/YYYY"
                needConfirm
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-[1000px] gap-[40px]">
        <FormField
          control={form.control}
          name="maxGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl text-gray-800">
                Max Guests
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-[100px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isWifi"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-xl text-gray-800 mb-1">Wifi</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl text-gray-800">Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-[300px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl text-gray-800">
                Sale Percent?
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-[100px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="detail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl text-gray-800">Description</FormLabel>
            <FormControl>
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                className="h-[200px] text-gray-800 [&_.ql-editor>p]:text-xl !rounded-md [&>.ql-toolbar]:rounded-t-md [&>.ql-container]:rounded-b-md"
                placeholder="Write something amazing..."
              />
            </FormControl>
            <FormMessage className="!mt-16" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expect"
        render={({ field }) => (
          <FormItem className="mt-14">
            <FormLabel className="text-xl text-gray-800">Expect</FormLabel>
            <FormControl>
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                className="h-[200px] text-gray-800 [&_.ql-editor>p]:text-xl !rounded-md [&>.ql-toolbar]:rounded-t-md [&>.ql-container]:rounded-b-md"
                placeholder="Write something amazing..."
              />
            </FormControl>
            <FormMessage className="!mt-16" />
          </FormItem>
        )}
      />
    </>
  );
};

export default TourForm;
