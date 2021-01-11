import * as moment from "moment";
const Multisingle = (props) => {
  let endTimefirstflight = moment(props.flight.arrivalTime, "hh:mm:ss");
  let startTimesecondflight = moment(props.flight.departureTime, "hh:mm:ss");
  let layovertime = endTimefirstflight.diff(startTimesecondflight, "hours");
  var mins = moment
    .utc(
      moment(endTimefirstflight, "HH:mm:ss").diff(
        moment(startTimesecondflight, "HH:mm:ss")
      )
    )
    .format("mm");

  return (
    <div className={props.firstflight ? "first-multi" : ""}>
      <div className="flex-container">
        <div className="borderbox">
          <div>
            <span>{props.flight.name}</span>
          </div>
          <div>
            <span>{props.flight.flightNo}</span>
          </div>
        </div>
        <div className="borderbox">
          <div>{props.flight.departureTime}</div>
          <div>{props.flight.origin}</div>
        </div>
        <div className="borderbox">
          <div>{props.flight.arrivalTime}</div>
          <div>{props.flight.destination}</div>
        </div>
        <div className="borderbox">
          <div>
            {/* {parseInt(props.flight.arrivalTime) -
              parseInt(props.flight.departureTime)} */}
            Time {layovertime} hours {60 - mins === 60 ? 0 : 60 - mins} minutes
          </div>
          <div>total Duration</div>
        </div>
      </div>
    </div>
  );
};
export default Multisingle;
