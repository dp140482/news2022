const ruMonthInDate = monthNum => {
    switch (monthNum) {
        case 0: return 'января';
        case 1: return 'февраля';
        case 2: return 'марта';
        case 3: return 'апреля';
        case 4: return 'мая';
        case 5: return 'июня';
        case 6: return 'июля';
        case 7: return 'августа';
        case 8: return 'сентября';
        case 9: return 'октября';
        case 10: return 'ноября';
    }
    return 'декабря';
}

const toRusString = jsonDate => {
    const dateobj = new Date(jsonDate);
    return dateobj.getDate() +  ' ' + ruMonthInDate(dateobj.getMonth()) 
        + ' ' + dateobj.getFullYear() + ' года';
};

const twoDigits = num => {
    return (num > 9) ? num : '0' + num;
}

const toNumDate = jsonDate => {
    const dateobj = new Date(jsonDate);
    return twoDigits(dateobj.getDate()) +  '.' + twoDigits(dateobj.getMonth() + 1) 
        + '.' + dateobj.getFullYear();
};

const ruWeekday = day => {
    switch (day) {
        case 1: return 'понедельник';
        case 2: return 'вторник';
        case 3: return 'среда';
        case 4: return 'четверг';
        case 5: return 'пятница';
        case 6: return 'суббота';
    }
    return 'воскресенье';
}

const toRusWeekday = jsonDate => {
    const dateobj = new Date(jsonDate);
    return ruWeekday(dateobj.getDay());
}

const toMinutes = time => {
    const [hours, minutes] = time.split(':');
    return +hours * 60 + +minutes;
}

module.exports = {
    toRusString,
    toNumDate,
    toRusWeekday,
    toMinutes
}