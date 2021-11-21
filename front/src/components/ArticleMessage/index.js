import React from 'react';
import './ArticleMessage.css';

const ArticleMessage = ({ message }) => {
    return (
        <p className="message">
            { message.time ? <span className="message-time">{ message.time }</span> : '' }
            { message.tags ? <span className="message-tags">{ message.tags }</span> : '' }
            {message.text}
        </p>
    );
}

export default ArticleMessage;