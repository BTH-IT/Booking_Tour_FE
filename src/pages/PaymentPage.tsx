import ContactDetails from '@/components/ContactDetails';
import ContactAndTravellerDetails from '@/components/ContactDetails/ContactAndTravellerDetails';
import CustomButton from '@/components/CustomButton';
import InformationTour from '@/components/InformationTour';
import TourSearchTitle from '@/components/TourSearchTitle';
import Services from '@/components/Services';
import TravellerDetails from '@/components/TravellerDetails';
import { Container } from '@/constants';
import { authActions, selectAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import bookingService from '@/services/BookingService';
import { Col, Form, Row, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { logError } from '@/utils/constants';

const PaymentWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 60px;
  padding-right: 10px;
  padding-left: 10px;
`;

const FormWrapper = styled(Form)`
  .ant-form-item-explain-error {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .ant-form-item .ant-form-item-label > label::after {
    margin: 0 !important;
  }
`;

const PaymentButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
    title: 'Select Tour',
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

const PaymentPage = () => {
  const user = useAppSelector(selectAuth).user;
  const account = useAppSelector(selectAuth).account;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [tourPayment, setTourPayment] = useState<any>(null);
  const [totalPay, setTotalPay] = useState(0);

  useEffect(() => {
    const storedTourPayment = JSON.parse(
      localStorage.getItem('tour_payment') || 'null'
    );
    setTourPayment(storedTourPayment);
    setTotalPay(
      (storedTourPayment?.price -
        storedTourPayment?.price * (storedTourPayment?.salePercent / 100)) *
        Number(storedTourPayment?.seats) +
        20 * Number(storedTourPayment?.seats)
    );

    if (!storedTourPayment) {
      navigate('/', { replace: true });
    }
  }, []);

  const [travellers, setTravellers] = useState<any[]>([]);
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
      <TourSearchTitle backgroundImg='/page-title-bg.png'>
        Payment
      </TourSearchTitle>
      <Container>
        <PaymentWrapper>
          <div>
            <Steps current={current} progressDot items={steps} />
          </div>
          <RowStyled gutter={[40, 60]}>
            <Col xs={16}>
              <FormWrapper
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
                  entrance: false,
                  lunch: false,
                }}
              >
                {current === 1 && (
                  <>
                    <TravellerDetails travellers={Number(tourPayment?.seats)} />
                    <ContactDetails />
                  </>
                )}
                {current === 2 && (
                  <>
                    <Services setTotalPay={setTotalPay} />
                    <ContactAndTravellerDetails
                      form={form}
                      travellers={travellers}
                      setTravellers={setTravellers}
                    />
                  </>
                )}
              </FormWrapper>

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
                      type='primary'
                      height='50px'
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
            <Col xs={8}>
              <InformationTour
                current={current}
                maxStep={steps.length}
                totalPay={totalPay}
                setTotalPay={setTotalPay}
              />
              <PaymentButtonWrapper>
                {current < steps.length - 1 && (
                  <CustomButton
                    type='primary'
                    htmlType='submit'
                    onClick={async () => {
                      if (current === steps.length - 2) {
                        try {
                          await bookingService.createBooking({
                            userId: user.id,
                            scheduleId: tourPayment?.schedule.id,
                            seats: Number(tourPayment?.seats),
                            isTip: form.getFieldValue('tip'),
                            isEntranceTicket: form.getFieldValue('entrance'),
                            isLunch: form.getFieldValue('lunch'),
                            status: 'pending',
                            priceTotal: totalPay,
                            travellers: travellers,
                          });

                          toast.success('Payment successfully');

                          next();
                        } catch (error) {
                          logError(error);
                          // dispatch(authActions.logout());
                        }
                        return;
                      }

                      if (current === 1) {
                        const values = form.getFieldsValue();

                        const travellerList = [];

                        for (let i = 1; i <= Number(tourPayment?.seats); i++) {
                          travellerList.push({
                            fullName: values[`fullName-${i}`],
                            phone: values[`phone-${i}`],
                            age: values[`age-${i}`],
                            gender: values[`gender-${i}`],
                          });
                        }

                        setTravellers(travellerList);

                        form.submit();
                      }
                    }}
                  >
                    {current === steps.length - 2 ? 'Payment' : 'Next'}
                  </CustomButton>
                )}

                {current > 1 && current < steps.length - 1 && (
                  <CustomButton onClick={() => prev()}>Previous</CustomButton>
                )}
              </PaymentButtonWrapper>
            </Col>
          </RowStyled>
        </PaymentWrapper>
      </Container>
    </>
  );
};

export default PaymentPage;
