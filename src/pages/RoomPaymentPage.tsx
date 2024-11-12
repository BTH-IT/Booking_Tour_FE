import { Col, Form, Row, Steps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import CustomButton from '@/components/CustomButton';
import GuestDetails from '@/components/GuestDetails';
import InformationRoom from '@/components/InformationRoom';
import ContactDetails from '@/components/RoomContactDetails';
import RoomContactAndGuestDetails from '@/components/RoomContactDetails/RoomContactAndGuestDetails';
import RoomSearchTitle from '@/components/RoomSearchTitle';
import RoomServices from '@/components/RoomServices';
import { Container } from '@/constants';
import useDidMount from '@/hooks/useDidMount';
import { authActions, selectAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import bookingService from '@/services/BookingService';
import { logError, totalDates } from '@/utils/constants';

const PaymentWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 60px;
  padding-right: 10px;
  padding-left: 10px;
`;

const PaymentButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: end;
`;

const RowStyled = styled(Row)`
  margin-top: 100px;
`;

const BookingComplete = styled.div`
  box-shadow: 0px 20px 45px rgb(0 0 0 / 10%);
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  h2 {
    font-size: 3rem;
    color: black;
  }

  h6 {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    text-align: center;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const steps = [
  {
    title: 'Select Room',
  },
  {
    title: 'Contact Details',
  },
  {
    title: 'Payment',
  },
  {
    title: 'Complete',
  },
];

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const RoomPaymentPage = () => {
  const user = useAppSelector(selectAuth).user;
  const account = useAppSelector(selectAuth).account;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [roomPayment, setRoomPayment] = useState<any>(null);
  const [totalPay, setTotalPay] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useDidMount(() => {
    const storedRoomPayment = JSON.parse(
      localStorage.getItem('room_payment') || 'null'
    );
    console.log(localStorage.getItem('room_payment'));

    if (storedRoomPayment) {
      setRoomPayment(storedRoomPayment);
      const totalDate = totalDates(
        new Date(storedRoomPayment.schedule[0]),
        new Date(storedRoomPayment.schedule[1])
      );
      setTotalPay(storedRoomPayment.price * totalDate);
      setIsMounted(true);
    } else {
      navigate('/', { replace: true });
    }
  });

  const [current, setCurrent] = useState(1);

  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      {isMounted && (
        <>
          <RoomSearchTitle backgroundImg="/page-title-bg.png">
            Payment
          </RoomSearchTitle>
          <Container>
            <PaymentWrapper>
              <div>
                <Steps current={current} progressDot items={steps} />
              </div>
              <RowStyled justify="space-between" gutter={[20, 20]}>
                <Col xs={16}>
                  <Form
                    onFinish={() => {
                      next();
                    }}
                    {...layout}
                    form={form}
                    initialValues={{
                      fullName: user.fullname,
                      email: account.email,
                      phone: user.phone,
                      country: user.country,
                      tip: true,
                    }}
                  >
                    {current === 1 && (
                      <>
                        <GuestDetails
                          adults={roomPayment.adults}
                          children={roomPayment.children}
                        />
                        <ContactDetails />
                      </>
                    )}
                    {current === 2 && (
                      <>
                        <RoomServices setTotalPay={setTotalPay} />
                        <RoomContactAndGuestDetails
                          form={form}
                          roomPayment={roomPayment}
                        />
                      </>
                    )}
                  </Form>

                  {current === steps.length - 1 && (
                    <>
                      <BookingComplete>
                        <h2>Booking Completed!</h2>
                        <h6>Thank you!</h6>
                        <p>
                          Your booking detail has been sent to your email.
                          <br />
                          You can check the payment status from your dashboard.
                        </p>
                        <CustomButton
                          type="primary"
                          height="50px"
                          onClick={() => {
                            navigate('/');
                          }}
                        >
                          Go to home
                        </CustomButton>
                      </BookingComplete>
                    </>
                  )}
                </Col>
                <Col xs={7}>
                  <InformationRoom
                    current={current}
                    maxStep={steps.length}
                    totalPay={totalPay}
                    setTotalPay={setTotalPay}
                  />
                  <PaymentButtonWrapper>
                    {current < steps.length - 1 && (
                      <CustomButton
                        type="primary"
                        htmlType="submit"
                        onClick={async () => {
                          if (current === steps.length - 2) {
                            try {
                              const res =
                                await bookingService.createBookingRoom({
                                  checkIn: new Date(roomPayment.schedule[0]),
                                  checkOut: new Date(roomPayment.schedule[1]),
                                  bookingRoomDetails: [
                                    {
                                      roomId: roomPayment.id,
                                      adults: roomPayment.adults,
                                      children: roomPayment.children,
                                      price: totalPay,
                                    },
                                  ],
                                });

                              res && toast.success('Payment successfully');

                              localStorage.removeItem('room_payment');

                              next();
                            } catch (error) {
                              logError(error);
                              dispatch(authActions.logout());
                            }
                            return;
                          }

                          if (current === 1) {
                            form.submit();
                          }
                        }}
                      >
                        {current === steps.length - 2 ? 'Payment' : 'Next'}
                      </CustomButton>
                    )}

                    {current > 1 && current < steps.length - 2 && (
                      <CustomButton onClick={() => prev()}>
                        Previous
                      </CustomButton>
                    )}
                  </PaymentButtonWrapper>
                </Col>
              </RowStyled>
            </PaymentWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default RoomPaymentPage;
