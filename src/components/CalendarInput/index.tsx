import { Dispatch, SetStateAction } from 'react';
import { BsCalendar2Date } from 'react-icons/bs';
import { CalendarProps } from 'primereact/calendar';

import * as Styles from './styles';

interface ICalendarInputProps extends CalendarProps {}

const CalendarInput = (props: ICalendarInputProps) => {
  return (
    <Styles.CalendarInputWrapper>
      <BsCalendar2Date />
      <Styles.CalendarInput {...props} />
    </Styles.CalendarInputWrapper>
  );
};

export default CalendarInput;
