import React, { useState } from "react";
import iconImg from "../download.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" placeholder={props.placeholder} />
      <img src={iconImg} onClick={props.onClick} />
    </div>
  );
});

const InputDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  // const openDatepicker = () => _calendar.setOpen(true);
  return (
    <DatePicker
      selected={startDate}
      placeholderText={props.placeholder}
      minDate="2020/11/1"
      name={props.name}
      onChange={props.handleChange}
      dateFormat="yyyy/MM/dd"
      customInput={<CustomInput placeholder={props.placeholder} />}
    />

    // <input
    //   className="input-style-date"
    //   type="date"
    //   min="2020-11-1"
    //   placeholder={props.placeholder}
    //   name={props.name}
    //   onChange={props.handleChange}
    //   required
    //   pattern="\d{4}-\d{2}-\d{2}"
    // />
  );
};
export default InputDate;
const CustomDatePickDiv = styled.div`
  background-color: white;
  border: solid 0.1em #cbd4c9;
  border-radius: 0.25em;
  padding: 0.3em 1.6em 0 1.6em;
`;
