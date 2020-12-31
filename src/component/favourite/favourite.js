import _ from "lodash";
import { Component } from "react";
import Favdirectrow from "../../common/favdirectrow";
import Favmulti from "../../common/favmulti";
import { Link } from "react-router-dom";
class Favourite extends Component {
  render() {
    const renderfavflights = () => {
      let data = JSON.parse(sessionStorage.getItem("dfav"));
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
      let multi = JSON.parse(window.sessionStorage.getItem("fav"));
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
  }
}
export default Favourite;
