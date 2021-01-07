import React, { useState, useEffect } from "react";
import iconImg from "../download.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
      <img src={iconImg} onClick={props.onClick} />
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
const CustomDatePickDiv = styled.div`
  background-color: white;
  border: solid 0.1em #cbd4c9;
  border-radius: 0.25em;
  padding: 0.3em 1.6em 0 1.6em;
`;
