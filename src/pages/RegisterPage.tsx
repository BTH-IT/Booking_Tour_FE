import CalendarInput from '@/components/CalendarInput';
import CustomButton from '@/components/CustomButton';
import InputFormItem from '@/components/Input/InputFormItem';
import SearchTitle from '@/components/SearchTitle';
import SelectFormItem from '@/components/Select/SelectFormItem';
import useLoginForm from '@/hooks/useLoginForm';
import { Col, Form, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { CalendarChangeEvent } from 'primereact/calendar';
import { useState } from 'react';
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

const CheckboxStyled = styled(Checkbox)`
  width: 100%;
  margin: 30px 0;
  justify-content: center;
  span {
    font-size: 1.2rem;
  }
`;

const RegisterPage = () => {
  const { form, Form } = useLoginForm();
  const [date, setDate] = useState(new Date());

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
                rules={[{ required: true }]}
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
                options={[]}
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
                    label: 'Chọn giới tính',
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
                rules={[{ required: true }]}
              >
                <CalendarInput
                  value={date}
                  onChange={(e: CalendarChangeEvent) => {
                    setDate(e.value as Date);
                    form.setFieldValue('birthDate', e.value);
                  }}
                  bordered={true}
                  rounded="8px"
                />
              </FormItemStyled>
            </Col>
          </Row>
          <Form.Item rules={[{ required: true }]} name="term">
            <CheckboxStyled
              onChange={(e: CheckboxChangeEvent) => {
                form.setFieldValue('term', e.target.checked);
              }}
            >
              Creating an account means you're okay with our Terms of Service
              and Privacy Statement.
            </CheckboxStyled>
          </Form.Item>
          <CustomButton width="100%" height="50px" htmlType="submit">
            Sign Up
          </CustomButton>
        </Form>
      </RegisterStyled>
    </>
  );
};

export default RegisterPage;
