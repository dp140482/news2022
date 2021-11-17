/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router';
import SortNav from '../SortNav';
import Messages from '../Messages';
import Chronicles from '../Chronicles';
import './Sort.css';

const Sort = () => {
  const { showDate } = useParams();
  const [data, setData] = React.useState([]);
  const [chronicles, setChronicles] = React.useState([]);
  const [date, setDate] = React.useState(showDate);
  const [dataType, setDataType] = React.useState('messages');

  const handlers = {
    refresh: () => {
      fetch('http://localhost:3003/get-all/' + date)
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(res => {
          setData(res);
          setDataType('messages');
        });
    },
    save: () => {
      return fetch('http://localhost:3003/rewrite-all/' + date, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    },
    collect: () => {
      fetch('http://localhost:3003/collect/' + date)
        .then(res => res.json())
        .then(res => {
          setData(res.messages);
          setChronicles(res.chronicles);
          setDataType('collection');
        });
    }
  }
  
  React.useEffect(() => {
      handlers.refresh();
  }, []);

  return (
      <div className="sort-app">
        <SortNav date={date} setDate={setDate} handlers={handlers} />
        { dataType === 'collection' 
          ? <Chronicles chronicles={chronicles} setChronicles={setChronicles} /> 
          : ''
        }
        <Messages data={data} setData={setData} />
      </div>
  );
}
  
export default Sort;