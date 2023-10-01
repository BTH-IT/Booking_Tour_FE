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
        <Form form={form} layout="vertical">
          <Row gutter={[20, 20]}>
            <Col xs={12}>
              <InputFormItem
                name="email"
                label="Email"
                placeholder="email"
                bordered
                allowClear
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="fullname"
                label="Fullname"
                placeholder="fullname"
                bordered
                allowClear
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
              />
            </Col>
            <Col xs={12}>
              <InputFormItem
                name="phone"
                label="Phone"
                placeholder="phone"
                bordered
                allowClear
              />
            </Col>
            <Col xs={12}>
              <SelectFormItem
                name="country"
                label="Country"
                size="large"
                options={[]}
                bordered={true}
              />
            </Col>
            <Col xs={12}>
              <SelectFormItem
                name="gender"
                label="Gender"
                size="large"
                options={[]}
                bordered={true}
              />
            </Col>
            <Col xs={12}>
              <FormItemStyled name="birthDate" label="Birth Date">
                <CalendarInput
                  value={date}
                  onChange={(e: CalendarChangeEvent) =>
                    setDate(e.value as Date)
                  }
                  bordered={true}
                  rounded="8px"
                />
              </FormItemStyled>
            </Col>
          </Row>
          <CheckboxStyled
            onChange={(e: CheckboxChangeEvent) => {
              console.log(`checked = ${e.target.checked}`);
            }}
          >
            Creating an account means you're okay with our Terms of Service and
            Privacy Statement.
          </CheckboxStyled>
          <CustomButton width="100%" height="50px">
            Sign In!
          </CustomButton>
        </Form>
      </RegisterStyled>
    </>
  );
};

export default RegisterPage;
