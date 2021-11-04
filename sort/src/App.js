import React from 'react';
import {toNumDate as NumDate} from './modules/datetools';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(
    () => {
      return fetch('http://localhost:3003/get')
      .then(res => res.json())
      .then(res => setData(res))
    }, []
  );

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
    // [copy[idx - 1].id, copy[idx].id] = [copy[idx].id, copy[idx - 1].id];
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

  // { msg.text.map(par => <p className="message-text">{ par }</p>) }
  // { msg.time ? <span className="message-time">{ msg.time }</span> : '' }
  return (
    <div className="App">
      <button onClick={ handleSave }>SAVE</button>
      {data.map(msg => <div className="container" id={ msg.id } key={ msg.id }>
        <article className="message">
          <div className="message-tags">{ msg.tags }</div>
          <div className="message-datetime">
            { NumDate(msg.date) } { msg.time ? msg.time : '' }
          </div>
          { msg.text.map(par => <p className="message-text" key={ uuid() }>{ par }</p>) }
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
