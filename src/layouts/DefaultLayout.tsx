import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Overlay from './Overlay';
import { Col, Form, Modal, Row } from 'antd';
import useLoginForm from '@/hooks/useLoginForm';
import InputFormItem from '@/components/Input/InputFormItem';
import CustomButton from '@/components/CustomButton';
import ButtonLink from '@/components/ButtonLink';

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

const FooterBottomStyled = styled.div``;

const FooterBottomLinkStyled = styled.a`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, Form } = useLoginForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DefaultStyled $isShow={showSidebar}>
        <Header
          $isShowSidebar={showSidebar}
          onClick={() => setShowSidebar((prev) => !prev)}
          onShowModal={() => setIsModalOpen((prev) => !prev)}
        ></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <Overlay
          $isShow={showSidebar}
          onClose={() => setShowSidebar(false)}
        ></Overlay>
      </DefaultStyled>
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)}></Sidebar>}
      <ModalStyled
        footer={null}
        title="Login"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
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
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                bordered
                allowClear
              />
            </Col>
          </Row>
          <CustomButton width="100%" height="50px">
            Sign In!
          </CustomButton>
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
              <p>Or</p>
            </FooterTopStyled>
            <FooterBottomStyled>
              <FooterBottomLinkStyled href="/">
                <img src="./google.png" alt="google" />
              </FooterBottomLinkStyled>
            </FooterBottomStyled>
          </FooterStyled>
        </Form>
      </ModalStyled>
    </>
  );
};

export default DefaultLayout;
