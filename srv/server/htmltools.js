const datetools = require("./datetools");

const getHead = dateString => {
    return `<!DOCTYPE html>
<html lang="ru">
    
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ datetools.toNumDate(dateString) }</title>
    <link rel="stylesheet" href="../css/nov/msglayout.min.css">
</head>
`;
};

const getEmptyBody = () => {
    return `<body>
</body>
</html>`;
};

const getHeader = jsonDate => {
    return `
<header class="header">
<h1 class="date">${ datetools.toRusString(jsonDate) }</h1>
    <div class="dayofweek">
        ${ datetools.toRusWeekday(jsonDate) }
    </div>
</header>
`;
};

const getFooter = () => {
    return `<footer class="footer">
    <p class="footer-links">
        <a href="daybyday.html" class="footer-link">День за днём</a>
    </p>
    <p class="footer-credits">
        Файл составлен на основе материалов по ссылкам с новостных агрегаторов
        <a href="https://yandex.ru/news" class="footer-credits-link">Яндекс.Новости</a> и
        <a
            href="https://news.google.com/topstories?hl=ru&gl=RU&ceid=RU:ru"
            class="footer-credits-link"
        >Google.Новости</a>.
    </p>
</footer>`;
};

const imprintTime = time => {
    return time ? `<span>${ time }</span>` : '';
};

const getArticle = msg => {
    return `<article class="message">
<div class="message-tags">${ msg.tags }</div>
<p>${ imprintTime(msg.time) }
${ msg.text }
</p>
</article>`;
};

const getArticles = (msgArray, date) => {
    let s = '<section>\n';
    for (let msg of msgArray) {
        if (msg.date === date) {
            s += getArticle(msg);
        }
    }
    s+= '\n</section>';
    return s;
};

const getBody = (msgArray, date) => {
    return `<body>
${ getHeader(date) }
${ getArticles(msgArray, date) }
${ getFooter() }
</body>
</html>`;
};

const toHTML = (msgArray, date) => {
    return msgArray.length 
        ? getHead(date) + getBody(msgArray, date)
        : getHead('') + getEmptyBody();
};

module.exports = {toHTML};