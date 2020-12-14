import { useState } from "react";
import * as moment from "moment";
const Favaccordion = ({ children, props, sdata }) => {
  const [isOpen, setOpen] = useState(false);
  let d1 = moment(props.data.departureTime);
  let d2 = moment(sdata.arrivalTime);
  var startTime = moment(props.data.departureTime, "hh:mm:ss");
  var endTime = moment(sdata.arrivalTime, "hh:mm:ss");
  var diff = endTime.diff(startTime, "hours");
  var totalMinutes = endTime.diff(startTime, "minutes");
  var clearMinutes = totalMinutes % 60;
  const addtofavourite = () => {
    var newArray = JSON.parse(sessionStorage.getItem("fav"));
    //var newArray = [sessionStorage.getItem("fav")];
    newArray = newArray ? newArray : [];
    //console.log(newArray);
    newArray = [...newArray, props];
    sessionStorage.setItem("fav", JSON.stringify(newArray));
    console.log(JSON.parse(sessionStorage.getItem("fav")));
  };
  const clear = () => {
    sessionStorage.clear();
  };
  if (diff > 0) {
    return (
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
    );
  }
  return <div></div>;
};
export default Favaccordion;
