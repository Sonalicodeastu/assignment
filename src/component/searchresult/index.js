import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from "lodash";
import Flightrow from '../../common/flightrow';
function Searchresult() {
    const [data, setData] = useState({ hits: [] });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://tw-frontenders.firebaseio.com/advFlightSearch.json',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);
 const flights=()=> {
   console.log(data);
    return _.map(data, (plane) => {
      return (
        <Flightrow key={plane.flightNo} data={plane}/>
         
      );
    });
  }


    return (<div>
        <div className="result-header">
        <h3>Pune(PNQ) to Delhi(DL)</h3>
        <h5>10 flights found Wednesday 30 October</h5>
        </div>
        <ul className="list-group">{flights()}</ul>
        </div>
      );
  }
  export default Searchresult;