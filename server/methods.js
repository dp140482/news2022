let add = (oldData, req) => {
  const id = oldData.length;
  const item = { id, ...req.body };
  oldData.push(item);
  return JSON.stringify(oldData, null, 4);
};
let change = (oldData, req) => {
  const sid = +req.params.id;
  const found = oldData.find((el) => el.id === sid);
  const item = { sid, ...req.body };
  oldData[oldData.indexOf(found)] = item;
  return JSON.stringify(oldData, null, 4);
};
let remove = (oldData, req) => {
  oldData.pop();
  return JSON.stringify(oldData, null, 4);
};

module.exports = {
  add,
  change,
  remove
};