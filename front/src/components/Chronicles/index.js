import React from 'react';
import SortTools from '../SortTools';
import Chronicle from '../Chronicle';

const Chronicles = ({ chronicles, setChronicles }) => {
    return (
        <div>
            {chronicles.map(chrono => <div className="container" id={ chrono.id } key={ chrono.id }>
                <Chronicle chrono={chrono} />
                <SortTools data={chronicles} setData={setChronicles} id={chrono.id} />
            </div>)}
        </div>
    );
}

export default Chronicles;