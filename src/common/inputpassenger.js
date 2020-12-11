const Inputpassenger=({
    name,
    placeholder,
    handleInputBlur,
    handleInputChange,
  })=>{
    return (
        <div>
        <input type="number" 
        className="input-style"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputBlur}/>
        </div>
      );
  }
  export default Inputpassenger;