import { Button, Col, Form, Row } from 'antd';
import styled from 'styled-components';

export const SearchFormContent = styled(Row)`
  padding: 30px 0 18px 30px;
  width: 100%;
`;

export const SearchFormWrapper = styled(Form)`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 80%;
  overflow: hidden;

  label {
    font-size: 1.5rem !important;
  }

  input,
  select {
    font-size: 1.3rem !important;
  }

  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
`;

export const SearchFormButton = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0;

  span {
    font-size: 2rem;
  }
`;
