import React from 'react';
import SortTools from '../SortTools';
import Message from '../Message';

const Messages = ({ data, setData }) => {
    return (
        <div>
            {data.map(msg => <div className="container" id={ msg.id } key={ msg.id }>
                <Message msg={msg} />
                <SortTools data={data} setData={setData} id={msg.id} />
            </div>)}
        </div>
    );
}

export default Messages;