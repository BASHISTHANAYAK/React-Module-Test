import React, { useRef, useState, useEffect } from 'react';
import '../PopUpBox/PopUp.css';
import './Styles/ListPart.css';
import UserDetails from '../UserBox/userDetails';
const List = () => {
  const [create, setCreate] = useState(false);
  const Myref = useRef(null);
  const NameRef = useRef(null);

  const [selectedData, setSelectedata] = useState({ name: '', color: '' });

  function CLKCreateButton(event) {
    setCreate(!create);
  }

  useEffect(() => {
    window.addEventListener('click', Ckl);
  }, []);

  function Ckl(e) {
    if (e.target.className === 'main--container') {
      console.log('Clicked outSide');
      setCreate(false);
    }
  }

  let DataArray = JSON.parse(localStorage.getItem('AllData'));
  if (!DataArray) {
    DataArray = [];
  }
  //Name Enter

  function SelectColor(e) {
    const SelectedColor = e.target.className;
    setSelectedata((pre) => {
      return { ...pre, color: SelectedColor };
    });
  }

  //When we click create button
  function NameFun(e) {
    let TyedName = NameRef.current.value;
    if (TyedName.length >= 1) {
      console.log(TyedName);

      DataArray.push({ name: TyedName, color: selectedData.color });
      localStorage.setItem('AllData', JSON.stringify(DataArray));
      console.log(DataArray);
    }
    setCreate(false);
  }

  return (
    <div className="ListPart">
      <h3>Pocket Notes</h3>
      <button className="Create--Button" onClick={CLKCreateButton}>
        + Create Notes Group
      </button>
      {DataArray.map((el) => {
        return <UserDetails name={el.name} BgColor={el.color} />;
      })}

      {create ? (
        <div className="main--container" ref={Myref}>
          <div className="White--container">
            <h3 className="new-notes-h3">Create New Notes group</h3>
            <div className="Name--input">
              <p>Group name</p>
              <input
                type="text"
                placeholder="Enter your group name...."
                value={selectedData.name}
                onChange={(e) => {
                  setSelectedata((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                ref={NameRef}
              />
            </div>
            <br />
            <div className="Choose-color--container">
              <p>Choose color</p>
              <ul className="color-li" value={selectedData.color}>
                <li id="Purple" className="#b38bfa" onClick={SelectColor}></li>
                <li id="pink" className="#ff79f2" onClick={SelectColor}></li>
                <li id="sky" className="#43e6fc" onClick={SelectColor}></li>
                <li id="brown" className="#f19576" onClick={SelectColor}></li>
                <li id="blue" className="#0047ff" onClick={SelectColor}></li>
                <li
                  id="light--blue"
                  className="#6691ff"
                  onClick={SelectColor}
                ></li>
              </ul>
            </div>
            <br />
            <button className="Create--button" onClick={NameFun}>
              Create
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default List;
