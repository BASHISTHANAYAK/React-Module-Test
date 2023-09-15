import React, { useRef, useState, useEffect } from 'react';
import '../PopUpBox/PopUp.css';
import './Styles/ListPart.css';
import WelcomePart from '../MessagePart/WelcomePart';
import WriteMessage from '../MessagePart/WriteMessage';
import UserDetails from '../UserBox/userDetails';

const List = () => {
  //This is joint to popUp
  const [create, setCreate] = useState(false);
  //This is joint to Welcome page
  const [welcomePage, setWelcomePage] = useState(true);
  //Pointing to  the input of popup box.
  const NameRef = useRef(null);
  //Getting name/value and color from popUp Box
  const [selectedData, setSelectedData] = useState({ name: '', color: '' });
  //For each user box background Color.
  const [userBackgroundColor, setUserBackgroundColor] = useState({});

  function CLKCreateButton(event) {
    setCreate(!create);
  }

  useEffect(() => {
    window.addEventListener('click', Ckl);
    return () => {
      window.removeEventListener('click', Ckl);
    };
  }, []);

  function Ckl(e) {
    if (e.target.className === 'main--container') {
      console.log('Clicked outside');
      setCreate(false);
    }
  }

  let DataArray = JSON.parse(localStorage.getItem('AllData'));
  if (!DataArray) {
    DataArray = [];
  }

  function SelectColor(e) {
    const SelectedColor = e.target.className;
    setSelectedData((prev) => {
      return { ...prev, color: SelectedColor };
    });
  }

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

  //Function run when  we click the user Name box

  function SelectUser(e, name) {
    // Create an object to store the background colors
    const updatedUserBackgroundColor = {};

    // Set the background color for the clicked user
    updatedUserBackgroundColor[name] = '#F7ECDC'; // Brown color

    // Reset the background color for all other users to a default color
    for (const userName in userBackgroundColor) {
      if (userName !== name) {
        updatedUserBackgroundColor[userName] = '#F5F5F5'; // Default color
      }
    }

    // Update the state with the new background colors
    setUserBackgroundColor(updatedUserBackgroundColor);

    // Set welcomePage to false
    setWelcomePage(false);
  }

  // Render the UserDetails components with their respective background colors
  const userComponents = DataArray.map((el, index) => (
    <UserDetails
      key={index}
      name={el.name}
      BgColor={el.color}
      onClick={(e) => SelectUser(e, el.name)}
      style={{ backgroundColor: userBackgroundColor[el.name] || '#F5F5F5' }}
    />
  ));

  return (
    <>
      <div className="ListPart">
        <h3>Pocket Notes</h3>
        <button className="Create--Button" onClick={CLKCreateButton}>
          + Create Notes Group
        </button>
        {userComponents}
        {create ? (
          <div className="main--container">
            <div className="White--container">
              <h3 className="new-notes-h3">Create New Notes group</h3>
              <div className="Name--input">
                <p>Group name</p>
                <input
                  type="text"
                  placeholder="Enter your group name...."
                  value={selectedData.name}
                  onChange={(e) => {
                    setSelectedData((prev) => {
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
                  <li
                    id="Purple"
                    className="#b38bfa"
                    onClick={SelectColor}
                  ></li>
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
      {welcomePage ? <WelcomePart /> : ''}
      {!welcomePage ? <WriteMessage /> : ''}
    </>
  );
};

export default List;
