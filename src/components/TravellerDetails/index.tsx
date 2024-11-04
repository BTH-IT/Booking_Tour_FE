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

const TravellerDetails = ({ travellers }: { travellers: number }) => {
  const travellerList = [];

  for (let i = 1; i <= travellers; i++) {
    travellerList.push(i);
  }

  return (
    <>
      <TravellerTitle>Traveller Details</TravellerTitle>
      {travellerList.map((item, idx) => {
        return (
          <Row gutter={[20, 20]} key={idx}>
            <Col xs={4}>
              <TravellerSubTitle>Traveller {item}</TravellerSubTitle>
            </Col>
            <Col xs={20}>
              <InputFormItem
                label='Full Name'
                name={`fullName-${item}`}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <InputFormItem
                label='Phone'
                name={`phone-${item}`}
                rules={[
                  {
                    required: true,
                    message: 'This field is a phone number',
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                  },
                ]}
              />
              <InputFormItem
                label='Age'
                name={`age-${item}`}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <InputFormItem
                label='Gender'
                name={`gender-${item}`}
                rules={[
                  {
                    required: true,
                  },
                ]}
                isSelect
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default TravellerDetails;
