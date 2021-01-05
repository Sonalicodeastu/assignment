import "./App.css";
import React from "react";

import { useState } from "react";
import Select from "react-select";
//import "bootstrap/dist/css/bootstrap.min.css";
import InputDate from "./common/inputdate";
import Inputpassenger from "./common/inputpassenger";
import Searchresult from "./component/searchresult/index";
import Rangeslider from "./component/filter/rangeslider";
import Favourite from "./component/favourite/favourite";
import { BrowserRouter as Router } from "react-router-dom";
import _ from "lodash";
const cities = [
  { label: "Pune (PNQ)", value: 1 },
  { label: "Delhi (DEL)", value: 2 },
  { label: "Bengaluru (BLR)", value: 3 },
  { label: "Mumbai (BOM)", value: 4 },
];
const countpassengers = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];
const App = () => {
  const [inputValues, setInputValues] = useState({
    origin: "",
    destination: "",
    departuredate: "",
    returndate: "",
    count: "",
  });
  const [Values, setValues] = useState({
    maxValue: 5000,
    minValue: 0,
  });
  const [activeTab, setActiveTab] = useState({ oneway: "true" });
  const [formValues, setformValues] = useState();
  const [formSubmit, setFormSubmit] = useState(false);
  const [destinationcities, setDestinationCities] = useState();
  const handleInputChange = (selectedValue, action) => {
    const name = action.name;
    // const { name } = action.name;
    setInputValues({ ...inputValues, [name]: selectedValue.label });
    console.log(inputValues);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const dateChanged = value.split("-").join("/");
    setInputValues({ ...inputValues, [name]: dateChanged });
  };
  const activeTabHandler = (btn) => {
    const name = btn;
    setActiveTab({ [name]: "true" });
  };
  const returnenabled = () => {
    const {
      origin,
      destination,
      departuredate,
      returndate,
      count,
    } = inputValues;
    const oneway =
      !_.isEmpty(origin) &&
      !_.isEmpty(destination) &&
      !_.isEmpty(departuredate) &&
      !_.isEmpty(count);
    return activeTab.oneway ? oneway : oneway && !_.isEmpty(returndate);
  };
  const handlereturnSubmit = (event) => {
    event.preventDefault();
    setformValues({ ...inputValues });
    setFormSubmit(true);
  };
  const pricechange = (value) => {
    setValues({
      ...Values,
      minValue: value.minValue,
      maxValue: value.maxValue,
    });
  };
  const handleselectchange = (selectedOption, action) => {
    const name = action.name;
    setInputValues({ ...inputValues, [name]: selectedOption.label });
    setDestinationCities({ ...cities });
    let index = cities.indexOf(selectedOption);
    cities.splice(index, 1);
  };
  return (
    <Router>
      <div className="App">
        <div className="header">
          <h2 className="filter">Flight Search App</h2>
        </div>
        <div className="flex-container">
          <aside className="search-sidebar">
            <div className="tabs">
              <button
                className={activeTab.oneway ? "active tab" : "tab false"}
                onClick={() => activeTabHandler("oneway")}
              >
                Oneway
              </button>
              <button
                className={activeTab.return ? "active tab" : "tab false"}
                onClick={() => activeTabHandler("return")}
              >
                Return
              </button>
              <form onSubmit={handlereturnSubmit} className="returnform">
                <Select
                  name="origin"
                  options={cities}
                  onChange={handleselectchange}
                />
                <br />
                <Select
                  name="destination"
                  options={cities}
                  onChange={handleselectchange}
                />
                <br />
                <InputDate
                  name="departuredate"
                  placeholder="Departure Date"
                  handleChange={handleChange}
                />
                <br />
                {activeTab.return ? (
                  <InputDate
                    name="returndate"
                    placeholder="Return Date"
                    handleChange={handleChange}
                  />
                ) : (
                  ""
                )}
                <br />
                <Select
                  name="count"
                  options={countpassengers}
                  onChange={handleInputChange}
                />
                <button className="return" disabled={!returnenabled()}>
                  Search
                </button>
              </form>
            </div>
            <h4 className="filter">Price Filter</h4>
            <Rangeslider value={pricechange} />
          </aside>
          <div className="content">
            <div>
              {formSubmit ? (
                <Searchresult data={formValues} filtervalues={Values} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Favourite />
      </div>
    </Router>
  );
};
export default App;
