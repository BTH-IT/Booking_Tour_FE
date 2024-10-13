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
import { ITour, ITourItem } from '@/types';
import tourService from '@/services/TourService';
import { IFile } from 'file';
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
}

const DetailTourModal = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  tours,
  setTours,
  tour,
}: DetailTourModalProps) => {
  const { toast } = useToast();

  const [video, setVideo] = useState<IFile[]>([]);
  const [images, setImages] = useState<IFile[]>([]);
  const [priceIncludes, setPriceIncludes] = useState<ITourItem[]>([]);
  const [priceExcludes, setPriceExcludes] = useState<ITourItem[]>([]);
  const [activiyList, setActiviyList] = useState<ITourItem[]>([]);
  const [dayList, setDayList] = useState<ITourItem[]>([]);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Tour name is required' })
      .refine(
        (name) => {
          return !tours.find((tour) => tour.name === name);
        },
        { message: 'Tour name already exists' },
      ),
    maxGuests: z.number().min(1, { message: 'Max guests is required' }),
    isWifi: z.boolean({ required_error: 'Wifi is required' }),
    detail: z.string().min(1, { message: 'Description is required' }),
    expect: z.string().min(1, { message: 'Expect is required' }),
    price: z.number().min(1, { message: 'Price is required' }),
    dateFrom: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    dateTo: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    salePercent: z.number(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      maxGuests: 0,
      isWifi: false,
      detail: '',
      expect: '',
      price: 0,
      dateFrom: dayjs(),
      dateTo: dayjs(),
      salePercent: 0,
    },
  });

  useEffect(() => {
    if (tour) {
      form.setValue('name', tour.name);
      form.setValue('maxGuests', tour.maxGuests);
      form.setValue('isWifi', tour.isWifi);
      form.setValue('detail', tour.detail);
      form.setValue('expect', tour.expect);
      form.setValue('price', tour.price);
      form.setValue('dateFrom', dayjs(tour.dateFrom));
      form.setValue('dateTo', dayjs(tour.dateTo));
      form.setValue('salePercent', tour.salePercent);

      setPriceIncludes(tour.priceIncludes);
      setPriceExcludes(tour.priceExcludes);
      setActiviyList(tour.activities);
      setDayList(tour.dayList);
    }
  }, [tour, isDetailModalOpen]);

  const closeModal = () => {
    setIsDetailModalOpen(false);
    form.reset();
    setVideo([]);
    setImages([]);
  };

  const handleUpdateTour = async (data: any) => {
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

      const tourData = {
        ...data,
        images: imageData,
        video: videoData,
      };

      const res = await tourService.updateTour(tourData);
      if (res) {
        setTours([...tours, res.result]);
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
    if (priceIncludes.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price include item!',
      });
      return;
    }
    if (priceExcludes.length === 0) {
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Please add at least one price exclude item!',
      });
      return;
    }
    if (activiyList.length === 0) {
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

    const { dateFrom, dateTo, ...rest } = values;

    const data = {
      ...rest,
      dateFrom: dateFrom.toDate(),
      dateTo: dateTo.toDate(),
      priceIncludes,
      priceExcludes,
      activiyList,
      dayList,
    };
    await handleUpdateTour(data);
  };

  return (
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
                  <TourForm form={form} />
                  <ManageTourItems
                    items={priceIncludes}
                    setItems={setPriceIncludes}
                    title="Price Includes"
                    placeholder="Add new item"
                  />
                  <ManageTourItems
                    items={priceExcludes}
                    setItems={setPriceExcludes}
                    title="Price Excludes"
                    placeholder="Add new item"
                  />
                  <ManageTourItems
                    items={activiyList}
                    setItems={setActiviyList}
                    title="Activities"
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
                Detail Tour
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

export default DetailTourModal;
