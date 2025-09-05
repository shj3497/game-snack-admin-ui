'use client';

import {styled} from '@mui/material';
import {DatePicker, DateTimePicker, DatePickerProps} from '@mui/x-date-pickers';
import {FC} from 'react';

type Props = {
  // label?: string;
} & DatePickerProps;

const StyledDatePicker = styled(DatePicker)``;

const DateRange: FC<Props> = ({...props}) => {
  return <StyledDatePicker {...props} />;
};

export default DateRange;
