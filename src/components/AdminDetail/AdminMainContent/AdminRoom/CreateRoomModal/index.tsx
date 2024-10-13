import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { IHotel, IRoom, IRoomAmenity } from '@/types';
import ReactQuill from 'react-quill';
import roomService from '@/services/RoomService';
import ManageRoomItems from '@/components/ManageRoomItems';
import { IFile } from 'file';
import ManageRoomImages from '@/components/ManageRoomImages';
import ManageRoomVideo from '@/components/ManageRoomVideo';
import uploadService from '@/services/UploadService';

type OptionType = {
  value: string;
  label: string;
};

interface CreateRoomModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  rooms: IRoom[];
  setRooms: Dispatch<SetStateAction<IRoom[]>>;
  hotels: IHotel[];
}

const CreateRoomModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  rooms,
  setRooms,
  hotels,
}: CreateRoomModalProps) => {
  const { toast } = useToast();

  const [roomAmenities, setRoomAmenities] = useState<IRoomAmenity[]>([]);
  const [video, setVideo] = useState<IFile[]>([]);
  const [images, setImages] = useState<IFile[]>([]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Room name is required' })
      .refine(
        (name) => {
          return !rooms.find((room) => room.name === name);
        },
        { message: 'Room name already exists' },
      ),
    hotel: z.object({
      label: z.string(),
      value: z.string(),
    }),
    price: z.string().min(1, { message: 'Price is required' }),
    maxGuests: z.string().min(1, { message: 'Max guests is required' }),
    detail: z.string().min(1, { message: 'Description is required' }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hotel: {
        label: '',
        value: '',
      },
      detail: '',
    },
  });

  const closeModal = () => {
    setIsCreateModalOpen(false);
    form.reset();
    setRoomAmenities([]);
    setVideo([]);
    setImages([]);
  };

  const handleCreateRoom = async (data: any) => {
    try {
      const imageFiles = images
        .map((i) => i.data)
        .filter((i) => i !== null && i !== undefined);
      const videoFile = video
        .map((v) => v.data)
        .filter((v) => v !== null && v !== undefined);

      if (imageFiles.length === 0 || videoFile.length === 0)
        throw new Error('No files to upload');

      const [imageRes, videoRes] = await Promise.all([
        uploadService.uploadMultipleFileWithAWS3(imageFiles),
        uploadService.uploadMultipleFileWithAWS3(videoFile),
      ]);

      const imageData: IFile[] = imageRes.map((res) => ({
        id: uuidv4(),
        url: res.url,
      }));

      const videoData = videoRes.map((res) => ({
        id: uuidv4(),
        url: res.url,
        type: res.type,
      }))[0];

      const roomData = {
        ...data,
        images: imageData,
        video: videoData,
        roomAmenities: roomAmenities,
      };

      const res = await roomService.createRoom(roomData);
      if (res) {
        setRooms([...rooms, res.result]);
        toast({
          duration: 2000,
          title: 'Room created successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to create room');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to create room!',
        });
      }
    } catch (error) {
      console.error('Failed to create room:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to create room!',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!values.hotel) {
      form.setError('hotel', { message: 'Hotel is required' });
      return;
    }

    if (images.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please upload at least one image!',
      });
      return;
    }

    if (video.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please upload a video!',
      });
      return;
    }

    const { hotel, price, maxGuests, ...rest } = values;
    const data = {
      ...rest,
      hotelId: parseInt(hotel.value),
      price: parseInt(price),
      maxGuests: parseInt(maxGuests),
    };

    await handleCreateRoom(data);
  };

  const generateOptions = useCallback((): OptionType[] => {
    return hotels.map((hotel) => {
      return {
        label: hotel.name,
        value: `${hotel.id}`,
      };
    });
  }, [hotels]);

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90%] overflow-y-scroll no-scrollbar !px-0">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl text-center">
            Add New Room
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
                        Room name
                      </FormLabel>
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
                <FormField
                  control={form.control}
                  name="hotel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl text-gray-800">
                        Hotel
                      </FormLabel>
                      <FormControl>
                        <Select
                          isClearable
                          isSearchable
                          isMulti={false}
                          options={generateOptions()}
                          className="[&>div]:py-[2px] text-2xl text-gray-900"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-[800px] gap-[40px] items-center">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl text-gray-800">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-[480px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            className="w-[480px] text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
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
                      <FormLabel className="text-xl text-gray-800">
                        Description
                      </FormLabel>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-[200px] text-gray-900 text-xl !rounded-md [&>.ql-toolbar]:rounded-t-md [&>.ql-container]:rounded-b-md"
                          placeholder="Write something amazing..."
                        />
                      </FormControl>
                      <FormMessage className="!mt-16" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col mt-14 gap-5">
                  <ManageRoomItems
                    items={roomAmenities}
                    setItems={setRoomAmenities}
                    title="Room Amenities"
                    placeholder="Add new amenity ..."
                  />
                  <ManageRoomImages
                    files={images}
                    setFiles={setImages}
                    title="Room Images"
                  />
                  <ManageRoomVideo
                    files={video}
                    setFiles={setVideo}
                    title="Room Video"
                  />
                </div>
              </div>
            </div>
            <div className="w-full text-center">
              <Button
                variant="primary"
                type="submit"
                className="text-xl py-8 px-6 mt-4"
                disabled={form.formState.isSubmitting}
              >
                Create Room
                {form.formState.isSubmitting && (
                  <div className="w-4 h-4 ml-3 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;
