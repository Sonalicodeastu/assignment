import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
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
      console.log(props);
      multiresult = result.data.filter(
        (v) =>
          v.destination.toLowerCase() ===
            props.data.destination.toLowerCase() ||
          v.origin.toLowerCase() === props.data.origin.toLowerCase()
      ); //direct indirect all
      res = multiresult.filter(
        (v) =>
          v.destination.toLowerCase() ===
            props.data.destination.toLowerCase() &&
          v.origin.toLowerCase() === props.data.origin.toLowerCase() &&
          v.date === props.data.d_Date &&
          v.price <= props.filtervalues.maxValue &&
          v.price >= props.filtervalues.minValue
      ); //direct flights
      multires = multiresult.filter(
        (v) =>
          v.destination.toLowerCase() ===
            props.data.destination.toLowerCase() ||
          (v.origin.toLowerCase() === props.data.origin.toLowerCase() &&
            v.date === props.data.d_Date)
      ); //all indirect
      first_m = multires.filter(
        (v) =>
          v.origin.toLowerCase() === props.data.origin.toLowerCase() &&
          v.destination !== props.data.destination
      ); //first of multiflight
      second_m = multires.filter(
        (v) =>
          v.origin.toLowerCase() !== props.data.origin.toLowerCase() &&
          v.destination.toLowerCase() === props.data.destination.toLowerCase()
      ); //second of multiflight
      setData(res);
      setmultiData(multires);
      setfirstmultiData(first_m);
      setsecondmultiData(second_m);
      returnall = result.data.filter(
        (v) =>
          v.destination.toLowerCase() === props.data.origin.toLowerCase() ||
          (v.origin.toLowerCase() === props.data.destination.toLowerCase() &&
            v.date === props.data.R_Date)
      ); //direct indirect all
      setreturnData(returnall);
      directreturn = returnall.filter(
        (v) =>
          v.destination.toLowerCase() === props.data.origin.toLowerCase() &&
          v.origin.toLowerCase() === props.data.destination.toLowerCase() &&
          v.date === props.data.r_Date &&
          v.price <= props.filtervalues.maxValue &&
          v.price >= props.filtervalues.minValue
      ); //direct flights
      setdirectreturnData(directreturn);
      firstreturn = returnall.filter(
        (v) =>
          v.origin.toLowerCase() === props.data.destination.toLowerCase() &&
          v.destination !== props.data.origin
      ); //first of multiflight return
      setfirstreturnData(firstreturn);
      secondreturn = returnall.filter(
        (v) =>
          v.origin.toLowerCase() !== props.data.destination.toLowerCase() &&
          v.destination.toLowerCase() === props.data.origin.toLowerCase()
      ); //second of multiflight return
      setsecondreturnData(secondreturn);
    };
    fetchData();
  }, [
    props.data.destination,
    props.data.origin,
    props.data.d_Date,
    props.data.r_Date,
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
    return _.map(firstflight, (plane) => {
      secondf = _.find(secondflight, function (obj) {
        multitotal = obj.price + plane.price;
        return obj.origin === plane.destination;
      });
      if (
        multitotal <= props.filtervalues.maxValue &&
        multitotal >= props.filtervalues.minValue
      ) {
        return (
          <Multirow
            key={plane.flightNo + plane.origin}
            data={plane}
            sdata={secondf}
          />
        );
      }
    });
  };
  const renderreturnmultiflights = () => {
    let secondf, multitotal;
    return _.map(freturnflight, (plane) => {
      secondf = _.find(sreturnflight, function (obj) {
        multitotal = obj.price + plane.price;
        return obj.origin === plane.destination;
      });
      if (
        multitotal <= props.filtervalues.maxValue &&
        multitotal >= props.filtervalues.minValue
      ) {
        return (
          <Multirow
            key={plane.flightNo + plane.origin}
            data={plane}
            sdata={secondf}
          />
        );
      }
    });
  };
  return (
    <div>
      <div className="result-header">
        <div className="left">
          <h3>
            {props.data.origin} {props.data.origin ? "to" : ""}{" "}
            {props.data.destination}
          </h3>
          <h5>
            {data.length ? "flights found" : ""}{" "}
            {props.data.d_Date ? props.data.d_Date : ""}
          </h5>
        </div>
        {props.data.r_Date ? (
          <div className="right">
            <h3>
              {props.data.destination} {props.data.destination ? "to" : ""}{" "}
              {props.data.origin}
            </h3>
            <h5>
              {returnflight.length ? "flights found" : ""}{" "}
              {props.data.r_Date ? props.data.r_Date : ""}
            </h5>
          </div>
        ) : (
          ""
        )}
      </div>
      <div class="resultcontent">
        <div className={props.data.r_Date ? "content-divide" : ""}>
          <ul className="list-group flightrow">{renderflights()}</ul>
          <ul className="list-group flightrow">{rendermultiflights()}</ul>
        </div>
        {props.data.r_Date ? (
          <div className="content-divide">
            <ul className="list-group flightrow">{renderreturnflights()}</ul>
            <ul className="list-group flightrow">
              {renderreturnmultiflights()}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Searchresult;
