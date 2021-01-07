import _ from "lodash";
import { Component } from "react";
import { useState, useEffect } from "react";
import Favdirectrow from "../../common/favdirectrow";
import Favmulti from "../../common/favmulti";
import { Link } from "react-router-dom";
let data;
const Favourite = () => {
  useEffect(() => {}, [data]);
  const renderfavflights = () => {
    data = JSON.parse(sessionStorage.getItem("directFourite"));
    return _.map(data, (plane) => {
      return (
        <Favdirectrow
          key={plane.data.flightNo + plane.data.origin}
          data={plane.data}
        />
      );
    });
  };
  const renderfavmultiflights = () => {
    let multi = JSON.parse(window.sessionStorage.getItem("favourite"));
    return _.map(multi, (plane) => {
      return (
        <Favmulti
          key={plane.flightNo + plane.origin}
          data={plane.data}
          sdata={plane.sdata}
        />
      );
    });
  };
  return (
    <div>
      <h4 className="filter">Favourite list</h4>
      <div class="resultcontent">
        <ul className="list-group flightrow">{renderfavflights()}</ul>
        <ul className="list-group flightrow">{renderfavmultiflights()}</ul>
      </div>
    </div>
  );
};
export default Favourite;
