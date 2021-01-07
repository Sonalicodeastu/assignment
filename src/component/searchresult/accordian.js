import { useState } from "react";

import logo from "../../flight.png";
import * as moment from "moment";
const Accordion = ({ children, props, sdata }) => {
  const [isOpen, setOpen] = useState(false);
  let startTime = moment(props.data.departureTime, "hh:mm:ss");
  let endTimefirstflight = moment(props.data.arrivalTime, "hh:mm:ss");
  let startTimesecondflight = moment(sdata.departureTime, "hh:mm:ss");
  let endTime = moment(sdata.arrivalTime, "hh:mm:ss");
  let layovertime = endTimefirstflight.diff(startTimesecondflight, "hours");
  let diff = endTime.diff(startTime, "hours");
  let totalMinutes = endTime.diff(startTime, "minutes");
  let clearMinutes = totalMinutes % 60;
  const addtofavourite = () => {
    let newArray = JSON.parse(sessionStorage.getItem("fav"));
    newArray = newArray ? newArray : [];
    newArray = [...newArray, props];
    sessionStorage.setItem("fav", JSON.stringify(newArray));
  };
  const clear = () => {
    sessionStorage.clear();
  };
  return (
    <div className="flightrow flex-container">
      {/* //{diff > 0 ? ( */}
      <div className="accordion-wrapper">
        <div className={`accordion-title ${isOpen ? "open" : ""}`}>
          <div className="flightrow flex-container row-border">
            <div className="first-row">
              <div className="borderbox">
                <img
                  className="flight"
                  src={logo}
                  alt="flight"
                  height="60px"
                  width="60px"
                />
              </div>
              <div className="borderbox">
                <div>
                  <span>Multiple</span>
                </div>
                <div>
                  <a href="#" onClick={() => setOpen(!isOpen)}>
                    Show details
                  </a>
                </div>
              </div>
              <div className="borderbox">
                <div>{props.data.departureTime}</div>
                <div>{props.data.origin}</div>
              </div>
              <div className="borderbox">
                <div>{sdata.arrivalTime}</div>
                <div>{sdata.destination}</div>
              </div>
            </div>
            <div className="first-row">
              <div className="borderbox">
                <div className="duration">
                  {diff} hr {clearMinutes} min
                </div>
                <div>total Duration</div>
              </div>
              <div className="borderbox price">
                <strong>Rs.{props.data.price + sdata.price}</strong>
              </div>
              <div className="borderbox">
                <button className="favourite" onClick={addtofavourite}>
                  Favourite
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div className="accordion-content">{children}</div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};
export default Accordion;
