import "./App.css";
import React from "react";
import * as moment from "moment";
import { useState } from "react";
import Select from "react-select";
import InputDate from "./common/inputdate";
import Searchresult from "./component/searchresult/index";
import Rangeslider from "./component/filter/rangeslider";
import Favourite from "./component/favourite/favourite";
import { COUNTPASSENGERS } from "./constants/state";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import _ from "lodash";
let origin = [
  { label: "Pune (PNQ)", value: 1 },
  { label: "Delhi (DEL)", value: 2 },
  { label: "Bengaluru (BLR)", value: 3 },
  { label: "Mumbai (BOM)", value: 4 },
];
let destination = [
  { label: "Pune (PNQ)", value: 1 },
  { label: "Delhi (DEL)", value: 2 },
  { label: "Bengaluru (BLR)", value: 3 },
  { label: "Mumbai (BOM)", value: 4 },
];
let cities = [
  { label: "Pune (PNQ)", value: 1 },
  { label: "Delhi (DEL)", value: 2 },
  { label: "Bengaluru (BLR)", value: 3 },
  { label: "Mumbai (BOM)", value: 4 },
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

  const handleInputChange = (selectedValue, action) => {
    const name = action.name;
    setInputValues({ ...inputValues, [name]: selectedValue.label });
  };
  const handleChange = (name, startDate) => {
    let datef = moment(startDate).format("YYYY/MM/DD");
    setInputValues({ ...inputValues, [name]: datef });
  };
  const activeTabHandler = (btn) => {
    const name = btn;
    setActiveTab({ [name]: "true" });
    setFormSubmit(false);
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
    if (name === "origin") {
      setInputValues({ ...inputValues, [name]: selectedOption.label });
      destination = [...cities];
      let index = destination.findIndex(
        (x) => x.label === selectedOption.label
      );
      destination.splice(index, 1);
    } else {
      setInputValues({ ...inputValues, [name]: selectedOption.label });
      origin = [...cities];
      let index = origin.findIndex((x) => x.label === selectedOption.label);
      origin.splice(index, 1);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h2 className="filter">Flight Search App</h2>
      </div>
      <div className="flex-container-whole">
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
                options={origin}
                onChange={handleselectchange}
              />
              <br />
              <Select
                name="destination"
                options={destination}
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
                <div>
                  <InputDate
                    name="returndate"
                    placeholder="Return Date"
                    handleChange={handleChange}
                  />
                  <br />
                </div>
              ) : (
                ""
              )}

              <Select
                name="count"
                options={COUNTPASSENGERS}
                onChange={handleInputChange}
              />
              <button className="return" disabled={!returnenabled()}>
                Search
              </button>
            </form>
          </div>
          <h4 className="filter">Price Filter</h4>
          <Rangeslider value={pricechange} />
          <NavLink to="/favourite">Favourite</NavLink>
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
      {/* <Favourite /> */}
    </div>
  );
};
export default App;
