import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {dateJSON} from './components/Sort/datetools';
import Write from './components/Write/Write';
import Sort from './components/Sort/Sort';

const App = () => {
    const [ableTags, setAbleTags] = React.useState(["Россия"]);
    const [date, setDate] = React.useState(dateJSON(new Date()));
    const [time, setTime] = React.useState('');
    const [msgText, setMsgText] = React.useState('');
    const [tags, setTags] = React.useState('');

    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={
                <Write 
                    ableTags={ableTags}
                    setAbleTags={setAbleTags}
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    msgText={msgText}
                    setMsgText={setMsgText}
                    tags={tags}
                    setTags={setTags}
                />
            } />
            <Route path="/sort" element={<Sort />}>
                <Route path=":showDate" element={<Sort />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
};

export default App;