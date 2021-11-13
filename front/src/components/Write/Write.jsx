import React from 'react';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';
import './Write.css';

const Write = (props) => {
  const {
    ableTags, setAbleTags,
    date, setDate,
    time, setTime,
    msgText, setMsgText,
    tags, setTags
  } = props;

  const send = object => {
    return fetch('http://localhost:3003/add-msg/' + object.date, {
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
    <div className="write-app">
        <form className="sendForm">
        <fieldset className="enFieldset upFieldset">
          <div>
            <label>Дата: </label>
            <input
              type="text"
              value={date}
              onChange={handleDateChange}
              className="dateTimeInputs"
            />
          </div><div className="timeBlock">
            <label>Время: </label>
            <input 
              type="text"
              placeholder="HH:MM"
              value={time}
              onChange={handleTimeChange}
              className="dateTimeInputs"
            />
          </div>
          <Link to={"/sort/" + date} className="link">Сортировка</Link>
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
        <div className="buttons">
            <button onClick={handleButtonClick}>Отправить</button>
        </div>
      </form>
    </div>
  );
}

export default Write;