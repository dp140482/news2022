import React from 'react';
import './SortTools.css';

const SortTools = (props) => {
    const {data, setData, id} = props;

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
    };
      
    const handleTop = id => {
        const idx = data.findIndex(msg => msg.id === id);
        if (idx < 1) return;
        let copy = [...data];
        let swap = copy[idx];
        copy = copy.filter(msg => msg.id !== swap.id);
        copy.unshift(swap);
        setData(copy);
    };

    return (
        <div className="tools">
            <button onClick={event => handleJoin(id, event)}>⇪</button>
            <button onClick={event => handleUp(id, event)}>⇧</button>
            <button onClick={event => handleTop(id, event)}>⟰</button>
        </div>
    );
}

export default SortTools;