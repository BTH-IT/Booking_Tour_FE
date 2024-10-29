import { Form, Slider } from 'antd';
import * as Styles from './styles';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import CalendarInput from '@/components/CalendarInput';
import { AiOutlineClose } from 'react-icons/ai';
import Filter from './Filter';
import CustomButton from '@/components/CustomButton';
import { CalendarChangeEvent } from 'primereact/calendar';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { ILocation } from 'destination';
import destinationService from '@/services/DestinationService';
import tourService from '@/services/TourService';

const TourSearchContentForm = ({
  meta,
  setMeta,
  defaultValuePriceRange,
}: {
  setMeta: (meta: any) => void;
  meta: any;
  defaultValuePriceRange: [number, number];
}) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<Date[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await destinationService.getCities();
      if (res) {
        setLocations(res.data);
      }
    };

    const fetchActivities = async () => {
      const res = await tourService.getAllTours();
      if (res) {
        setActivities([
          ...new Set(res.result.map((tour) => tour.activityList).flat()),
        ]);
      }
    };

    fetchActivities();
    fetchLocation();
  }, []);

  const onFinish = async (values: any) => {
    setMeta({
      ...meta,
      Keyword: values.keywords,
      StartDate: date[0]?.getTime() || null,
      EndDate: date[1]?.getTime() || null,
      _page: 1,
    });
  };

  const onFinishFailed = () => {
    toast.error('Oops!! something is wrong');
  };

  const handleResetFilter = () => {
    form.resetFields();
    setMeta({
      ...meta,
      Keyword: '',
      StartDate: null,
      EndDate: null,
      MinPrice: 0,
      MaxPrice: null,
      _page: 1,
    });
  };

  const debouncedSetMeta = debounce(
    (value: [number, number]) =>
      setMeta({
        ...meta,
        MinPrice: value[0],
        MaxPrice: value[1],
        _page: 1,
      }),
    500
  );

  return (
    <Styles.TourSearchContentForm
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      initialValues={{
        keywords: '',
        date: [],
        price: [
          Number(searchParams.get('MinPrice') || 0),
          Number(searchParams.get('MaxPrice') || 100000000000000000000000),
        ],
      }}
    >
      <Styles.TourSearchContentTitle>
        <BsSearch />
        <span>Tour Search</span>
      </Styles.TourSearchContentTitle>
      <Styles.TourSearchContentFormItem name='keywords' label='Keywords'>
        <Styles.TourSearchContentFormInput
          placeholder='input search text'
          suffix={<BsSearch />}
          bordered={false}
          allowClear
        />
      </Styles.TourSearchContentFormItem>
      <Styles.TourSearchContentFormDate name='date' label='Date'>
        <CalendarInput
          value={date}
          onChange={(e: CalendarChangeEvent) => setDate(e.value as Date[])}
          minDate={new Date()}
          selectionMode='range'
          numberOfMonths={2}
        />
      </Styles.TourSearchContentFormDate>
      <Styles.TourSearchContentFormItem name='price' label='Price'>
        <Slider
          range
          max={defaultValuePriceRange[1]}
          min={defaultValuePriceRange[0]}
          step={10}
          onChange={(value: number | number[]) => {
            if (Array.isArray(value)) {
              debouncedSetMeta(value as [number, number]);
            }
          }}
        />
      </Styles.TourSearchContentFormItem>
      <Styles.TourSearchContentFormButton
        onClick={handleResetFilter}
        type='button'
      >
        <AiOutlineClose />
        <span>Clear Filter</span>
      </Styles.TourSearchContentFormButton>
      <Styles.TourSearchContentFormLine />
      <Filter
        meta={meta}
        setMeta={setMeta}
        locations={locations}
        activities={activities}
      />
      <CustomButton
        type='primary'
        border_radius='0px'
        width='100%'
        height='50px'
        htmlType='submit'
      >
        SEARCH
      </CustomButton>
    </Styles.TourSearchContentForm>
  );
};

export default TourSearchContentForm;
