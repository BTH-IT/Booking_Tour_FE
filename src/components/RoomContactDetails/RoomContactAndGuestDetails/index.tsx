import { countryList } from '@/utils/constants';
import { Col, FormInstance, Row } from 'antd';
import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';

const ContactAndGuestDetailsWrapper = styled.div`
  box-shadow: 0px 20px 45px rgb(0 0 0 / 10%);
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`;

const ContactAndGuestDetailsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
`;

const ContactAndGuestDetailsItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
const ContactAndGuestDetailsItemLabel = styled.div`
  min-width: 110px;
  font-size: 1.6rem;
`;
const ContactAndGuestDetailsItemValue = styled.div`
  font-size: 1.6rem;
`;

const RoomContactAndGuestDetails = ({
  form,
  roomPayment,
}: {
  form: FormInstance<any>;
  roomPayment: any;
}) => {
  const adults = [];
  const children = [];

  for (let i = 1; i <= roomPayment.adults; i++) {
    adults.push(i);
  }
  for (let i = 1; i <= roomPayment.children; i++) {
    children.push(i);
  }

  return (
    <ContactAndGuestDetailsWrapper>
      <ContactAndGuestDetailsTitle>Contact Details</ContactAndGuestDetailsTitle>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Full Name : {JSON.stringify(form.getFieldsValue())}
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {form.getFieldValue('fullName')}
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Email :
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {form.getFieldValue('email')}
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Phone :
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {form.getFieldValue('phone')}
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Country :
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {
            countryList.find(
              (item) => item.value === form.getFieldValue('country'),
            )?.label
          }
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Address :
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {form.getFieldValue('address')}
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>
      <ContactAndGuestDetailsItem>
        <ContactAndGuestDetailsItemLabel>
          Note :
        </ContactAndGuestDetailsItemLabel>
        <ContactAndGuestDetailsItemValue>
          {form.getFieldValue('note')}
        </ContactAndGuestDetailsItemValue>
      </ContactAndGuestDetailsItem>

      <ContactAndGuestDetailsTitle>Guest Details</ContactAndGuestDetailsTitle>
      {adults.map((item: any) => (
        <Row gutter={[20, 20]} key={item}>
          <Col xs={5}>
            <ContactAndGuestDetailsItemLabel>
              Guest Adult {item}:
            </ContactAndGuestDetailsItemLabel>
          </Col>
          <Col xs={19}>
            <ContactAndGuestDetailsItem>
              <ContactAndGuestDetailsItemLabel>
                Full Name :
              </ContactAndGuestDetailsItemLabel>
              <ContactAndGuestDetailsItemValue>
                {form.getFieldValue(`fullName-adult-${item}`)}
              </ContactAndGuestDetailsItemValue>
            </ContactAndGuestDetailsItem>
            <ContactAndGuestDetailsItem>
              <ContactAndGuestDetailsItemLabel>
                Phone :
              </ContactAndGuestDetailsItemLabel>
              <ContactAndGuestDetailsItemValue>
                {form.getFieldValue(`phone-adult-${item}`)}
              </ContactAndGuestDetailsItemValue>
            </ContactAndGuestDetailsItem>
            <ContactAndGuestDetailsItem>
              <ContactAndGuestDetailsItemLabel>
                Age :
              </ContactAndGuestDetailsItemLabel>
              <ContactAndGuestDetailsItemValue>
                {form.getFieldValue(`age-adult-${item}`)}
              </ContactAndGuestDetailsItemValue>
            </ContactAndGuestDetailsItem>
          </Col>
        </Row>
      ))}
      {children.map((item: any) => (
        <Row gutter={[20, 20]} key={item}>
          <Col xs={5}>
            <ContactAndGuestDetailsItemLabel>
              Guest Adult {item}:
            </ContactAndGuestDetailsItemLabel>
          </Col>
          <Col xs={19}>
            <ContactAndGuestDetailsItem>
              <ContactAndGuestDetailsItemLabel>
                Full Name :
              </ContactAndGuestDetailsItemLabel>
              <ContactAndGuestDetailsItemValue>
                {form.getFieldValue(`fullName-child-${item}`)}
              </ContactAndGuestDetailsItemValue>
            </ContactAndGuestDetailsItem>
            <ContactAndGuestDetailsItem>
              <ContactAndGuestDetailsItemLabel>
                Age :
              </ContactAndGuestDetailsItemLabel>
              <ContactAndGuestDetailsItemValue>
                {form.getFieldValue(`age-child-${item}`)}
              </ContactAndGuestDetailsItemValue>
            </ContactAndGuestDetailsItem>
          </Col>
        </Row>
      ))}
    </ContactAndGuestDetailsWrapper>
  );
};

export default RoomContactAndGuestDetails;
