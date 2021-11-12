import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Write from './components/Write/Write';
import Sort from './components/Sort/Sort';

const App = () => {
    const [ableTags, setAbleTags] = React.useState(["Россия"]);
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={
                <Write ableTags={ableTags} setAbleTags={setAbleTags}  />
            } />
            <Route path="/sort" element={<Sort />}>
                <Route path=":showDate" element={<Sort />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
};

export default App;