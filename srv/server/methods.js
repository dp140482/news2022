const { v4: uuid } = require("uuid");
const {toMinutes } = require("./datetools");

const add = (oldData, req) => {
  const id = uuid();
  const item = { id, ...req.body };
  oldData.push(item);
  return JSON.stringify(oldData, null, 4);
};

const change = (oldData, req) => {
  const id = req.params.id;
  const found = oldData.find((el) => el.id === id);
  oldData[oldData.indexOf(found)] = { id, ...req.body };
  return JSON.stringify(oldData, null, 4);
};

const remove = (oldData, req) => {
  const sid = req.params.id;
  const newData = oldData.filter(msg => msg.id !== sid);
  return JSON.stringify(newData, null, 4);
};

const chronoMessages = (msgOne, msgTwo, ignoreID) => {
  return (msgOne !== msgTwo
    && msgOne.tags === msgTwo.tags
    && msgOne.date === msgTwo.date
    && msgOne.id !== ignoreID
    && msgTwo.id !== ignoreID);
};

const stickyMessages = (msgOne, msgTwo, ignoreID) => {
  return (chronoMessages(msgOne, msgTwo, ignoreID)
    && msgOne.time === msgTwo.time);
};

const toChronoMsg = msg => {
  let res = {text: [...msg.text]};
  if (msg.time) res = {time: msg.time, ...res};
  return res;
}

const compareTime = (a, b) => {
  if (a.time && b.time) {
    return toMinutes(a.time) - toMinutes(b.time)
  } else return 0;
}

const collect = messages => {
  let copy = [...messages];
  for (let firstMsg of copy) {
    for (let secondMsg of copy) if (stickyMessages(firstMsg, secondMsg, 'deleted')) {
      secondMsg.text.map(p => firstMsg.text.push(p));
      secondMsg.id = 'deleted';
    }
  }
  copy = copy.filter(msg => msg.id !== 'deleted');
  let collected = [];
  for (let firstMsg of copy) if (firstMsg.id !== 'deleted') {
    const chronicle = { date: firstMsg.date, tags: firstMsg.tags, msgs: [toChronoMsg(firstMsg)] };
    for (let secondMsg of copy) if (chronoMessages(firstMsg, secondMsg, 'deleted')) {
      chronicle.msgs.push(toChronoMsg(secondMsg));
      secondMsg.id = 'deleted';
    }
    if (chronicle.msgs.length > 1) {
      chronicle.msgs.sort(compareTime);
      collected.push(chronicle);
      firstMsg.id = 'deleted';
    }
  }
  copy = copy.filter(msg => msg.id !== 'deleted');
  const res = {chronicles: collected, messages: copy};
  return JSON.stringify(res, null, 4);
};


module.exports = {
  add,
  change,
  remove,
  collect
};