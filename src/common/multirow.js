import Accordion from "../component/searchresult/accordian";
import Multisingle from "../common/multisingle";
import * as moment from "moment";
const Multirow = (props) => {
  let endTimefirstflight = moment(props.data.arrivalTime, "hh:mm:ss");
  let startTimesecondflight = moment(props.sdata.departureTime, "hh:mm:ss");
  let layovertime = startTimesecondflight.diff(endTimefirstflight, "hours");
  var mins = moment
    .utc(
      moment(endTimefirstflight, "HH:mm:ss").diff(
        moment(startTimesecondflight, "HH:mm:ss")
      )
    )
    .format("mm");
  return (
    <Accordion props={props} sdata={props.sdata}>
      <Multisingle flight={props.data} firstflight={true} />
      <div className="layover">
        <span className="layover-text">
          Layover Time {layovertime} hours {60 - mins} minutes
        </span>
      </div>
      <Multisingle flight={props.sdata} />
    </Accordion>
  );
};
export default Multirow;
