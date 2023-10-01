import { Dispatch, SetStateAction } from 'react';
import { BsCalendar2Date } from 'react-icons/bs';
import { CalendarProps } from 'primereact/calendar';

import * as Styles from './styles';

interface ICalendarInputProps extends CalendarProps {
  bordered?: boolean;
  rounded?: string;
}

const CalendarInput = ({
  bordered,
  rounded,
  ...props
}: ICalendarInputProps) => {
  return (
    <Styles.CalendarInputWrapper $isBordered={bordered} rounded={rounded}>
      <BsCalendar2Date />
      <Styles.CalendarInput {...props} />
    </Styles.CalendarInputWrapper>
  );
};

export default CalendarInput;
