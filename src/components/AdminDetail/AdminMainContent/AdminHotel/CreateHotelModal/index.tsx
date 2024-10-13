import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import Select from 'react-select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { IHotel, IHotelAmenity, IHotelRule, ILocation, IRoom } from '@/types';
import ReactQuill from 'react-quill';
import hotelService from '@/services/HotelService';
import destinationService from '@/services/DestinationService';
import ManageHotelItems from '@/components/ManageHotelItems';

const phoneRegex =
  /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

type OptionType = {
  value: string;
  label: string;
};

interface CreateHotelModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  hotels: IHotel[];
  setHotels: Dispatch<SetStateAction<IHotel[]>>;
  locations: ILocation[];
}

const CreateHotelModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  hotels,
  setHotels,
  locations,
}: CreateHotelModalProps) => {
  const { toast } = useToast();

  const [hotelRules, setHotelRules] = useState<IHotelRule[]>([]);
  const [hotelAmenities, setHotelAmenities] = useState<IHotelAmenity[]>([]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Hotel name is required' })
      .refine(
        (name) => {
          return !hotels.find((hotel) => hotel.name === name);
        },
        { message: 'Hotel name already exists' },
      ),
    location: z.string().min(1, { message: 'Location is required' }),
    locationDetail: z.object({
      label: z.string(),
      value: z.string(),
    }),
    description: z.string().min(1, { message: 'Description is required' }),
    contactInfo: z
      .string()
      .regex(phoneRegex, { message: 'Invalid Vietnamese phone number' })
      .refine(
        (phone) => {
          return !hotels.find((hotel) => hotel.contactInfo === phone);
        },
        { message: 'Phone number already exists' },
      ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      locationDetail: {
        label: '',
        value: '',
      },
      description: '',
      contactInfo: '',
    },
  });

  const closeModal = () => {
    setIsCreateModalOpen(false);
    form.reset();
    setHotelRules([]);
    setHotelAmenities([]);
  };

  const handleCreateHotel = async (data: any) => {
    try {
      const res = await hotelService.createHotel(data);
      if (res) {
        setHotels([...hotels, res.result]);
        toast({
          duration: 2000,
          title: 'Hotel created successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to create hotel');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to create hotel!',
        });
      }
    } catch (error) {
      console.error('Failed to create hotel:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to create hotel!',
      });
    }
  };

  const generateOptions = useCallback((): OptionType[] => {
    return locations.map((location) => {
      return {
        label: location.name,
        value: location.code.toString(),
      };
    });
  }, [locations]);

  const onSubmit = async (values: FormValues) => {
    if (!values.locationDetail) {
      form.setError('locationDetail', { message: 'City is required' });
      return;
    }
    const { locationDetail, ...rest } = values;
    const data = {
      ...rest,
      locationCode: parseInt(locationDetail.value),
      hotelRules: hotelRules,
      hotelAmenities: hotelAmenities,
    };

    handleCreateHotel(data);
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[700px] max-h-[90%] overflow-y-scroll no-scrollbar !px-0">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl text-center">
            Add New Hotel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 overflow-x-hidden"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-col mx-auto gap-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl text-gray-800">
                        Hotel name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[600px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-[600px] gap-5">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl text-gray-800">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[380px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="locationDetail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl text-gray-800">
                          City
                        </FormLabel>
                        <Select
                          isClearable
                          isSearchable
                          isMulti={false}
                          options={generateOptions()}
                          className="w-[205px] [&>div]:py-[2px] text-2xl text-gray-900"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl text-gray-800">
                        Contact info
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[600px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl text-gray-800">
                        Hotel description
                      </FormLabel>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-[200px] text-gray-800 [&_.ql-editor>p]:text-xl !rounded-md [&>.ql-toolbar]:rounded-t-md [&>.ql-container]:rounded-b-md"
                          placeholder="Write something amazing..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col mt-14 gap-5">
                  <ManageHotelItems
                    items={hotelRules}
                    setItems={setHotelRules}
                    title="Hotel Rules"
                    placeholder="Add new rule ..."
                  />
                  <ManageHotelItems
                    items={hotelAmenities}
                    setItems={setHotelAmenities}
                    title="Hotel Amenities"
                    placeholder="Add new amenity ..."
                  />
                </div>
              </div>
            </div>
            <div className="w-full text-center">
              <Button
                variant="primary"
                type="submit"
                className="text-xl py-8 px-6 mt-4"
              >
                Create Hotel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHotelModal;
