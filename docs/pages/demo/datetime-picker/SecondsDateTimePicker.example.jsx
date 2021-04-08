import React, { Fragment, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';

const DATE_TIME_VIEWS = ['date', 'month', 'year', 'hours', 'minutes', 'seconds'];

function SecondsDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DateTimePicker
        ampm={false}
        label="Seconds DateTimePicker Inline"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
        views={DATE_TIME_VIEWS}
        format="dd/MM/yyyy HH:mm:ss"
        variant="inline"
      />

      <DateTimePicker
        ampm={false}
        label="Seconds DateTimePicker"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
        views={DATE_TIME_VIEWS}
        format="dd/MM/yyyy HH:mm:ss"
      />

      <DateTimePicker
        ampm={true}
        label="Seconds DateTimePicker AM/PM"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
        views={DATE_TIME_VIEWS}
        format="dd/MM/yyyy hh:mm:ss a"
      />
    </Fragment>
  );
}

export default SecondsDateTimePicker;
