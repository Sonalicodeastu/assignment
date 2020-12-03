import logo from '../images.png';
function Flightrow(props) {
    return (
        <div className="row flex-container">
        <div className="border">
         <img src={logo} height='100px' width='100px' alt="icon" />
         </div>
        <div className="border">
            <div>
                {props.data.name}
            </div>
            <div>
            {props.data.flightNo}
            </div>
        </div>
        <div className="border">
            <div>
            {props.data.departureTime}
            </div>
            <div>
            {props.data.origin}
            </div>
        </div>
        <div className="border">
            <div>
            {props.data.arrivalTime}
            </div>
            <div>
            {props.data.destination}
            </div>
        </div>
        <div className="border">
            <div>
                interval
            </div>
            <div>
                nonstop
            </div>
        </div>
        <div className="border"><strong>Rs.{props.data.price}</strong></div>
        <div className="border"><button>Book</button></div>
        </div>
      );
  }
  export default Flightrow;