 import { Hint } from 'react-autocomplete-hint';
const inputfield=({
    val,
    name,
    placeholder,
    handleInputBlur,
    handleInputChange,
  })=>{
    return (
      <Hint options={["Pune (PNQ)", "Delhi (DEL)", "Bengaluru (BLR)", "Mumbai (BOM)"]}>
        <input
        className="input-style"
        name={name}
        id={name}
        value={val}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputBlur}/>
        </Hint>
      );
  }
  export default inputfield;