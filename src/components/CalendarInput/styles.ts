import { Calendar } from 'primereact/calendar';
import styled from 'styled-components';

interface ICalendarInputProps {
  $isBordered?: boolean;
  rounded?: string;
}

export const CalendarInputWrapper = styled.div<ICalendarInputProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  min-height: 48px;
  border-radius: ${(props) => props.rounded ?? '0px'};
  border: ${(props) => props.$isBordered && '1px solid #e2e2e2'};

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
