import logo from "../images.png";
const Multisingle = (props) => {
  return (
    <div>
      <div className="border row flex-container">
        <div>
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
