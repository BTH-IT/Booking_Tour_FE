import { Form } from "antd";

const useLoginForm = () => {
  const [form] = Form.useForm();

  return { form, Form };
};

export default useLoginForm;
