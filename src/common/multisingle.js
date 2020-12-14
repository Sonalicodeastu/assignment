import logo from "../images.png";
const Multisingle = (props) => {
  return (
    <div>
      <div className="border row flex-container">
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
            {parseInt(props.flight.arrivalTime) -
              parseInt(props.flight.departureTime)}
            hrs
          </div>
          <div>total Duration</div>
        </div>
      </div>
    </div>
  );
};
export default Multisingle;
