import logo from "../images.png";
import Favaccordion from "../common/favaccordian";
import Multisingle from "../common/multisingle";
const Favmulti = (props) => {
  return (
    <Favaccordion props={props} sdata={props.sdata}>
      <Multisingle flight={props.data} />
      <Multisingle flight={props.sdata} />
    </Favaccordion>
  );
};
export default Favmulti;
