import React, { useRef, useState } from 'react';
import '../PopUpBox/PopUp.css';
import './Styles/ListPart.css';
const List = () => {
  const [create, setCreate] = useState(false);

  const Myref = useRef(null);

  function CLKCreateButton(event) {
    setCreate(!create);
  }

  window.addEventListener('click', Ckl);

  function Ckl(e) {
    if (e.target.className === 'main--container') {
      console.log('Clicked outSide');
      setCreate(false);
    }
  }

  return (
    <div className="ListPart">
      <h3>Pocket Notes</h3>
      <button className="Create--Button" onClick={CLKCreateButton}>
        + Create Notes Group
      </button>

      {create ? (
        <div className="main--container" ref={Myref}>
          <div className="White--container">
            <h3 className="new-notes-h3">Create New Notes group</h3>
            <div className="Name--input">
              <p>Group name</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your group name...."
              />
            </div>
            <br />
            <div className="Choose-color--container">
              <p>Choose color</p>
              <ul className="color-li">
                <li id="Purple"></li>
                <li id="pink"></li>
                <li id="sky"></li>
                <li id="brown"></li>
                <li id="blue"></li>
                <li id="light--blue"></li>
              </ul>
            </div>
            <br />
            <button className="Create--button">Create</button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default List;
