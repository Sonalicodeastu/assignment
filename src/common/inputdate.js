import * as moment from "moment";
const InputDate = (props) => {
  return (
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
