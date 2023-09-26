import { Form, Slider } from 'antd';
import * as Styles from './styles';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import CalendarInput from '@/components/CalendarInput';
import { AiOutlineClose } from 'react-icons/ai';
import Filter from './Filter';
import CustomButton from '@/components/CustomButton';
import { CalendarChangeEvent } from 'primereact/calendar';

const SearchContentForm = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date());

  const onFinish = () => {};

  const onFinishFailed = () => {};

  const onFill = () => {};

  return (
    <Styles.SearchContentForm
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Styles.SearchContentTitle>
        <BsSearch />
        <span>Tour Search</span>
      </Styles.SearchContentTitle>
      <Styles.SearchContentFormItem name="keywords" label="Keywords">
        <Styles.SearchContentFormInput
          placeholder="input search text"
          suffix={<BsSearch />}
          bordered={false}
          allowClear
        />
      </Styles.SearchContentFormItem>
      <Styles.SearchContentFormItem name="duration" label="Duration">
        <Styles.SearchContentFormSelect
          size="middle"
          options={[]}
          bordered={false}
        />
      </Styles.SearchContentFormItem>
      <Styles.SearchContentFormDate name="date" label="Date">
        <CalendarInput
          value={date}
          onChange={(e: CalendarChangeEvent) => setDate(e.value as Date)}
          minDate={new Date()}
        />
      </Styles.SearchContentFormDate>
      <Styles.SearchContentFormItem name="month" label="Month">
        <Styles.SearchContentFormSelect
          size="middle"
          options={[]}
          bordered={false}
        />
      </Styles.SearchContentFormItem>
      <Styles.SearchContentFormItem name="price" label="Price">
        <Slider range defaultValue={[20, 50]} disabled={false} />
      </Styles.SearchContentFormItem>
      <Styles.SearchContentFormItem name="rate" label="Rate">
        <Styles.SearchContentFormRate allowHalf defaultValue={0} />
      </Styles.SearchContentFormItem>
      <Styles.SearchContentFormButton>
        <AiOutlineClose />
        <span>Clear Filter</span>
      </Styles.SearchContentFormButton>
      <Styles.SearchContentFormLine />
      <Filter />
      <CustomButton
        type="primary"
        border_radius="0px"
        width="100%"
        height="50px"
      >
        SEARCH
      </CustomButton>
    </Styles.SearchContentForm>
  );
};

export default SearchContentForm;
