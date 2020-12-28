import Oneway from '../oneway';
import Returnform from '../returnform';
import React from 'react';
import Tabs from './tabs';
import Tab from './tab';

const Searchtabs = props => {
   return(
      <div className="tabs">
       <Tabs>
         <Tab label="Oneway">
           <Oneway/>
         </Tab>
         <Tab label="Returnform">
           <Returnform/>
         </Tab>
       </Tabs>
      </div>
    )
  }

export default Searchtabs;