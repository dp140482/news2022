import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import './App.css';

const App = () => {
  const dateToJSON = date => {
    return date.getFullYear() + '-' 
        + ((date.getMonth() < 9) ? '0' : '') + (date.getMonth() + 1) + '-'
        + ((date.getDate() < 10) ? '0' : '') + date.getDate();
  };

  const [date, setDate] = useState(dateToJSON(new Date()));
  const [time, setTime] = useState('');
  const [msgText, setMsgText] = useState('');
  const [tags, setTags] = useState('');
  const [ableTags, setAbleTags] = useState(["Россия"]);

  const send = object => {
    return fetch('http://localhost:3003/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object)
    });
  }

  const textReplacer = text => {
    let out = text.replace(/\.\.\./g, '…');
    out = out.replace(/(^)\x22(\s)/g, '$1»$2');
    out = out.replace(/(^|\s|\()"/g, "$1«");
    out = out.replace(/"(;|!|\?|:|\.|…|,|$|\)|\{|\s)/g, "»$1");
    out = out.replace(/(?<!»,) - /g, ' — ');
    out = out.replace(/(«[^»]*)«([^»]*)»/g, '$1„$2“');
    return out;
  }

  const handleButtonClick = event => {
    event.preventDefault();
    let textToSent = textReplacer(msgText);
    send({
      date: date,
      time: time,
      tags: tags, 
      text: [textToSent]
    });
    setMsgText('');
  }

  const handleTextChange = event => {
    setMsgText(event.target.value);
  }
  const handleDateChange = event => {
    setDate(event.target.value);
  }
  const handleTimeChange = event => {
    setTime(event.target.value);
  }
  const handleInputChange = event => {
    setTags(event.target.value);
  }
  const handleInputBlur = () => {
    if (!ableTags.includes(tags)) setAbleTags([...ableTags, tags]);
  }

  return (
    <div className="App">
      <form className="sendForm">
        <fieldset className="enFieldset upFieldset">
          <div>
            <label>Дата: </label>
            <input type="text" value={date} onChange={handleDateChange} />
          </div><div className="timeBlock">
            <label>Время: </label>
            <input type="text" placeholder="HH:MM" value={time} onChange={handleTimeChange} />
          </div>
        </fieldset>
        <fieldset className="enFieldset textFieldset">
          <label>Сообщение: </label>
          <textarea className="msgTextArea" value={msgText} onChange={handleTextChange} />
        </fieldset>
        <fieldset className="enFieldset downFieldset">
          <label>Темы: </label>
          <input 
            type="text"
            className="msgTagsInput"
            list="dlist"
            value={tags}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <datalist id="dlist">
            { ableTags.map(tag => <option value={ tag } key={ uuid() } /> ) }
          </datalist>
        </fieldset>
        <button className="sendBtn" onClick={handleButtonClick}>Отправить</button>
      </form>
    </div>
  );
}

export default App;