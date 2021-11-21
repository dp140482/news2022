/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router';
import SortNav from '../SortNav';
import Articles from '../Articles';
import './Sort.css';

const Sort = () => {
  const { showDate } = useParams();
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(showDate);

  const parsePackage = pkg => {
    let res = { ...pkg };
    res.messages = res.messages.filter(msg => !res.deleted.includes(msg.id));
    res.messages = res.messages.map(msg => { return {...msg, date } });
    let art = res.articles.map(article => {
      let messages = article.parts.map(partid => {
        return res.messages.find(msg => {return msg.id === partid});
      });
      let resart = {id: article.id, messages, tags: article.tags};
      if (article.time) resart = {...resart, time: article.time};
      if (article.header) resart = {...resart, header: article.header};
      return resart;
    });
    setData(art);
  };

  const parseData = () => {
    return { articles: data.map(article => {
        return {
          id: article.id,
          parts: article.messages.map(msg => msg.id),
          tags: article.tags
        };
      })}
  };
  
  const handlers = {
    refresh: () => {
      fetch('http://localhost:3003/get/' + date)
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(res => parsePackage(res));
    },
    save: () => {
      return fetch('http://localhost:3003/set/' + date, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parseData(data))
      });
    },
    collect: () => {
      let deleted = [];
      let copy = [...data];
      copy.forEach(one => {
        copy.forEach(two => {
          if (deleted.includes(two.id) || one === two) return;
          if (two.tags.includes(one.tags)) one.tags = two.tags;
          if (one.tags === two.tags || one.tags.includes(two.tags)) {
            one.messages = [...one.messages, ...two.messages];
            deleted.push(two.id);
          }
        });
      });
      copy = copy.filter(msg => !deleted.includes(msg.id));
      setData(copy);
    }
  }
  
  React.useEffect(() => {
      handlers.refresh();
  }, []);

  return (
      <div className="sort-app">
        <SortNav date={date} setDate={setDate} handlers={handlers} />
        <Articles articles={data} setArticles={setData} />
      </div>
  );
}
  
export default Sort;