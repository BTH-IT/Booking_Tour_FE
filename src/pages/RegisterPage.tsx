import CalendarInput from '@/components/CalendarInput';
import CustomButton from '@/components/CustomButton';
import InputFormItem from '@/components/Input/InputFormItem';
import SearchTitle from '@/components/SearchTitle';
import SelectFormItem from '@/components/Select/SelectFormItem';
import { useAppSelector } from '@/redux/hooks';
import authService from '@/services/AuthService';
import { countryList } from '@/utils/constants';
import { Col, Form, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { RuleObject } from 'antd/es/form';
import { CalendarChangeEvent } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const RegisterStyled = styled.div`
  background-color: white;
  padding: 20px;

  form {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
  }
`;

const FormItemStyled = styled(Form.Item)`
  label {
    font-size: 1.6rem !important;
  }
`;
const CheckboxFormStyled = styled(Form.Item)`
  .ant-form-item-explain-error {
    text-align: center;
  }
  margin-bottom: 100px !important;
`;

const CheckboxStyled = styled(Checkbox)`
  width: 100%;
  margin: 30px 0;
  justify-content: center;
  span {
    font-size: 1.2rem;
  }
`;

export interface RegisterFormType {
  email: string;
  fullname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  country: string;
  gender: string;
  birthDate: string;
  term: boolean;
}

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [checked, setChecked] = useState(false);
  const loginSuccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );

  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess]);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    form.setFieldValue('term', e.target.checked);
  };

  const onFinish = async (values: RegisterFormType) => {
    try {
      await authService.register(values);

      toast.success('Register Success!!');

      navigate('/login');
    } catch (error: any) {
      toast.error('Register Failure!!');
    }
  };

  const validationChecked = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void,
  ) => {
    if (checked) {
      return callback();
    }
    return callback('Please accept the terms and conditions');
  };

  const validationDate = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void,
  ) => {
    if (date != null) {
      return callback();
    }
    return callback('Please select your birth date');
  };

  return (
    <>
      <SearchTitle>Register</SearchTitle>
      <RegisterStyled>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            email: '',
            fullname: '',
            password: '',
            passwordConfirm: '',
            phone: '',
            country: '',
            gender: '',
            birthDate: '',
            term: false,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[20, 20]}>
            <Col xs={12}>
              <InputFormItem
                name="email"
                label="Email"
                placeholder="email"
                bordered
                allowClear
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="fullname"
                label="Fullname"
                placeholder="fullname"
                bordered
                allowClear
                rules={[{ required: true }]}
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                bordered
                allowClear
                rules={[{ required: true }]}
                isPassword
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="passwordConfirm"
                label="Confirm Password"
                placeholder="confirm password"
                type="password"
                bordered
                allowClear
                rules={[
                  {
                    required: true,
                  },
                  {
                    message: "This field must equal to password's field",
                    pattern: new RegExp(form.getFieldValue('password')),
                  },
                ]}
                isPassword
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="phone"
                label="Phone"
                placeholder="phone"
                bordered
                allowClear
                rules={[
                  {
                    required: true,
                    message: 'This field is a phone number',
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                  },
                ]}
              />
            </Col>
            <Col xs={12}>
              <SelectFormItem
                name="country"
                label="Country"
                size="large"
                options={countryList}
                bordered={true}
                rules={[{ required: true }]}
              />
            </Col>
            <Col xs={12}>
              <SelectFormItem
                name="gender"
                label="Gender"
                size="large"
                options={[
                  {
                    value: '',
                    label: 'Select your gender',
                  },
                  {
                    value: '1',
                    label: 'Nam',
                  },
                  {
                    value: '0',
                    label: 'Nữ',
                  },
                ]}
                bordered={true}
                rules={[{ required: true }]}
              />
            </Col>
            <Col xs={12}>
              <FormItemStyled
                name="birthDate"
                label="Birth Date"
                rules={[{ validator: validationDate }]}
              >
                <CalendarInput
                  value={date}
                  onChange={(e: CalendarChangeEvent) => {
                    setDate(e.value as Date);
                  }}
                  bordered={true}
                  rounded="8px"
                  errored={date == null && form.isFieldTouched('birthDate')}
                />
              </FormItemStyled>
            </Col>
          </Row>
          <CheckboxFormStyled
            rules={[{ validator: validationChecked }]}
            name="term"
          >
            <CheckboxStyled onChange={onCheckboxChange} checked={checked}>
              Creating an account means you're okay with our Terms of Service
              and Privacy Statement.
            </CheckboxStyled>
          </CheckboxFormStyled>
          <CustomButton width="100%" height="50px" htmlType="submit">
            Sign Up
          </CustomButton>
        </Form>
      </RegisterStyled>
    </>
  );
};

export default RegisterPage;
