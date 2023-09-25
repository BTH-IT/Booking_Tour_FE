import { Calendar } from 'primereact/calendar';
import styled from 'styled-components';

export const CalendarInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  svg {
    flex-shrink: 0;
    padding: 10px;
    display: inline-block;
    width: 50px;
    height: 40px;
    border-right: 1px solid #d1d5db;
  }
`;

export const CalendarInput = styled(Calendar)`
  width: 100%;
  height: 100%;

  & .p-inputtext.p-component {
    border: 0px !important;
  }

  & .p-inputtext:enabled:focus {
    outline: none !important;
    outline-offset: 0 !important;
    box-shadow: 0 0 0 0.2rem transparent !important;
    border-color: 0 !important;
  }
`;
