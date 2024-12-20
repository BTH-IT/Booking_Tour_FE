import { Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import Overlay from './Overlay';
import Sidebar from './Sidebar';

import ButtonLink from '@/components/ButtonLink';
import CustomButton from '@/components/CustomButton';
import InputFormItem from '@/components/Input/InputFormItem';
import { Toaster } from '@/components/ui/toaster';
import useLoginForm from '@/hooks/useLoginForm';
import { LoginFormType } from '@/redux/features/auth/authSaga';
import { authActions } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';

interface IDefaultStyledProps {
  $isShow: boolean;
}

const DefaultStyled = styled.div<IDefaultStyledProps>`
  position: relative;
  transition: all 0.3s ease;
  transform: ${({ $isShow }) =>
    $isShow ? 'translateX(-350px)' : 'translateX(0)'};
  background-color: #f8f8f8;
  z-index: 2;

  @media screen and (max-width: 576px) {
    transform: ${({ $isShow }) =>
      $isShow ? 'translateX(-200px)' : 'translateX(0)'};
  }
`;

const ModalStyled = styled(Modal)`
  & .ant-modal-close {
    width: 30px;
    height: 30px;
    top: 20px;
  }

  & .ant-modal-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 10px;
  }

  & .ant-modal-header .ant-modal-title {
    text-align: center;
    flex: 1;
    font-size: 1.6rem;
    text-transform: uppercase;
  }
`;

const FooterStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterTopStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
`;

const FooterBottomStyled = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const FooterBottomLinkStyled = styled.a`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FormInputStyled = styled(InputFormItem)`
  padding-block: 10px;

  svg {
    font-size: 1.6rem;
  }
`;

const ButtonStyled = styled(CustomButton)`
  margin-top: 20px;
`;

const DefaultLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, Form } = useLoginForm();
  const dispatch = useAppDispatch();

  const onFinish = async (data: LoginFormType) => {
    dispatch(
      authActions.login({
        ...data,
        actionSuccess: () => {
          setIsModalOpen(false);
          form.resetFields();
          toast.success('Login Success!!');
        },
      })
    );
  };

  return (
    <>
      <DefaultStyled $isShow={showSidebar}>
        <Header
          isShowSidebar={showSidebar}
          onClick={() => setShowSidebar((prev) => !prev)}
          handleShowModal={() => setIsModalOpen((prev) => !prev)}
        />
        <Outlet />
        <Footer />
        <Overlay $isShow={showSidebar} onClose={() => setShowSidebar(false)} />
      </DefaultStyled>
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)}></Sidebar>}
      <ModalStyled
        footer={null}
        title="Login"
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <FormInputStyled
                name="email"
                label="Email"
                placeholder="email"
                bordered
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
            <Col xs={24}>
              <FormInputStyled
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                bordered
                isPassword
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
            </Col>
          </Row>
          <ButtonStyled width="100%" height="50px" htmlType="submit">
            Sign In!
          </ButtonStyled>
          <FooterStyled>
            <FooterTopStyled>
              <h4>DO NOT HAVE AN ACCOUNT?</h4>
              <ButtonLink
                href="/register"
                color="#5c98f2"
                $hoverColor="#5c98f2"
              >
                CREATE AN ACCOUNT
              </ButtonLink>
            </FooterTopStyled>
          </FooterStyled>
        </Form>
      </ModalStyled>
      <Toaster />
    </>
  );
};

export default DefaultLayout;
