import { Form, Slider } from 'antd';
import * as Styles from './styles';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import CalendarInput from '@/components/CalendarInput';
import { AiOutlineClose } from 'react-icons/ai';
import Filter from './Filter';
import CustomButton from '@/components/CustomButton';
import { CalendarChangeEvent } from 'primereact/calendar';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';

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

  const onFinish = async (values: any) => {
    setMeta({
      ...meta,
      search: values.keywords,
      dateFrom: date[0]?.getTime() || null,
      dateTo: date[1]?.getTime() || null,
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
      search: '',
      dateFrom: null,
      dateTo: null,
      priceFrom: 0,
      priceTo: null,
      _page: 1,
    });
  };

  const debouncedSetMeta = debounce(
    (value: [number, number]) =>
      setMeta({
        ...meta,
        priceFrom: value[0],
        priceTo: value[1],
        _page: 1,
      }),
    500,
  );

  return (
    <Styles.TourSearchContentForm
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        keywords: '',
        date: [],
        price: [
          Number(searchParams.get('priceFrom') || 0),
          Number(searchParams.get('priceTo') || 100000000000000000000000),
        ],
      }}
    >
      <Styles.TourSearchContentTitle>
        <BsSearch />
        <span>Tour Search</span>
      </Styles.TourSearchContentTitle>
      <Styles.TourSearchContentFormItem name="keywords" label="Keywords">
        <Styles.TourSearchContentFormInput
          placeholder="input search text"
          suffix={<BsSearch />}
          bordered={false}
          allowClear
        />
      </Styles.TourSearchContentFormItem>
      <Styles.TourSearchContentFormDate name="date" label="Date">
        <CalendarInput
          value={date}
          onChange={(e: CalendarChangeEvent) => setDate(e.value as Date[])}
          minDate={new Date()}
          selectionMode="range"
          numberOfMonths={2}
        />
      </Styles.TourSearchContentFormDate>
      <Styles.TourSearchContentFormItem name="price" label="Price">
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
        type="button"
      >
        <AiOutlineClose />
        <span>Clear Filter</span>
      </Styles.TourSearchContentFormButton>
      <Styles.TourSearchContentFormLine />
      <Filter meta={meta} setMeta={setMeta} />
      <CustomButton
        type="primary"
        border_radius="0px"
        width="100%"
        height="50px"
        htmlType="submit"
      >
        SEARCH
      </CustomButton>
    </Styles.TourSearchContentForm>
  );
};

export default TourSearchContentForm;