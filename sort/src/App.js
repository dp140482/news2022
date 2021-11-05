import React from 'react';
import {toNumDate as NumDate} from './modules/datetools';
import { v4 as uuid } from 'uuid';
import './App.css';

const App = () => {
  const [data, setData] = React.useState([]);
  const [file, setFile] = React.useState('data.json');

  React.useEffect(
    () => {
      return fetch('http://localhost:3003/get')
      .then(res => res.json())
      .then(res => setData(res))
    }, []
  );

  const handleRefresh = async () => {
    await fetch('http://localhost:3003/commute-store/' + file);
    await fetch('http://localhost:3003/get')
    .then(res => res.json())
    .then(res => setData(res));
  }

  const handleReid = () => {
    let copy = [...data];
    for (let i = 0; i < data.length; i++) {
      copy[i].id = i;
    }
    setData(copy);
  }

  const handleJoin = id => {
    const idx = data.findIndex(msg => msg.id === id);
    if (idx < 1) return;
    let copy = [...data];
    copy[idx].text.map(p => copy[idx-1].text.push(p));
    copy = copy.filter(msg => msg.id !== id);
    setData(copy);
  };

  const handleUp = id => {
    const idx = data.findIndex(msg => msg.id === id);
    if (idx < 1) return;
    let copy = [...data];
    [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
    setData(copy);
  }

  const handleTop = id => {
    const idx = data.findIndex(msg => msg.id === id);
    if (idx < 1) return;
    let copy = [...data];
    let swap = copy[idx];
    copy = copy.filter(msg => msg.id !== swap.id);
    copy.unshift(swap);
    setData(copy);
  }

  const handleSave = () => {
    return fetch('http://localhost:3003/changeAll', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  return (
    <div className="App">
      Файл:
      <input value={file} className="mainInput" onChange={event => setFile(event.target.value) } />
      <button onClick={ handleRefresh }>Refresh</button>
      <button onClick={ handleSave }>SAVE</button>
      <button onClick={ handleReid }>REid</button>
      {data.map(msg => <div className="container" id={ msg.id } key={ msg.id }>
        <article className="message">
          <div className="message-tags">{ msg.tags }</div>
          <div className="message-datetime">
            { NumDate(msg.date) } { msg.time ? msg.time : '' }
          </div>
          { msg.text.map(p => <p className="message-text" key={ uuid() }>{ p }</p>) }
        </article>
      <div className="tools">
        <button onClick={event => handleJoin(msg.id, event)}>⇪</button>
        <button onClick={event => handleUp(msg.id, event)}>⇧</button>
        <button onClick={event => handleTop(msg.id, event)}>⟰</button>
      </div>
      </div>
      )}
    </div>
  );
}

export default App;
