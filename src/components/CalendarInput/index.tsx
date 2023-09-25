import React from 'react';
import * as Styles from './styles';
import { BsCalendar2Date } from 'react-icons/bs';
import { CalendarChangeEvent } from 'primereact/calendar';

const CalendarInput = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  function onChange(e: CalendarChangeEvent) {
    setDate(e.value as Date);
  }

  return (
    <Styles.CalendarInputWrapper>
      <BsCalendar2Date />
      <Styles.CalendarInput
        value={date}
        onChange={onChange}
        minDate={new Date()}
      />
    </Styles.CalendarInputWrapper>
  );
};

export default CalendarInput;
