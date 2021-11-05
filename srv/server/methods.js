const add = (oldData, req) => {
  const id = oldData.length;
  const item = { id, ...req.body };
  oldData.push(item);
  return JSON.stringify(oldData, null, 4);
};
const change = (oldData, req) => {
  const sid = +req.params.id;
  const found = oldData.find((el) => el.id === sid);
  oldData[oldData.indexOf(found)] = req.body;
  return JSON.stringify(oldData, null, 4);
};
const remove = (oldData, req) => {
  const sid = +req.params.id;
  oldData = oldData.filter(msg => msg.id !== sid);
  return JSON.stringify(oldData, null, 4);
};


module.exports = {
  add,
  change,
  remove
};