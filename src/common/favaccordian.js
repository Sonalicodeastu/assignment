import { useState } from "react";
import * as moment from "moment";
const Favaccordion = ({ children, props, sdata }) => {
  const [isOpen, setOpen] = useState(false);
  console.log(sdata);
  let startTime = moment(props.data.departureTime, "hh:mm:ss");
  let endTime = moment(sdata.arrivalTime, "hh:mm:ss");
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
                  <span onClick={() => setOpen(!isOpen)}>Show details</span>
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
              <div className="borderbox">
                <div>
                  {diff} hr {clearMinutes} min
                </div>
                <div>total Duration</div>
              </div>
              <div className="borderbox">
                <strong>Rs.{props.data.price + sdata.price}</strong>
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
