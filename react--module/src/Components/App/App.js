import React from 'react';
import List from '../ListPart/List';
import MessagePart from '../MessagePart/message';
import '../App/App.css';
const App = () => {
  return (
    <div className="main--container">
      <List />
      <MessagePart />
    </div>
  );
};

export default App;
