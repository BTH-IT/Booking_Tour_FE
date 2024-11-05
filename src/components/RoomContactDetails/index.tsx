import InputFormItem from '../Input/InputFormItem';
import styled from 'styled-components';

const ContactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 30px;
`;

const RoomContactDetails = () => {
  return (
    <>
      <ContactTitle>Contact Details</ContactTitle>
      <InputFormItem
        label='Full Name'
        name='fullName'
        rules={[
          {
            required: true,
          },
        ]}
      />
      <InputFormItem
        label='Email'
        name='email'
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      />
      <InputFormItem
        label='Phone'
        name='phone'
        rules={[
          {
            required: true,
            message: 'This field is a phone number',
            pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
          },
        ]}
      />
      <InputFormItem label='Address' name='address' />
      <InputFormItem
        label='Note'
        name='note'
        rules={[{ required: false, message: 'Please input your note!' }]}
        isTextArea
      />
    </>
  );
};

export default RoomContactDetails;
