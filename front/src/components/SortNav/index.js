import React from 'react';
import { Link } from 'react-router-dom';
import './SortNav.css';
import Refresh from './refresh.svg';
import Save from './save.png';
import Merge from './merge.png';
import HtmlPage from './html.png';

const SortNav = (props) => {
    const {date, setDate, handlers} = props;

    const handlerHTML = () => {
        fetch('http://localhost:3003/save/' + date);
    }

    return (
        <nav className="sort-nav">
            <div className="leftside">
              <label>Дата:</label>
              <input value={date} onChange={event => setDate(event.target.value) } />
            </div>
            <div>
            <button onClick={ handlers.refresh }>
                <img src={Refresh} alt="Refresh" title="Refresh" />
            </button>
            <button onClick={ handlers.collect }>
                <img src={Merge} alt="AutoJoin" title="AutoJoin" />
            </button>
            <button onClick={ handlers.save }>
                <img src={Save} alt="Save" title="Save" />
            </button>
            <button onClick={ handlerHTML }>
                <img src={HtmlPage} alt="HTML" title="HTML" />
            </button>
            <Link to="/" className="link">Запись</Link>
            </div>
        </nav>
    );
}

export default SortNav;