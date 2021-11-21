const addData = (data, newData) => {
    let joinedData = {...data};
    if (newData.message) joinedData.messages = [...joinedData.messages, newData.message];
    if (newData.article) joinedData.articles = [...joinedData.articles, newData.article];
    return joinedData;
};

const joinData = (data, newData) => {
    let joinedData = {...data};
    if (newData.message) joinedData.messages = [...joinedData.messages, newData.message];
    if (newData.articles) joinedData.articles = newData.articles;
    if (newData.article) joinedData.articles = [...joinedData.articles, newData.article];
    if (newData.deleted) joinedData.deleted = newData.deleted;
    return joinedData;
};

const newFileData = {
    messages: [],
    articles: [],
    deleted: []
};

module.exports = {addData, joinData, newFileData};
