import React from 'react';
import { v4 as uuid } from 'uuid';
// import { useNavigate } from 'react-router';
import './Chronicle.css';

const Chronicle = ({ chrono }) => {
    // const navigate = useNavigate();

    const twoDigits = num => {
        return (num > 9) ? num : '0' + num;
    }
    
    const NumDate = jsonDate => {
        const dateobj = new Date(jsonDate);
        return twoDigits(dateobj.getDate()) +  '.' + twoDigits(dateobj.getMonth() + 1) 
            + '.' + dateobj.getFullYear();
    };

    return (
        <article className="chronicle">
            <h2 className="chronicle-tags">{ chrono.tags }</h2>
            <div className="chronicle-date">{ NumDate(chrono.date) }</div>
            {chrono.msgs.map(msg => <div key={ uuid() }>
                { msg.time ? <div className="chrono-msg-time">{msg.time}</div> : '' }
                { msg.text.map(p => <p className="chrono-text" key={ uuid() }>{p}</p> ) }
              </div>)}
        </article>
    );
}

export default Chronicle;