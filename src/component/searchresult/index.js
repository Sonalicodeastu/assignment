import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import * as moment from "moment";
import Flightrow from "../../common/flightrow";
import Multirow from "../../common/multirow";

const Searchresult = (props) => {
  const [data, setData] = useState({ hits: [] });
  const [multidata, setmultiData] = useState({ hits: [] });
  const [firstflight, setfirstmultiData] = useState({ hits: [] });
  const [secondflight, setsecondmultiData] = useState({ hits: [] });
  const [returnflight, setreturnData] = useState({ hits: [] });
  const [dreturnflight, setdirectreturnData] = useState({ hits: [] });
  const [freturnflight, setfirstreturnData] = useState({ hits: [] });
  const [sreturnflight, setsecondreturnData] = useState({ hits: [] });
  let flightlength = [];
  let returnflightlength = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://tw-frontenders.firebaseio.com/advFlightSearch.json"
      );
      let res = {};
      let multiresult = {};
      let multires = {};
      let first_m = {};
      let second_m = {};
      let returnall = {};
      let directreturn = {};
      let firstreturn = {};
      let secondreturn = {};
      multiresult = result.data.filter(
        (flight) =>
          flight.destination.toLowerCase() ===
            props.data.destination.toLowerCase() ||
          flight.origin.toLowerCase() === props.data.origin.toLowerCase()
      ); //direct indirect all
      res = multiresult.filter(
        (flight) =>
          flight.destination.toLowerCase() ===
            props.data.destination.toLowerCase() &&
          flight.origin.toLowerCase() === props.data.origin.toLowerCase() &&
          flight.date === props.data.departuredate &&
          flight.price <= props.filtervalues.maxValue &&
          flight.price >= props.filtervalues.minValue
      ); //direct flights
      multires = multiresult.filter(
        (flight) =>
          flight.destination.toLowerCase() ===
            props.data.destination.toLowerCase() ||
          (flight.origin.toLowerCase() === props.data.origin.toLowerCase() &&
            flight.date === props.data.departuredate)
      ); //all indirect
      first_m = multires.filter(
        (flight) =>
          flight.origin.toLowerCase() === props.data.origin.toLowerCase() &&
          flight.destination !== props.data.destination
      ); //first of multiflight
      second_m = multires.filter(
        (flight) =>
          flight.origin.toLowerCase() !== props.data.origin.toLowerCase() &&
          flight.destination.toLowerCase() ===
            props.data.destination.toLowerCase()
      ); //second of multiflight
      setData(res);
      setmultiData(multires);
      setfirstmultiData(first_m);
      setsecondmultiData(second_m);
      returnall = result.data.filter(
        (flight) =>
          flight.destination.toLowerCase() ===
            props.data.origin.toLowerCase() ||
          (flight.origin.toLowerCase() ===
            props.data.destination.toLowerCase() &&
            flight.date === props.data.returndate)
      ); //direct indirect all
      setreturnData(returnall);
      directreturn = returnall.filter(
        (flight) =>
          flight.destination.toLowerCase() ===
            props.data.origin.toLowerCase() &&
          flight.origin.toLowerCase() ===
            props.data.destination.toLowerCase() &&
          flight.date === props.data.returndate &&
          flight.price <= props.filtervalues.maxValue &&
          flight.price >= props.filtervalues.minValue
      ); //direct flights
      setdirectreturnData(directreturn);
      firstreturn = returnall.filter(
        (flight) =>
          flight.origin.toLowerCase() ===
            props.data.destination.toLowerCase() &&
          flight.destination !== props.data.origin
      ); //first of multiflight return
      setfirstreturnData(firstreturn);
      secondreturn = returnall.filter(
        (flight) =>
          flight.origin.toLowerCase() !==
            props.data.destination.toLowerCase() &&
          flight.destination.toLowerCase() === props.data.origin.toLowerCase()
      ); //second of multiflight return
      setsecondreturnData(secondreturn);
    };

    fetchData();
  }, [
    props.data.destination,
    props.data.origin,
    props.data.departuredate,
    props.data.returndate,
    props.filtervalues.maxValue,
    props.filtervalues.minValue,
  ]);
  const renderflights = () => {
    return _.map(data, (plane) => {
      return <Flightrow key={plane.flightNo + plane.origin} data={plane} />;
    });
  };
  const renderreturnflights = () => {
    return _.map(dreturnflight, (plane) => {
      return <Flightrow key={plane.flightNo + plane.origin} data={plane} />;
    });
  };

  const rendermultiflights = () => {
    let secondf;
    let multitotal;
    let startTime;
    let endTime;
    let diff;
    let multilength = [];

    return _.map(firstflight, (plane) => {
      secondf = _.find(secondflight, function (obj) {
        multitotal = obj.price + plane.price;
        startTime = moment(plane.departureTime, "hh:mm:ss");
        endTime = moment(obj.arrivalTime, "hh:mm:ss");
        diff = endTime.diff(startTime, "hours");
        return obj.origin === plane.destination;
      });

      if (
        multitotal <= props.filtervalues.maxValue &&
        multitotal >= props.filtervalues.minValue &&
        diff > 0
      ) {
        multilength.push({ ...secondf, key: plane.flightNo + plane.origin });
        flightlength = Array.from(new Set(multilength.map((a) => a.key))).map(
          (id) => {
            return multilength.find((a) => a.key === id);
          }
        );
        return (
          <Multirow
            key={plane.flightNo + "flight" + plane.origin}
            data={plane}
            sdata={secondf}
          />
        );
      }
    });
  };
  const renderreturnmultiflights = () => {
    let secondf, multitotal;
    let startTime;
    let endTime;
    let diff;
    let multilength = [];
    return _.map(freturnflight, (plane) => {
      secondf = _.find(sreturnflight, function (obj) {
        multitotal = obj.price + plane.price;
        startTime = moment(plane.departureTime, "hh:mm:ss");
        endTime = moment(obj.arrivalTime, "hh:mm:ss");
        diff = endTime.diff(startTime, "hours");
        return obj.origin === plane.destination;
      });
      if (
        multitotal <= props.filtervalues.maxValue &&
        multitotal >= props.filtervalues.minValue &&
        diff > 0
      ) {
        multilength.push({ ...secondf, key: plane.flightNo + plane.origin });
        returnflightlength = Array.from(
          new Set(multilength.map((a) => a.key))
        ).map((id) => {
          return multilength.find((a) => a.key === id);
        });
        return (
          <Multirow
            key={plane.flightNo + "flight" + plane.origin}
            data={plane}
            sdata={secondf}
          />
        );
      }
    });
  };
  return (
    <div>
      <div>
        <div class="resultcontent">
          <div className="left">
            <div className="result-header">
              <h3>
                {props.data.origin} {props.data.origin ? "to" : ""}{" "}
                {props.data.destination}
              </h3>
              <br />
              <h5>
                {data.length
                  ? data.length + flightlength.length + " flights found for "
                  : ""}
                {props.data.departuredate ? props.data.departuredate : ""}
              </h5>
            </div>
            <div className={props.data.returndate ? "content-divide" : ""}>
              <ul className="list-group flightrow">{renderflights()}</ul>
              <ul className="list-group flightrow">{rendermultiflights()}</ul>
            </div>
          </div>
          {props.data.returndate ? (
            <div className="right">
              <div className="result-header">
                <h3>
                  {props.data.destination} {props.data.destination ? "to" : ""}
                  {props.data.origin}
                </h3>
                <br />
                <h5>
                  {returnflight.length
                    ? dreturnflight.length +
                      returnflightlength.length +
                      " flights found for "
                    : ""}
                  {props.data.returndate ? props.data.returndate : ""}
                </h5>
              </div>
              <div className="content-divide">
                <ul className="list-group flightrow">
                  {renderreturnflights()}
                </ul>
                <ul className="list-group flightrow">
                  {renderreturnmultiflights()}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Searchresult;
