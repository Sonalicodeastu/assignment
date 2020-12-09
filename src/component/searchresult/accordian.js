import { useState } from "react";
import logo from "../../images.png";
import * as moment from "moment";
const Accordion = ({ children, props, sdata }) => {
  const [isOpen, setOpen] = useState(false);
  let d1 = moment(props.data.departureTime);
  let d2 = moment(sdata.arrivalTime);
  var startTime = moment(props.data.departureTime, "hh:mm:ss");
  var endTime = moment(sdata.arrivalTime, "hh:mm:ss");
  var diff = endTime.diff(startTime, "hours");
  var totalMinutes = endTime.diff(startTime, "minutes");
  var clearMinutes = totalMinutes % 60;
  if (diff > 0) {
    return (
      <div className="accordion-wrapper">
        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          <div className="row flex-container">
            <div className="borderbox">
              <img src={logo} height="50px" width="50px" alt="icon" />
            </div>
            <div className="borderbox">
              <div>
                <span>Multiple</span>
              </div>
              <div>
                <a href="#">Show details</a>
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
              <button className="booking">Book</button>
            </div>
          </div>
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
export default Accordion;
