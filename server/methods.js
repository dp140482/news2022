let add = (oldData, req) => {
  const id = oldData.length;
  const item = { id, ...req.body };
  oldData.push(item);
  return JSON.stringify(oldData, null, 4);
};
let change = (payments, req) => {
  let find = payments.items.find((el) => el.id === +req.params.id);
  payments.totalAmount =
    payments.totalAmount - (+find.amount - +req.body.amount);
  find.amount = req.body.amount;
  find.date = req.body.date;
  find.category = req.body.category;
  return JSON.stringify(payments, null, 4);
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