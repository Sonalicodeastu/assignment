import logo from '../images.png';
const Flightrow=(props)=>{
    return (
        <div className="row flex-container">
        <div className="row-border">
        <div className="borderbox">
         <img src={logo} height='50px' width='50px' alt="icon" />
         </div>
        <div className="borderbox">
            <div>
                {props.data.name}
            </div>
            <div>
            {props.data.flightNo}
            </div>
        </div>
        <div className="borderbox">
            <div>
            {props.data.departureTime}
            </div>
            <div>
            {props.data.origin}
            </div>
        </div>
        <div className="borderbox">
            <div>
            {props.data.arrivalTime}
            </div>
            <div>
            {props.data.destination}
            </div>
        </div>
        <div className="borderbox">
            <div>
            {parseInt(props.data.arrivalTime)-parseInt(props.data.departureTime)}hrs
            </div>
            <div>
                nonstop
            </div>
        </div>
        <div className="borderbox"><strong>Rs.{props.data.price}</strong></div>
        <div className="borderbox"><button className="booking">Book</button></div>
        </div>
        </div>
      );
  }
  export default Flightrow;