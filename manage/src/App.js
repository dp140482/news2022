import React from 'react';
import './App.css';

const App = () => {
  const [date, setDate] = React.useState('2021-11-01');
  const [file, setFile] = React.useState('data.json');
  const [messages, setMessages] = React.useState([]);

  const handleCut = () => {
    fetch('http://localhost:3003/cut/' + date)
      .then(result => result.json())
      .then(result => setMessages(result));
  }

  const handleSave = async () => {
    await fetch('http://localhost:3003/commute-store/' + file);
    await fetch('http://localhost:3003/save/' + date);
  }

  return (
    <div className="App">
     Дата:
     <input value={date} className="mainInput" onChange={event => setDate(event.target.value) } />
     <button className="btn" onClick={handleCut}>✂︎</button>
     <button className="btn" onClick={handleSave}>⬇︎</button><br />
     Файл:
     <input value={file} className="mainInput" onChange={event => setFile(event.target.value) } />
     Получено записей: {messages.length}
    </div>
  );
}

export default App;
