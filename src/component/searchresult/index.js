import{ useState, useEffect } from 'react';
import axios from 'axios';
import _ from "lodash";
import Flightrow from '../../common/flightrow';
import Multirow from '../../common/multirow';
const Searchresult=(props)=>{
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
        'https://tw-frontenders.firebaseio.com/advFlightSearch.json',
      );
      let res={};
      let multiresult={};
      let multires={};
      let first_m={};
      let second_m={};
      let returnall={};
      let directreturn={};
      let firstreturn={};
      let secondreturn={};
     multiresult =result.data.filter(v => v.destination.toLowerCase() === props.data.Destination.toLowerCase() || v.origin.toLowerCase() === props.data.Origin.toLowerCase() &&  v.date === props.data.D_Date &&  v.price <= props.filtervalues.maxValue &&  v.price >= props.filtervalues.minValue);//direct indirect all
     res =multiresult.filter(v => v.destination.toLowerCase() === props.data.Destination.toLowerCase() && v.origin.toLowerCase() === props.data.Origin.toLowerCase() &&  v.date === props.data.D_Date &&  v.price <= props.filtervalues.maxValue &&  v.price >= props.filtervalues.minValue); //direct flights
     multires=multiresult.filter(v => v.destination.toLowerCase() === props.data.Destination.toLowerCase() || v.origin.toLowerCase() === props.data.Origin.toLowerCase() &&  v.date === props.data.D_Date &&  v.price <= props.filtervalues.maxValue &&  v.price >= props.filtervalues.minValue);//all indirect
    first_m=multires.filter(v => v.origin.toLowerCase() === props.data.Origin.toLowerCase() &&  v.destination !== props.data.Destination);//first of multiflight
    second_m=multires.filter(v => v.origin.toLowerCase() !== props.data.Origin.toLowerCase() && v.destination.toLowerCase() === props.data.Destination.toLowerCase());//second of multiflight
     setData(res);
     setmultiData(multires);
     setfirstmultiData(first_m);
     setsecondmultiData(second_m);
     console.log(secondflight);
     returnall =result.data.filter(v => v.destination.toLowerCase() === props.data.Origin.toLowerCase() || v.origin.toLowerCase() === props.data.Destination.toLowerCase() &&  v.date === props.data.R_Date &&  v.price <= props.filtervalues.maxValue &&  v.price >= props.filtervalues.minValue);//direct indirect all
     setreturnData(returnall);
     directreturn =returnall.filter(v => v.destination.toLowerCase() === props.data.Origin.toLowerCase() && v.origin.toLowerCase() === props.data.Destination.toLowerCase() &&  v.date === props.data.R_Date &&  v.price <= props.filtervalues.maxValue &&  v.price >= props.filtervalues.minValue); //direct flights
     setdirectreturnData(directreturn);
     firstreturn=returnall.filter(v => v.origin.toLowerCase() === props.data.Destination.toLowerCase() &&  v.destination !== props.data.Origin);//first of multiflight return
     setfirstreturnData(firstreturn);
     secondreturn=returnall.filter(v => v.origin.toLowerCase() !== props.data.Destination.toLowerCase() && v.destination.toLowerCase() === props.data.Origin.toLowerCase());//second of multiflight return
     setsecondreturnData(secondreturn);
    
    };
    fetchData();
  },[props.data.Destination, props.data.Origin, props.data.D_Date, props.data.R_Date, props.filtervalues.maxValue, props.filtervalues.minValue]);
 const flights=()=> {
    return _.map(data, (plane) => {
      return (
       <Flightrow key={plane.flightNo+plane.origin} data={plane}/>    
      );
    });
  }
  const returnflights=()=> {
    return _.map(dreturnflight, (plane) => {
      return (
       <Flightrow key={plane.flightNo+plane.origin} data={plane}/>    
      );
    });
  }
  const multiflights=()=> {
    let secondf;
  return _.map(firstflight, (plane) => {
    secondf = _.find(secondflight, function(obj) {
      console.log(obj);
      console.log(plane);
      return obj.origin === plane.destination;
  })
  console.log(secondf);
        return (
          <Multirow key={plane.flightNo+plane.origin} data={plane} sdata={secondf}/>      
        );
      });
  }
  const returnmultiflights=()=> {
    let secondf;
  return _.map(freturnflight, (plane) => {
    secondf = _.find(sreturnflight, function(obj) {
      console.log(obj);
      console.log(plane);
      return obj.origin === plane.destination;
  })
  console.log(secondf);
        return (
          <Multirow key={plane.flightNo+plane.origin} data={plane} sdata={secondf}/>      
        );
      });
  }
    return (<div>
        <div className="result-header">
        <h3>{props.data.Origin} {props.data.Origin ? 'to' : ''} {props.data.Destination}</h3>
        <h5> {data.length ? data.length+firstflight.length : ''} {data.length ? 'flights found' : ''} {props.data.D_Date ? props.data.D_Date : ''}</h5>
        </div>
        <div class="resultcontent" >
          <div className={props.data.R_Date ? 'content-divide' : ''}>
           <ul className="list-group flightrow">{flights()}</ul>
           <ul className="list-group flightrow">{multiflights()}</ul>
          </div>
        {props.data.R_Date ? <div className="content-divide">
        <ul className="list-group flightrow">{returnflights()}</ul>
        <ul className="list-group flightrow">{returnmultiflights()}</ul>
        </div> : ''}
        </div>
        </div>
      );
  }
  export default Searchresult;