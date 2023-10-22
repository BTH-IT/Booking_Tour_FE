import ButtonLink from '@/components/ButtonLink';
import ContactDetails from '@/components/ContactDetails';
import ContactAndTravellerDetails from '@/components/ContactDetails/ContactAndTravellerDetails';
import CustomButton from '@/components/CustomButton';
import InformationTour from '@/components/InformationTour';
import SearchTitle from '@/components/SearchTitle'
import Services from '@/components/Services';
import TravellerDetails from '@/components/TravellerDetails';
import { Container } from '@/constants'
import { Col, Form, Row, Steps } from 'antd';
import { useState } from 'react';
import styled from 'styled-components'

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
`

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
]

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const PaymentPage = () => {
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
      <SearchTitle backgroundImg='/page-title-bg.png'>Payment</SearchTitle>
      <Container>
        <PaymentWrapper>
          <div>
            <Steps
              current={current}
              progressDot
              items={steps}
            />
          </div>
          <RowStyled gutter={[20, 20]}>
            <Col xs={16}>
              {current === 1 && 
                <Form {...layout} form={form}>
                  <TravellerDetails/>
                  <ContactDetails/>
                </Form>
              }

              {current === 2 && 
                <>
                  <Services/>
                  <ContactAndTravellerDetails form={form}/>
                </>
              }

              {current === 2 && 
                <>
                  <Services/>
                  <ContactAndTravellerDetails form={form}/>
                </>
              }

              {current === steps.length - 1 && 
                <>
                  <BookingComplete>
                    <h2>Booking Completed!</h2>
                    <h6>Thank you!</h6>
                    <p>Your booking detail has been sent to your email.<br/>
                        You can check the payment status from your dashboard.
                    </p>
                    <CustomButton
                      type="primary"
                      height='50px'
                      >
                        Go to home
                    </CustomButton>
                  </BookingComplete>
                </>
              }
            </Col>
            <Col xs={8}>
              <InformationTour current={current} maxStep={steps.length}/>
              <PaymentButtonWrapper>
                {current < steps.length - 2 && (
                  <CustomButton type="primary" htmlType='submit' onClick={() => {
                    if (current === 1) {
                      form.submit();
                    }
                    next()
                  }}>
                    {current === steps.length - 2 ? "Payment" : "Next"}
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
  )
}

export default PaymentPage
