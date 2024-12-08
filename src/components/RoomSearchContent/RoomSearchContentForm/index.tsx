import { Form, Slider } from 'antd';
import { ILocation } from 'destination';
import { debounce } from 'lodash';
import { CalendarChangeEvent } from 'primereact/calendar';
import { useLayoutEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPeople, BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Filter from './Filter';
import * as Styles from './styles';

import { logError } from '@/utils/constants';
import roomService from '@/services/RoomService';
import destinationService from '@/services/DestinationService';
import CustomButton from '@/components/CustomButton';
import CalendarInput from '@/components/CalendarInput';

interface IData {
  roomAmenities: string[];
  hotelAmenities: string[];
  hotelRules: string[];
  loc: ILocation[];
}

const RoomSearchContentForm = ({
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
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IData>({
    roomAmenities: [],
    hotelAmenities: [],
    hotelRules: [],
    loc: [],
  });
  const [isMounted, setIsMounted] = useState(false);

  const fetchData = async () => {
    try {
      const [roomRes, locRes] = await Promise.all([
        roomService.getAllRooms(),
        destinationService.getCities(),
      ]);

      if (roomRes && locRes) {
        setData({
          roomAmenities: [
            ...new Set(roomRes.result.map((r) => r.roomAmenities).flat()),
          ],
          hotelAmenities: [
            ...new Set(
              roomRes.result.map((r) => r.hotel.hotelAmenities).flat()
            ),
          ],
          hotelRules: [
            ...new Set(roomRes.result.map((r) => r.hotel.hotelRules).flat()),
          ],
          loc: locRes.data,
        });
      }
      setIsMounted(true);
    } catch (error) {
      logError(error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const onFinish = (values: any) => {
    setMeta({
      ...meta,
      name: values.name,
      maxGuests: values.maxGuests,
      checkIn: date[0]?.getTime() || null,
      checkOut: date[1]?.getTime() || null,
    });
    searchParams.set('name', values.keywords);
    searchParams.set('maxGuests', values.maxGuests);
    searchParams.set('checkIn', date[0]?.getTime().toString());
    searchParams.set('checkOut', date[1]?.getTime().toString());
  };

  const onFinishFailed = () => {
    toast.error('Oops!! something is wrong');
  };

  const handleResetFilter = () => {
    form.resetFields();
    setMeta({
      ...meta,
      name: '',
      maxGuests: null,
      checkIn: null,
      checkOut: null,
      minPrice: 0,
      maxPrice: null,
    });
    searchParams.delete('name');
    searchParams.delete('maxGuests');
    searchParams.delete('checkIn');
    searchParams.delete('checkOut');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
  };

  const debouncedSetMeta = debounce((value: [number, number]) => {
    setMeta({
      ...meta,
      minPrice: value[0],
      maxPrice: value[1],
    });
    searchParams.set('minPrice', value[0].toString());
    searchParams.set('maxPrice', value[1].toString());
  }, 500);

  return (
    <>
      {isMounted && (
        <Styles.RoomSearchContentForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: searchParams.get('name') || '',
            date: [],
            price: [
              Number(searchParams.get('minPrice') || 0),
              Number(searchParams.get('maxPrice') || 100000000000),
            ],
            maxGuests: Number(searchParams.get('maxGuests')) || null,
          }}
        >
          <Styles.RoomSearchContentTitle>
            <BsSearch />
            <span>Room Search</span>
          </Styles.RoomSearchContentTitle>
          <Styles.RoomSearchContentFormItem name="name" label="Keywords">
            <Styles.RoomSearchContentFormInput
              placeholder="input search text"
              suffix={<BsSearch />}
              bordered={false}
              allowClear
            />
          </Styles.RoomSearchContentFormItem>
          <Styles.RoomSearchContentFormDate
            name="date"
            label="Check in - Check out"
          >
            <CalendarInput
              value={date}
              onChange={(e: CalendarChangeEvent) => setDate(e.value as Date[])}
              minDate={new Date()}
              selectionMode="range"
              numberOfMonths={2}
            />
          </Styles.RoomSearchContentFormDate>
          <Styles.RoomSearchContentFormItem name="maxGuests" label="Max Guests">
            <Styles.RoomSearchContentFormInput
              placeholder="input number of guests"
              suffix={<BsPeople className="w-5 h-5" />}
              bordered={false}
              allowClear
              type="number"
            />
          </Styles.RoomSearchContentFormItem>
          <Styles.RoomSearchContentFormItem name="price" label="Price">
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
          </Styles.RoomSearchContentFormItem>
          <Styles.RoomSearchContentFormButton
            onClick={handleResetFilter}
            type="button"
          >
            <AiOutlineClose />
            <span>Clear Filter</span>
          </Styles.RoomSearchContentFormButton>
          <Styles.RoomSearchContentFormLine />
          <Filter meta={meta} setMeta={setMeta} data={data} />
          <CustomButton
            type="primary"
            border_radius="0px"
            width="100%"
            height="50px"
            htmlType="submit"
          >
            SEARCH
          </CustomButton>
        </Styles.RoomSearchContentForm>
      )}
    </>
  );
};

export default RoomSearchContentForm;
