// import React, { useRef, useState } from 'react';
// import './Styles/WriteMessage.css';
// import Image from './Image/SendArrow.png';

// const WriteMessage = (props) => {
//   const [areaInputs, setAreaInputs] = useState('');
//   const TXTREF = useRef(null);
//   const forTxtArea = useRef(null);

//   function CallOnChage(e) {
//     let InputData = e.target.value;
//     setAreaInputs(() => {
//       return InputData;
//     });
//   }

//   let Alluserdata = JSON.parse(localStorage.getItem('Alluserdata'));
//   if (!Alluserdata) {
//     Alluserdata = [];
//   }

//   // Image Click
//   function ImageCLK() {
//     //Inputs value(data)
//     const saveTxt = areaInputs;

//     const currentTime = new Date();
//     const currentMonth = currentTime.toLocaleString('en-US', { month: 'long' });
//     const currentDate = currentTime.toLocaleString('en-US', { day: 'numeric' });
//     const currentYear = currentTime.toLocaleString('en-US', {
//       year: 'numeric',
//     });
//     const currentTimeString = currentTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });

//     //saving user inputs and time in LS.
//     let AuserInputs = [];
//     AuserInputs.push(saveTxt);

//     const textWithTime = ` ${currentDate}  ${currentMonth} ${currentYear} `;

//     let AuserData = {
//       AuserDataName: JSON.parse(localStorage.getItem('UserName')),
//       AuserTime: currentTimeString,
//       AuserDate: textWithTime,
//       AuserInputsValue: AuserInputs,
//     };
//     Alluserdata.push(AuserData);

//     localStorage.setItem('Alluserdata', JSON.stringify(Alluserdata));

//     //For month and year
//     const newDivFotDateTime = document.createElement('div');

//     const newH6FotTime = document.createElement('h6');
//     newH6FotTime.innerText = currentTimeString;
//     const newH6FotDate = document.createElement('h6');
//     newH6FotDate.innerText = textWithTime;

//     newDivFotDateTime.appendChild(newH6FotTime);
//     newDivFotDateTime.appendChild(newH6FotDate);
//     //for time
//     // const newH3FotTime = document.createElement('div');
//     // newH3FotTime.innerText = textWithTime;

//     //for inputes value
//     const newDivForvalue = document.createElement('div');
//     newDivForvalue.innerText = saveTxt;

//     const NewDiv = document.createElement('div');
//     NewDiv.appendChild(newDivFotDateTime);
//     NewDiv.appendChild(newDivForvalue);

//     TXTREF.current.appendChild(NewDiv);
//     setAreaInputs('');
//   }

//   // Handle Enter key press
//   function handleKeyPress(e) {
//     if (e.key === 'Enter' && e.shiftKey) {
//       setAreaInputs((pre) => {
//         return pre + '\n';
//       });
//     } else if (e.key === 'Enter') {
//       ImageCLK();
//     }
//   }

//   return (
//     <div>
//       <div className="messagessArea" ref={TXTREF}></div>
//       <div className="textArea--Div">
//         <textarea
//           name=""
//           id=""
//           cols="30"
//           rows="10"
//           placeholder="Enter your text here..........."
//           value={areaInputs}
//           onChange={CallOnChage}
//           onKeyDown={handleKeyPress}
//           ref={forTxtArea}
//         ></textarea>

//         <img src={Image} alt="" onClick={ImageCLK} />
//       </div>
//     </div>
//   );
// };

// export default WriteMessage;
