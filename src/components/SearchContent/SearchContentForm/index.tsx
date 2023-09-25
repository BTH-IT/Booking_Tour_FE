import { Form, Input } from 'antd';
import * as Styles from './styles';
import { BsSearch } from 'react-icons/bs';

const { Search } = Input;

const SearchContentForm = () => {
  const [form] = Form.useForm();

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
    </Styles.SearchContentForm>
  );
};

export default SearchContentForm;
