import "./App.css";
import React from "react";
import Tabs from "./component/search/tabs/tabs";
import Tab from "./component/search/tabs/tab";
import { useState, useEffect } from "react";
import Inputfield from "./common/inputfield";
import InputDate from "./common/inputdate";
import Inputpassenger from "./common/inputpassenger";
import Searchresult from "./component/searchresult/index";
import Rangeslider from "./component/filter/rangeslider";
import ReactDOM from "react-dom";
import Favourite from "./component/favourite/favourite";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import _ from "lodash";

const App = () => {
  const [inputValues, setInputValues] = useState({
    origin: "",
    destination: "",
    d_Date: "",
    r_Date: "",
    count: "",
  });
  const [Values, setValues] = useState({
    maxValue: 5000,
    minValue: 0,
  });
  const [activetab, setactivcetab] = useState({ oneway: "true" });
  const [formValues, setformValues] = useState({ hits: [] });
  const [formsubmit, setFormsubmit] = useState(false);
  useEffect(() => {}, [activetab, formValues]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const dateChanged = value.split("-").join("/");
    setInputValues({ ...inputValues, [name]: dateChanged });
  };
  const activetabhandler = (btn) => {
    const name = btn;
    setactivcetab({ [name]: "true" });
  };
  const returnenabled = () => {
    const { origin, destination, d_Date, r_Date, count } = inputValues;
    return activetab.oneway
      ? !_.isEmpty(origin) &&
          !_.isEmpty(destination) &&
          !_.isEmpty(d_Date) &&
          !_.isEmpty(count)
      : !_.isEmpty(origin) &&
          !_.isEmpty(destination) &&
          !_.isEmpty(d_Date) &&
          !_.isEmpty(r_Date) &&
          !_.isEmpty(count);
  };
  const handlereturnSubmit = (event) => {
    event.preventDefault();
    setformValues({ ...inputValues });
    setFormsubmit(true);
  };
  const pricechange = (value) => {
    setValues({
      ...Values,
      minValue: value.minValue,
      maxValue: value.maxValue,
    });
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
                className={activetab.oneway ? "active tab" : "tab false"}
                onClick={() => activetabhandler("oneway")}
              >
                Oneway
              </button>
              <button
                className={activetab.ret ? "active tab" : "tab false"}
                onClick={() => activetabhandler("ret")}
              >
                Return
              </button>

              <form onSubmit={handlereturnSubmit} className="returnform">
                <Inputfield
                  name="origin"
                  val={inputValues.origin}
                  placeholder="Enter origin city"
                  handleInputChange={handleInputChange}
                />
                <br />
                <Inputfield
                  name="destination"
                  val={inputValues.destination}
                  handleInputChange={handleInputChange}
                  placeholder="Enter destination city"
                />
                <br />
                <InputDate
                  name="d_Date"
                  placeholder="Departure Date"
                  handleChange={handleChange}
                />
                <br />
                {activetab.ret ? (
                  <InputDate
                    name="r_Date"
                    placeholder="Return Date"
                    handleChange={handleChange}
                  />
                ) : (
                  ""
                )}

                <br />
                <Inputpassenger
                  name="count"
                  handleInputChange={handleInputChange}
                  placeholder="Number of passenger"
                />
                <br />
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
              {formsubmit ? (
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
