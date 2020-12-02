import Inputfield from '../../common/inputfield';

function oneway() {
 return (
        <div>
        <Inputfield placeholder="Enter origin city"/>
        <Inputfield placeholder="Enter destination city"/>
        <Inputfield placeholder="Enter origin city"/>
        <Inputfield placeholder="Departure Date"/>
        <Inputfield placeholder="Number of passenger"/>
        <button type="submit">Search</button>
        </div>
      );
  }
  export default oneway;