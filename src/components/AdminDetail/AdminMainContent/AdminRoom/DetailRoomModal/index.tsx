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

interface DetailRoomModalProps {
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: Dispatch<SetStateAction<boolean>>;
  rooms: IRoom[];
  setRooms: Dispatch<SetStateAction<IRoom[]>>;
  room: IRoom;
  hotels: IHotel[];
}

const DetailRoomModal = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  rooms,
  setRooms,
  room,
  hotels,
}: DetailRoomModalProps) => {
  const { toast } = useToast();

  const [roomAmenities, setRoomAmenities] = useState<IRoomAmenity[]>([]);
  const [video, setVideo] = useState<IFile[]>([
    {
      id: '',
    },
  ]);
  const [images, setImages] = useState<IFile[]>([]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Room name is required' })
      .refine(
        (name) => {
          return (
            name === room.name || !rooms.find((room) => room.name === name)
          );
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

  useEffect(() => {
    console.log(room);

    form.setValue('name', room.name);
    form.setValue('hotel', {
      label: room.hotel.name,
      value: `${room.hotel.id}`,
    });
    form.setValue('price', `${room.price}`);
    form.setValue('maxGuests', `${room.maxGuests}`);
    form.setValue('detail', room.detail);
    setRoomAmenities(room.roomAmenities);
    setVideo([
      { id: room.video.id, url: room.video.url, type: room.video.type },
    ]);
    setImages(room.images);
  }, [room, form, isDetailModalOpen]);

  const closeModal = () => {
    setIsDetailModalOpen(false);
    form.reset();
    setRoomAmenities([]);
    setVideo([{ id: '' }]);
    setImages([]);
  };

  const handleEditRoom = async (data: any) => {
    try {
      const imageUploader = images.map(async (i) => {
        if (i.data) {
          const res = await uploadService.uploadMultipleFileWithAWS3([i.data]);
          if (res[0].url) {
            return { id: uuidv4(), url: res[0].url };
          }
        }
        return i;
      });

      const videoUploader = video.map(async (v) => {
        if (v.data) {
          const res = await uploadService.uploadMultipleFileWithAWS3([v.data]);
          if (res[0].url) {
            return { id: uuidv4(), url: res[0].url, type: res[0].type };
          }
        }
        return v;
      });

      const imageData = await Promise.all(imageUploader);

      const videoData = await Promise.all(videoUploader);

      const roomData = {
        ...data,
        id: room.id,
        images: imageData,
        video: videoData[0],
        roomAmenities: roomAmenities,
      };

      console.log(roomData);

      const res = await roomService.updateRoom(room.id, roomData);
      if (res) {
        setRooms((prevRooms) => {
          const updatedRooms = prevRooms.map((r) =>
            r.id === room.id ? { ...r, ...roomData } : r,
          );
          return updatedRooms;
        });
        toast({
          duration: 2000,
          title: 'Room edited successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to edit room');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to edit room!',
        });
      }
    } catch (error) {
      console.error('Failed to edit room:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to edit room!',
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

    await handleEditRoom(data);
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
    <Dialog open={isDetailModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90%] overflow-y-scroll no-scrollbar !px-0">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl text-center">
            Room Detail
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
                          className="h-[200px] text-gray-800 [&_.ql-editor>p]:text-xl !rounded-md [&>.ql-toolbar]:rounded-t-md [&>.ql-container]:rounded-b-md"
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
                key={form.formState.isSubmitting ? 'loading' : 'submit'}
                variant="primary"
                type="submit"
                className="text-xl py-8 px-6 mt-4"
                disabled={form.formState.isSubmitting}
              >
                Edit Room
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

export default DetailRoomModal;
