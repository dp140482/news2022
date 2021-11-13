const { v4: uuid } = require("uuid");

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
  oldData = oldData.filter(msg => msg.id !== sid);
  return JSON.stringify(oldData, null, 4);
};


module.exports = {
  add,
  change,
  remove
};