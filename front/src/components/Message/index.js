import React from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router';
import './Message.css';

const Message = ({ msg }) => {
    const navigate = useNavigate();

    const twoDigits = num => {
        return (num > 9) ? num : '0' + num;
    }
    
    const NumDate = jsonDate => {
        const dateobj = new Date(jsonDate);
        return twoDigits(dateobj.getDate()) +  '.' + twoDigits(dateobj.getMonth() + 1) 
            + '.' + dateobj.getFullYear();
    };

    return (
        <article className="message">
            <div className="message-tags">{ msg.tags }</div>
            <div className="message-datetime">
              { NumDate(msg.date) } { msg.time ? msg.time : '' }
            </div>
            { msg.text.map(p => 
              <p 
                className="message-text" 
                key={ uuid() }
                onClick={ () => { navigate(`/${msg.date}/${msg.id}`, { replace: true }) } }
              >{ p }</p>)
            }
        </article>
    );
}

export default Message;