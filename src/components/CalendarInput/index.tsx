import { Dispatch, SetStateAction } from 'react';
import { BsCalendar2Date } from 'react-icons/bs';
import { CalendarProps } from 'primereact/calendar';

import * as Styles from './styles';

interface ICalendarInputProps extends CalendarProps {
  bordered?: boolean;
  errored?: boolean;
  rounded?: string;
  hasIcon?: boolean;
}

const CalendarInput = ({
  bordered,
  rounded,
  errored,
  hasIcon = true,
  ...props
}: ICalendarInputProps) => {
  return (
    <Styles.CalendarInputWrapper
      $isBordered={bordered}
      rounded={rounded}
      $isErrored={errored}
    >
      {hasIcon && <BsCalendar2Date />}
      <Styles.CalendarInput {...props} />
    </Styles.CalendarInputWrapper>
  );
};

export default CalendarInput;
