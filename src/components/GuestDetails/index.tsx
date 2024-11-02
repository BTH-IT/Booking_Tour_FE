import { Col, Form, Row } from 'antd';
import InputFormItem from '../Input/InputFormItem';
import styled from 'styled-components';

const TravellerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 30px;
`;

const TravellerSubTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 30px;
`;

const GuestDetails = ({
  adults,
  children,
}: {
  adults: number;
  children: number;
}) => {
  const adultList = [];
  const childList = [];

  for (let i = 1; i <= adults; i++) {
    adultList.push(i);
  }
  for (let i = 1; i <= children; i++) {
    childList.push(i);
  }

  return (
    <>
      <TravellerTitle>Traveller Details</TravellerTitle>
      <div className="flex flex-col gap-8">
        {adultList.map((item) => {
          return (
            <Row
              className={item !== 1 ? 'mt-5' : ''}
              gutter={[20, 20]}
              key={item}
            >
              <Col xs={4}>
                <TravellerSubTitle>Adult {item}</TravellerSubTitle>
              </Col>
              <Col xs={20}>
                <InputFormItem
                  label="Full Name"
                  name={`fullName-adult-${item}`}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <InputFormItem
                  label="Phone"
                  name={`phone-adult-${item}`}
                  rules={[
                    {
                      required: true,
                      message: 'This field is a phone number',
                      pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                    },
                  ]}
                />
                <InputFormItem
                  label="Age"
                  name={`age-adult-${item}`}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
            </Row>
          );
        })}
        {childList.map((item) => {
          return (
            <Row
              className={item !== 1 ? 'mt-5' : ''}
              gutter={[20, 20]}
              key={item}
            >
              <Col xs={4}>
                <TravellerSubTitle>Child {item}</TravellerSubTitle>
              </Col>
              <Col xs={20}>
                <InputFormItem
                  label="Full Name"
                  name={`fullName-child-${item}`}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <InputFormItem
                  label="Age"
                  name={`age-child-${item}`}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default GuestDetails;
