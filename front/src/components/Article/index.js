import React from 'react';
import ArticleMessage from '../ArticleMessage';
import './Article.css';

const Article = ({ article }) => {
    return (
        <article className="article">
            {article.header ? <h2 className="article-tags">{ article.header }</h2> : ''}
            <div className="article-tags">{ article.tags }</div>
            { article.time ? <div className="article-date">{ article.time }</div> : ''}
            { article.messages.map(msg => <ArticleMessage message={msg} key={msg.id} />) }
        </article>
    );
}

export default Article;