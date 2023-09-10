import React from 'react';
import './Styles/WelcomePage.css';
import Image from './Image/NoteImage.png';
const message = () => {
  return (
    <div className="WelcomePage">
      <img src={Image} alt="NoteImage" className="NoteImage" />
      <h2 className='Pocket-Notes'>Pocket Notes</h2>
      <p className='Note--descr'>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <p className='end-to-end-encrypted'><span><i class="fa-solid fa-lock"></i></span> end-to-end encrypted</p>
    </div>
  );
};

export default message;
