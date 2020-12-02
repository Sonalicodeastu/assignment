import Inputfield from '../../common/inputfield';
function returnform() {
    return (
        <div>
        <Inputfield placeholder="Enter origin city"/>
        <Inputfield placeholder="Enter destination city"/>
        <Inputfield placeholder="Enter origin city"/>
        <Inputfield placeholder="Departure Date"/>
        <Inputfield placeholder="Return Date"/>
        <Inputfield placeholder="Number of passenger"/>
        <button type="submit">Search</button>
        </div>
      );
  }
  export default returnform;