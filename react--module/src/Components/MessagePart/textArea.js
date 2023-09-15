import React from 'react';
import './Styles/WriteMessage.css';
import Image from './Image/SendArrow.png';
const textArea = (props) => {
  return (
   
      <div className="textArea--Div">
        <textarea
          placeholder="Enter your text here..........."
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          ref={props.ref}
        ></textarea>
        <img src={Image} alt="" onClick={props.IMGonClick} />
      </div>
    
  );
};

export default textArea;
