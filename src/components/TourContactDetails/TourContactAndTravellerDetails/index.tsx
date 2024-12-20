import { countryList } from '@/utils/constants';
import { Col, FormInstance, Row } from 'antd';
import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';

const ContactAndTravellerDetailsWrapper = styled.div`
  box-shadow: 0px 20px 45px rgb(0 0 0 / 10%);
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`;

const ContactAndTravellerDetailsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
`;

const ContactAndTravellerDetailsItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
const ContactAndTravellerDetailsItemLabel = styled.div`
  min-width: 110px;
  font-size: 1.6rem;
`;
const ContactAndTravellerDetailsItemValue = styled.div`
  font-size: 1.6rem;
`;

const TourContactAndTravellerDetails = ({
  form,
  travellers,
  setTravellers,
}: {
  form: FormInstance<any>;
  travellers: any[];
  setTravellers: Dispatch<SetStateAction<any[]>>;
}) => {
  const values = form.getFieldsValue();

  useLayoutEffect(() => {
    const newValues: any = [];
    for (const key in values) {
      if (key.includes('-')) {
        const keys = key.split('-');
        const idx = newValues.findIndex((item: any) => item.id === keys[1]);

        if (idx === -1) {
          newValues.push({
            id: keys[1],
            [keys[0]]: values[key],
          });
        } else {
          newValues[idx] = {
            ...newValues[idx],
            [keys[0]]: values[key],
          };
        }
      }
    }

    setTravellers(newValues);
  }, []);

  return (
    <ContactAndTravellerDetailsWrapper>
      <ContactAndTravellerDetailsTitle>
        Contact Details
      </ContactAndTravellerDetailsTitle>
      <ContactAndTravellerDetailsItem>
        <ContactAndTravellerDetailsItemLabel>
          Full Name :
        </ContactAndTravellerDetailsItemLabel>
        <ContactAndTravellerDetailsItemValue>
          {form.getFieldValue('fullName')}
        </ContactAndTravellerDetailsItemValue>
      </ContactAndTravellerDetailsItem>
      <ContactAndTravellerDetailsItem>
        <ContactAndTravellerDetailsItemLabel>
          Email :
        </ContactAndTravellerDetailsItemLabel>
        <ContactAndTravellerDetailsItemValue>
          {form.getFieldValue('email')}
        </ContactAndTravellerDetailsItemValue>
      </ContactAndTravellerDetailsItem>
      <ContactAndTravellerDetailsItem>
        <ContactAndTravellerDetailsItemLabel>
          Phone :
        </ContactAndTravellerDetailsItemLabel>
        <ContactAndTravellerDetailsItemValue>
          {form.getFieldValue('phone')}
        </ContactAndTravellerDetailsItemValue>
      </ContactAndTravellerDetailsItem>
      <ContactAndTravellerDetailsItem>
        <ContactAndTravellerDetailsItemLabel>
          Address :
        </ContactAndTravellerDetailsItemLabel>
        <ContactAndTravellerDetailsItemValue>
          {form.getFieldValue('address')}
        </ContactAndTravellerDetailsItemValue>
      </ContactAndTravellerDetailsItem>
      <ContactAndTravellerDetailsItem>
        <ContactAndTravellerDetailsItemLabel>
          Note :
        </ContactAndTravellerDetailsItemLabel>
        <ContactAndTravellerDetailsItemValue>
          {form.getFieldValue('note')}
        </ContactAndTravellerDetailsItemValue>
      </ContactAndTravellerDetailsItem>

      <ContactAndTravellerDetailsTitle>
        Traveller Details
      </ContactAndTravellerDetailsTitle>
      {travellers.map((item: any) => (
        <Row gutter={[20, 20]} key={item.id}>
          <Col xs={4}>
            <ContactAndTravellerDetailsItemLabel>
              Traveller {item.id}:
            </ContactAndTravellerDetailsItemLabel>
          </Col>
          <Col xs={20}>
            <ContactAndTravellerDetailsItem>
              <ContactAndTravellerDetailsItemLabel>
                Full Name :
              </ContactAndTravellerDetailsItemLabel>
              <ContactAndTravellerDetailsItemValue>
                {item.fullName}
              </ContactAndTravellerDetailsItemValue>
            </ContactAndTravellerDetailsItem>
            <ContactAndTravellerDetailsItem>
              <ContactAndTravellerDetailsItemLabel>
                Phone :
              </ContactAndTravellerDetailsItemLabel>
              <ContactAndTravellerDetailsItemValue>
                {item.phone}
              </ContactAndTravellerDetailsItemValue>
            </ContactAndTravellerDetailsItem>
            <ContactAndTravellerDetailsItem>
              <ContactAndTravellerDetailsItemLabel>
                Age :
              </ContactAndTravellerDetailsItemLabel>
              <ContactAndTravellerDetailsItemValue>
                {item.age}
              </ContactAndTravellerDetailsItemValue>
            </ContactAndTravellerDetailsItem>
          </Col>
        </Row>
      ))}
    </ContactAndTravellerDetailsWrapper>
  );
};

export default TourContactAndTravellerDetails;
