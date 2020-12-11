import Inputfield from '../../common/inputfield';
import InputDate from '../../common/inputdate';

function oneway() {
 return (  <div>
        <Inputfield placeholder="Enter origin city"/>
        <Inputfield placeholder="Enter destination city"/>
        <Inputfield placeholder="Enter origin city"/>
        <InputDate placeholder="Departure Date"/>
        <Inputfield placeholder="Number of passenger"/>
        <button type="submit">Search</button>
        </div>
      );
  }
  export default oneway;