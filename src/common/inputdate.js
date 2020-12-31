import * as moment from "moment";
const InputDate = (props) => {
  let todaydate = new Date();
  let today = moment(todaydate).format("YYYY-MM-DD");
  return (
    <input
      className="input-style-date"
      type="date"
      min={today}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.handleChange}
      required
      pattern="\d{4}-\d{2}-\d{2}"
    />
  );
};
export default InputDate;
