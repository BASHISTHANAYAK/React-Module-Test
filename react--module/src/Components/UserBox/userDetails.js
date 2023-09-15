import React from 'react';
import '../UserBox/userBox.css';
const userDetails = (props) => {
  return (
    <div>
      <div
        className="Details--container"
        onClick={props.onClick}
        name={props.name}
        style={props.style}
      >
        <div className="User--fName" style={{ background: props.BgColor }}>
          {props.name[0].toUpperCase()}
          {props.name[1].toUpperCase()}
        </div>
        <h3 className="User--fullName">{props.name}</h3>
      </div>
    </div>
  );
};

export default userDetails;
