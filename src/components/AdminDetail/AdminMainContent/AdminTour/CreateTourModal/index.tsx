import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { type Dayjs } from 'dayjs';
import { ITourFile } from 'file';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import ManageTourImages from '@/components/ManageTourImages';
import ManageTourItems from '@/components/ManageTourItems';
import ManageTourVideo from '@/components/ManageTourVideo';
import TourForm from '@/components/TourForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import tourService from '@/services/TourService';
import uploadService from '@/services/UploadService';
import { IDestination, ITour, ITourItem } from '@/types';

interface CreateTourModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  tours: ITour[];
  setTours: Dispatch<SetStateAction<ITour[]>>;
  destinations: IDestination[];
}

const CreateTourModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  tours,
  setTours,
  destinations,
}: CreateTourModalProps) => {
  const { toast } = useToast();

  const [video, setVideo] = useState<ITourFile[]>([]);
  const [images, setImages] = useState<ITourFile[]>([]);
  const [priceIncludeList, setpriceIncludeList] = useState<ITourItem[]>([]);
  const [priceExcludeList, setpriceExcludeList] = useState<ITourItem[]>([]);
  const [activityList, setActivityList] = useState<ITourItem[]>([]);
  const [dayList, setDayList] = useState<ITourItem[]>([]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Tour name is required' })
      .refine(
        (name) => {
          return !tours.find((tour) => tour.name === name);
        },
        { message: 'Tour name already exists' }
      ),
    maxGuests: z.string().min(1, { message: 'Max guests is required' }),
    isWifi: z.boolean({ required_error: 'Wifi is required' }),
    detail: z.string().min(1, { message: 'Description is required' }),
    expect: z.string().min(1, { message: 'Expect is required' }),
    price: z.string().min(1, { message: 'Price is required' }),
    dateFrom: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    dateTo: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    destination: z.object({
      label: z.string(),
      value: z.string(),
    }),
    salePercent: z.string(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      maxGuests: '',
      isWifi: false,
      detail: '',
      expect: '',
      price: '',
      dateFrom: dayjs(),
      dateTo: dayjs(),
      destination: {
        label: '',
        value: '',
      },
      salePercent: '0',
    },
  });

  const closeModal = () => {
    setIsCreateModalOpen(false);
    form.reset();
    setVideo([]);
    setImages([]);
    setpriceIncludeList([]);
    setpriceExcludeList([]);
    setActivityList([]);
    setDayList([]);
  };

  const handleCreateTour = async (data: any) => {
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

      const imageData = imageRes.map((res) => res.url);

      const videoData = videoRes[0].url;

      const tourData = {
        ...data,
        imageList: imageData,
        video: videoData,
      };

      const res = await tourService.createTour(tourData);
      if (res) {
        setTours([...tours, res.result]);
        toast({
          duration: 2000,
          title: 'Tour created successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to create tour');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to create tour!',
        });
      }
    } catch (error) {
      console.error('Failed to create tour:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to create tour!',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (priceIncludeList.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price include item!',
      });
      return;
    }
    if (priceExcludeList.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price exclude item!',
      });
      return;
    }
    if (activityList.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one activity!',
      });
      return;
    }
    if (dayList.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one day!',
      });
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

    const {
      dateFrom,
      dateTo,
      maxGuests,
      salePercent,
      price,
      destination,
      ...rest
    } = values;

    const data = {
      ...rest,
      dateFrom: dateFrom.toDate(),
      dateTo: dateTo.toDate(),
      maxGuests: parseInt(maxGuests),
      salePercent: parseInt(salePercent),
      price: parseInt(price),
      destinationId: destination.value,
      priceIncludeList: priceIncludeList.map((item) => item.title),
      priceExcludeList: priceExcludeList.map((item) => item.title),
      activityList: activityList.map((item) => item.title),
      dayList: dayList.map((item) => item.title),
    };
    await handleCreateTour(data);
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90%] overflow-y-scroll no-scrollbar !px-0">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl text-center">
            Add New Tour
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 overflow-x-hidden"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-col mx-auto gap-10">
                <div className="flex flex-col mt-14 gap-5">
                  <TourForm form={form} destinations={destinations} />
                  <ManageTourItems
                    items={priceIncludeList}
                    setItems={setpriceIncludeList}
                    title="Price Includes"
                    placeholder="Add new item"
                  />
                  <ManageTourItems
                    items={priceExcludeList}
                    setItems={setpriceExcludeList}
                    title="Price Excludes"
                    placeholder="Add new item"
                  />
                  <ManageTourItems
                    items={activityList}
                    setItems={setActivityList}
                    title="Activity List"
                    placeholder="Add new activity"
                  />
                  <ManageTourItems
                    items={dayList}
                    setItems={setDayList}
                    title="Day List"
                    placeholder="Add new day"
                  />
                  <ManageTourImages
                    files={images}
                    setFiles={setImages}
                    title="Tour Images"
                  />
                  <ManageTourVideo
                    files={video}
                    setFiles={setVideo}
                    title="Tour Video"
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
                Create Tour
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

export default CreateTourModal;
