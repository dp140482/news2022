import React from 'react';
import SortTools from '../SortTools';
import Article from '../Article';

const Chronicles = ({ articles, setArticles }) => {
    return (
        <div>
            { articles.map(article => 
                <div className="container" id={ article.id } key={ article.id }>
                    <Article article={article} />
                    <SortTools data={articles} setData={setArticles} id={article.id} />
                </div>
            )}
        </div>
    );
}

export default Chronicles;