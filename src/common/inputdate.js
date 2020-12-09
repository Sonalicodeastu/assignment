import "react-datepicker/dist/react-datepicker.css";
const InputDate=(props)=> {
    return (
     <input className="input-style" type="date" placeholder={props.placeholder} name={props.name} onChange={props.handleChange} required pattern="\d{4}-\d{2}-\d{2}"/>
    );
  }
  export default InputDate;