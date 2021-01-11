import { useState } from "react";
import logo from "../flight.png";
import * as moment from "moment";
const Flightrow = (props) => {
  const [favouriteState, setFavouriteState] = useState(false);
  console.log(props);
  let startFlight = moment(props.data.arrivalTime, "hh:mm:ss");
  let endFlight = moment(props.data.departureTime, "hh:mm:ss");
  let time = startFlight.diff(endFlight, "hours");
  var mins = moment
    .utc(moment(endFlight, "HH:mm:ss").diff(moment(startFlight, "HH:mm:ss")))
    .format("mm");

  const favourite = () => {
    let newArray = JSON.parse(sessionStorage.getItem("directfavourite"));
    newArray = newArray ? newArray : [];
    newArray = [...newArray, props];
    sessionStorage.setItem("directfavourite", JSON.stringify(newArray));
    setFavouriteState(true);
  };
  const returnenabled = () => {
    return favouriteState;
  };
  return (
    <div className="flightrow flex-container">
      <div className="row-border">
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
            <div>{props.data.name}</div>
            <div>{props.data.flightNo}</div>
          </div>
          <div className="borderbox">
            <div>{props.data.departureTime}</div>
            <div>{props.data.origin}</div>
          </div>
          <div className="borderbox">
            <div>{props.data.arrivalTime}</div>
            <div>{props.data.destination}</div>
          </div>
        </div>
        <div className="first-row">
          <div className="borderbox">
            <div>
              {time} hrs {60 - mins === 60 ? 0 : 60 - mins} minutes
            </div>
            <div>nonstop</div>
          </div>
          <div className="borderbox price">
            <strong>Rs.{props.data.price}</strong>
          </div>
          <div className="borderbox">
            <button
              className="favourite"
              onClick={favourite}
              disabled={returnenabled()}
            >
              Favourite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Flightrow;
