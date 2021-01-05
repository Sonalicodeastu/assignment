import React, { useState } from "react";
import iconImg from "../download.png";
import DatePicker from "react-datepicker";
const InputDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  // const openDatepicker = () => _calendar.setOpen(true);
  return (
    // <DatePicker placeholderText="Departure date" />

    <input
      className="input-style-date"
      type="date"
      min="2020-11-1"
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.handleChange}
      required
      pattern="\d{4}-\d{2}-\d{2}"
    />
  );
};
export default InputDate;
