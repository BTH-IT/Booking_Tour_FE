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
import dayjs, { type Dayjs } from 'dayjs';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { IDestination, ITour, ITourItem } from '@/types';
import tourService from '@/services/TourService';
import { ITourFile } from 'file';
import uploadService from '@/services/UploadService';
import ManageTourItems from '@/components/ManageTourItems';
import ManageTourImages from '@/components/ManageTourImages';
import ManageTourVideo from '@/components/ManageTourVideo';
import TourForm from '@/components/TourForm';

interface DetailTourModalProps {
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: Dispatch<SetStateAction<boolean>>;
  tours: ITour[];
  setTours: Dispatch<SetStateAction<ITour[]>>;
  tour: ITour;
  destinations: IDestination[];
}

const DetailTourModal = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  tours,
  setTours,
  tour,
  destinations,
}: DetailTourModalProps) => {
  const { toast } = useToast();

  const [video, setVideo] = useState<ITourFile[]>([]);
  const [images, setImages] = useState<ITourFile[]>([]);
  const [priceIncludeList, setpriceIncludeList] = useState<ITourItem[]>([]);
  const [priceExcludeList, setpriceExcludeList] = useState<ITourItem[]>([]);
  const [activityList, setActivityList] = useState<ITourItem[]>([]);
  const [dayList, setDayList] = useState<ITourItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Tour name is required' })
      .refine(
        (name) => {
          return (
            tour.name === name || !tours.find((tour) => tour.name === name)
          );
        },
        { message: 'Tour name already exists' },
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
      salePercent: '',
    },
  });

  useEffect(() => {
    if (tour) {
      console.log(tour);
      form.setValue('name', tour.name);
      form.setValue('maxGuests', tour.maxGuests.toString());
      form.setValue('isWifi', tour.isWifi);
      form.setValue('detail', tour.detail);
      form.setValue('expect', tour.expect);
      form.setValue('price', tour.price.toString());
      form.setValue('dateFrom', dayjs(tour.dateFrom));
      form.setValue('dateTo', dayjs(tour.dateTo));
      form.setValue('destination', {
        label: tour.destination.name,
        value: tour.destinationId.toString(),
      });
      form.setValue('salePercent', tour.salePercent.toString());

      setpriceIncludeList(
        tour.priceIncludeList?.map((item, idx) => ({ id: idx, title: item })),
      );
      setpriceExcludeList(
        tour.priceExcludeList?.map((item, idx) => ({ id: idx, title: item })),
      );
      setActivityList(
        tour.activityList?.map((item, idx) => ({ id: idx, title: item })),
      );
      setDayList(tour.dayList?.map((item, idx) => ({ id: idx, title: item })));

      setVideo([{ id: 0, url: tour.video }]);

      setImages(tour.imageList.map((url, idx) => ({ id: idx, url })));

      setIsMounted(true);
    }
  }, [tour, isDetailModalOpen]);

  const closeModal = () => {
    setIsDetailModalOpen(false);
    form.reset();
    setVideo([]);
    setImages([]);
    setpriceIncludeList([]);
    setpriceExcludeList([]);
    setActivityList([]);
    setDayList([]);
  };

  const handleUpdateTour = async (data: any) => {
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

      const tourData = {
        ...data,
        imageList: imageData.map((i) => i.url),
        video: videoData.map((v) => v.url)[0],
      };

      const res = await tourService.updateTour(tourData, tour.id);
      if (res) {
        setTours(tours.map((t) => (t.id === tour.id ? res.result : t)));
        toast({
          duration: 2000,
          title: 'Tour updated successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to update tour');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to update tour!',
        });
      }
    } catch (error) {
      console.error('Failed to update tour:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to update tour!',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (priceIncludeList?.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price include item!',
      });
      return;
    }
    if (priceExcludeList?.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price exclude item!',
      });
      return;
    }
    if (activityList?.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one activity!',
      });
      return;
    }
    if (dayList?.length === 0) {
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
    await handleUpdateTour(data);
  };

  return (
    <>
      {isMounted && (
        <Dialog open={isDetailModalOpen} onOpenChange={closeModal}>
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
                      <TourForm
                        form={form}
                        destinations={destinations}
                        edit={true}
                      />
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
                    Update Tour
                    {form.formState.isSubmitting && (
                      <div className="w-4 h-4 ml-3 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DetailTourModal;
