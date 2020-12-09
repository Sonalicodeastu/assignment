import * as React from 'react';
import Slider from '@reijovosu/react-range-slider';
const Rangeslider = (props) => {
    return <Slider
       min="0"
       max="10000"
       minValue="1000"
       maxValue="5000"
       onChange={props.value}
    />;
}
export default Rangeslider;