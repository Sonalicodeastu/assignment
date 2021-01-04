import { useState } from "react";
import * as moment from "moment";
const Favaccordion = ({ children, props, secondflightdata }) => {
  const [isOpen, setOpen] = useState(false);
  // let departuretime = moment(props.data.departureTime);
  // let arrivalTime = moment(secondflightdata.arrivalTime);
  let startTime = moment(props.data.departureTime, "hh:mm:ss");
  let endTime = moment(secondflightdata.arrivalTime, "hh:mm:ss");
  const diff = endTime.diff(startTime, "hours");
  let totalMinutes = endTime.diff(startTime, "minutes");
  let clearMinutes = totalMinutes % 60;
  const clear = () => {
    sessionStorage.clear();
  };
  return (
    <div>
      {diff ? (
        <div className="accordion-wrapper">
          <div className={`accordion-title ${isOpen ? "open" : ""}`}>
            <div className="row flex-container">
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
                <div>{secondflightdata.arrivalTime}</div>
                <div>{secondflightdata.destination}</div>
              </div>
              <div className="borderbox">
                <div>
                  {diff} hr {clearMinutes} min
                </div>
                <div>total Duration</div>
              </div>
              <div className="borderbox">
                <strong>Rs.{props.data.price + secondflightdata.price}</strong>
              </div>
              <div className="borderbox">
                <button className="booking" onClick={clear}>
                  clear
                </button>
              </div>
            </div>
          </div>
          <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
            <div className="accordion-content">{children}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Favaccordion;
