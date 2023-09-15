import React, { useRef, useState, useEffect } from 'react';
import '../PopUpBox/PopUp.css';
import './Styles/ListPart.css';
import WelcomePart from '../MessagePart/WelcomePart';
import UserDetails from '../UserBox/userDetails';
import '../MessagePart/Styles/WriteMessage.css';
import TextArea from '../MessagePart/textArea';
// import PopUp from './PopUp';

const List = () => {
  const [create, setCreate] = useState(false);
  const [welcomePage, setWelcomePage] = useState(true);
  const NameRef = useRef(null);
  const [selectedData, setSelectedData] = useState({ name: '', color: '' });
  const [userBackgroundColor, setUserBackgroundColor] = useState({});
  const [selectedUser, setSelectedUser] = useState(null); // Selected user state
  const [messageContent, setMessageContent] = useState(''); // Message content state

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

  function ClickCreateUser(e) {
    let TyedName = NameRef.current.value;
    if (TyedName.length >= 2) {
      console.log(TyedName);
      DataArray.push({ name: TyedName, color: selectedData.color });
      localStorage.setItem('AllData', JSON.stringify(DataArray));
      console.log(DataArray);

      setCreate(false);
      setSelectedData((pre) => {
        return (pre.name = '');
      });
    } else {
      alert('Name length should be >=2');
    }
  }

  function SelectUser(e, name) {
    const updatedUserBackgroundColor = {};
    updatedUserBackgroundColor[name] = '#F7ECDC';
    setUserBackgroundColor(updatedUserBackgroundColor);
    setWelcomePage(false);
    setSelectedUser(name); // Set the selected user
    setMessageContent(''); // Clear message content when a user is selected
    localStorage.setItem('UserName', JSON.stringify(name));
  }

  const userComponents = DataArray.map((el, index) => (
    <UserDetails
      key={index}
      name={el.name}
      BgColor={el.color}
      onClick={(e) => {
        SelectUser(e, el.name);
      }}
      style={{ backgroundColor: userBackgroundColor[el.name] || '#F5F5F5' }}
    />
  ));

  const [areaInputs, setAreaInputs] = useState('');
  const forTxtArea = useRef(null);

  function CallOnChageValue(e) {
    let InputData = e.target.value;
    setAreaInputs(() => {
      return InputData;
    });
  }

  let Alluserdata = JSON.parse(localStorage.getItem('Alluserdata'));
  if (!Alluserdata) {
    Alluserdata = [];
  }

  //when we click send img
  function ImageCLK() {
    const saveTxt = areaInputs;
    const currentTime = new Date();
    const currentMonth = currentTime.toLocaleString('en-US', { month: 'long' });
    const currentDate = currentTime.toLocaleString('en-US', { day: 'numeric' });
    const currentYear = currentTime.toLocaleString('en-US', {
      year: 'numeric',
    });
    const currentTimeString = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    let AuserInputs = [];
    AuserInputs.push(saveTxt);

    const textWithTime = ` ${currentDate}  ${currentMonth} ${currentYear} `;

    let AuserData = {
      AuserDataName: JSON.parse(localStorage.getItem('UserName')),
      AuserTime: currentTimeString,
      AuserDate: textWithTime,
      AuserInputsValue: AuserInputs,
    };
    Alluserdata.push(AuserData);

    localStorage.setItem('Alluserdata', JSON.stringify(Alluserdata));

    setAreaInputs('');
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && e.shiftKey) {
      setAreaInputs((pre) => {
        return pre + '\n';
      });
    } else if (e.key === 'Enter') {
      ImageCLK();
    }
  }

  // Loading user-specific data when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setMessageContent(
        Alluserdata.filter((data) => data.AuserDataName === selectedUser).map(
          (data, index) => (
            <div key={index}>
              <div>
                <div>
                  <h6>{data.AuserTime}</h6>
                </div>
                <div>
                  <h6>{data.AuserDate}</h6>
                </div>
              </div>

              <div>
                <h5>{data.AuserInputsValue[0]}</h5>
              </div>
            </div>
          )
        )
      );
    }
  }, [selectedUser, Alluserdata]);

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
              <button className="Create--button" onClick={ClickCreateUser}>
                Create
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {welcomePage ? <WelcomePart /> : ''}
      {!welcomePage ? (
        <div>
          {/* Display user-specific data */}
          <div className="messagessArea">
            {selectedUser ? messageContent : null}
          </div>
          <TextArea
            ref={forTxtArea}
            value={areaInputs}
            onChange={CallOnChageValue}
            onKeyDown={handleKeyPress}
            IMGonClick={ImageCLK}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default List;
