import React, { useState, useEffect } from "react";
import iconImg from "../download.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CustomInput = React.forwardRef((props, ref) => {
  return (
    <div className="date-border">
      <label onClick={props.onClick} ref={ref}>
        {props.placeholder}
      </label>
      <input
        className="input-style-date"
        type="text"
        placeholder={props.placeholder}
        onClick={props.onClick}
        value={props.value}
      />
      <img src={iconImg} onClick={props.onClick} alt="calender" />
    </div>
  );
});

const InputDate = (props) => {
  const [startDate, setStartDate] = useState(new Date("2020-11-01"));
  useEffect(() => {}, [startDate]);
  return (
    <DatePicker
      selected={startDate}
      placeholderText={props.placeholder}
      minDate={new Date("2020/11/01")}
      name={props.name}
      onChange={(date) => {
        setStartDate(date);
      }}
      onCalendarClose={() => props.handleChange(props.name, startDate)}
      dateFormat="yyyy/MM/dd"
      customInput={<CustomInput placeholder={props.placeholder} />}
    />
  );
};
export default InputDate;
