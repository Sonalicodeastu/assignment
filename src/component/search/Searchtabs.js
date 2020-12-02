import {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Oneway from './oneway';
import Returnform from './returnform';

function Searchtabs() {
    const [key, setKey] = useState('oneway');


    return (

        <div className="col-4">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >

          <Tab eventKey="oneway" title="oneway">
            <Oneway/>
          </Tab>
          <Tab eventKey="return" title="return">
          <Returnform/>
          </Tab>
         
        </Tabs>
        <h5>filter</h5>
        </div>
      );
  }
  
  export default Searchtabs;