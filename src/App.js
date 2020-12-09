
import './App.css';
import React from 'react';
import Tabs from './component/search/tabs/tabs';
import Tab from './component/search/tabs/tab';
import { useState } from "react";
import Inputfield from './common/inputfield';
import InputDate from './common/inputdate';
import Inputpassenger from './common/inputpassenger';
import Searchresult from './component/searchresult/index';
import Rangeslider from './component/filter/rangeslider';
const App=()=> {
  const [inputValues, setInputValues] = useState({
    Origin: '',
    Destination: '', 
    D_Date: '', 
    R_Date: '', 
    count:''
    });
    const [Values, setValues] = useState({
      maxValue:10000,
      minValue:0
    });
    const [formValues, setformValues] = useState({
      submit:false
    });
  const handleInputChange = event => {
    const { name, value } = event.target;
       console.log(value);
       setInputValues({ ...inputValues, [name]:value });
       console.log(value);
       console.log(inputValues);
    };
  const  handleChange = (event) => {
    const { name, value } = event.target;
      console.log('value: ', value);
      const dateChanged= value.split("-").join("/");
      setInputValues({ ...inputValues, [name]:dateChanged });
      console.log(dateChanged);
      console.log(inputValues);
    };
    const handleSubmit=()=>{
      setformValues({ submit:true ,...inputValues});
      console.log(formValues); 
    }
   const pricechange = (value) => {
    setValues({ ...Values, minValue:value.minValue,maxValue:value.maxValue });
    };
  return (
    <div className="App">
      <div className="header" >
          <h3>Flight Search App</h3> 
          </div>
        <div className="flex-container">
         <aside className="search-sidebar">
         <div className="tabs">
       <Tabs>
         <Tab label="Oneway">
         <form onSubmit={handleSubmit} className="oneway">
        <Inputfield
        name="Origin"
        val={inputValues.Origin}
        placeholder="Enter origin city"
        handleInputChange={handleInputChange}
        /><br/>
        <Inputfield 
         name="Destination"
         val={inputValues.Destination}
         placeholder="Enter destination city"
         handleInputChange={handleInputChange}
         /><br/>
        <InputDate name="D_Date"
         placeholder="Departure Date" 
         handleChange={handleChange}/><br/>
        <Inputpassenger name="count" 
        placeholder="Number of passenger" 
        handleInputChange={handleInputChange} /><br/>
        </form>
         </Tab>
         <Tab label="Returnform">
         <form onSubmit={handleSubmit} className="returnform">
        <Inputfield 
        name="Origin"
        val={inputValues.Origin}
        placeholder="Enter origin city"
        handleInputChange={handleInputChange}
        /><br/>
        <Inputfield
        name="Destination"
        val={inputValues.Destination}
        handleInputChange={handleInputChange}
         placeholder="Enter destination city"
         /><br/>
        <InputDate 
        name="D_Date"
        placeholder="Departure Date"
        handleChange={handleChange}
        /><br/>
        <InputDate
        name="R_Date"
         placeholder="Return Date"
         handleChange={handleChange}
        /><br/>
        <Inputpassenger
        placeholder="Number of passenger"
        /><br/>
        </form>
         </Tab>
       </Tabs>
      </div>
        <Rangeslider value={pricechange}/>
         </aside>
          <div className="content">
          <div><Searchresult data={ inputValues} filtervalues={Values}/></div>
          </div>
        </div>
    </div>
  );
}
export default App;
