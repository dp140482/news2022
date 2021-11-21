const {toNumDate, toRusString, toRusWeekday} = require("./datetools");

const footerText = 'Файл составлен на основе материалов по ссылкам с новостных агрегаторов <a href="https://yandex.ru/news" class="footer-credits-link">Яндекс.Новости</a> и <a href="https://news.google.com/topstories?hl=ru&gl=RU&ceid=RU:ru" class="footer-credits-link">Google.Новости</a>.'

const footer = `<footer class="footer">
    <p class="footer-links">
        <a href="daybyday.html" class="footer-link">День за днём</a>
    </p>
    <p class="footer-credits">
        ${footerText}
    </p>
</footer>`;

const header = jsonDate => {
    return `<header class="header">
<h1 class="date">${ toRusString(jsonDate) }</h1>
    <div class="dayofweek">
        ${ toRusWeekday(jsonDate) }
    </div>
</header>`;
};

const head = date => {
    return `<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ toNumDate(date) }</title>
    <link rel="stylesheet" href="../css/nov/articleslayout.min.css">
</head>`;
};

const printMessageHeaders = msg => {
    let res = '';
    if (msg.time) res += `
    <span class="time">${ msg.time }</span>`;
    if (msg.tags) res += `
    <span class="tags">${ msg.tags }</span>`;
    return res;
};

const printMessage = msg => {
    return '<p' + (msg.time ? ` class="force-indent">` : '>') + printMessageHeaders(msg) + `
        ${ msg.text}
    </p>`;
};

const printParts = parts => {
    return parts.map(part => printMessage(part)).join('');
};

//article.messages.map(msg => printMessage(msg)).join('\n')

const printArticleHeaders = article => {
    let res = '';
    if (article.header) res += `<h2>${article.header}</h2>`;
    res += `<div class="article-tags">${article.tags}</div>`;
    if (article.time) res += `<div class="article-time">${article.time}</div>`;
    return res;
};

const printArticle = article => {
    return `<article class="article">
    ${ printArticleHeaders(article) }
    ${ printParts(article.parts) }
</article>`;
}

const printArticles = data => {
    let articles = [...data.articles];
    articles.forEach(article => {
        article.parts = article.parts.map(partID => data.messages.find(msg => msg.id === partID));
    });
    return '<section>\n' 
    + articles.map(article => printArticle(article)).join('\n\n')
    + '\n</section>\n\n';
};

const body = data => {
    return '<body>\n' + header(data.date) + '\n\n' + printArticles(data) + footer + '\n</body>\n';
};

const htmlFromData = (data) => {
    return '<!DOCTYPE html>\n<html lang="ru">\n\n'
        + head(data.date) + '\n\n' + body(data)
        + '</html>';
};

module.exports = htmlFromData;