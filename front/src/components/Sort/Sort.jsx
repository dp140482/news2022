/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {toNumDate as NumDate} from './datetools';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';
import './Sort.css';
import Refresh from './refresh.svg';
import Save from './save.png';
import Merge from './merge.png';
import HtmlPage from './html.png';

const Sort = () => {
  const { showDate } = useParams();
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(showDate);
  const navigate = useNavigate();
  
  function handleRefresh() {
    fetch('http://localhost:3003/get-all/' + date)
      .then(res => res.json())
      .then(res => setData(res));
  }
  
  React.useEffect(() => {
      handleRefresh();
  }, []);
  
  const handleHTML = () => {
    fetch('http://localhost:3003/save/' + date);
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
    return fetch('http://localhost:3003/rewrite-all/' + date, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
  
  const handleAutoJoin = () => {
    let copy = [...data];
    for (let firstMsg of copy) {
      for (let secondMsg of copy) {
        if (secondMsg !== firstMsg 
          && secondMsg.tags === firstMsg.tags 
          && secondMsg.date === firstMsg.date 
          && secondMsg.id !== 'deleted'
          && firstMsg.id !== 'deleted'
          && secondMsg.time === firstMsg.time) {
            secondMsg.text.map(p => firstMsg.text.push(p));
            secondMsg.id = 'deleted';
        }
      }
    }
    copy = copy.filter(msg => msg.id !== 'deleted');
    setData(copy);
  }

  //⟳
  return (
      <div className="sort-app">
        <nav className="sort-nav">
            <div>
              <label>Дата:</label>
              <input value={date} onChange={event => setDate(event.target.value) } />
              <label>Сообщений: { data.length }</label>
            </div>
            <div>
            <button onClick={ handleRefresh }>
                <img src={Refresh} alt="Refresh" title="Refresh" />
            </button>
            <button onClick={ handleSave }>
                <img src={Save} alt="Save" title="Save" />
            </button>
            <button onClick={ handleAutoJoin }>
                <img src={Merge} alt="AutoJoin" title="AutoJoin" />
            </button>
            <button onClick={ handleHTML }>
                <img src={HtmlPage} alt="HTML" title="HTML" />
            </button>
            <Link to="/" className="link">Запись</Link>
            </div>
        </nav>
        {data.map(msg => <div className="container" id={ msg.id } key={ msg.id }>
          <article className="message">
            <div className="message-tags">{ msg.tags }</div>
            <div className="message-datetime">
              { NumDate(msg.date) } { msg.time ? msg.time : '' }
            </div>
            { msg.text.map(p => 
              <p 
                className="message-text" 
                key={ uuid() }
                onClick={ () => {
                  console.log("click");
                  navigate(`/${date}/${msg.id}`, { replace: true });
                } }
              >{ p }</p>)
            }
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
  
export default Sort;