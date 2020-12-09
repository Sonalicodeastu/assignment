import logo from '../images.png';
import Accordion from '../component/searchresult/accordian';
import Multisingle from '../common/multisingle';
const Multirow=(props)=>{ 
    return (
        <Accordion props={props}  sdata={props.sdata}>
        <Multisingle flight={props.data}/>
        <Multisingle flight={props.sdata}/>
        </Accordion>
      );
  }
  export default Multirow; 