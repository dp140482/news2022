let add = (payments, req) => {
  const id = payments.items.length + 1;
  const item = { id, ...req.body };
  payments.items.push(item);
  payments.totalCount = payments.items.length;
  payments.totalAmount = payments.totalAmount + req.body.amount;
  return JSON.stringify(payments, null, 4);
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
let remove = (payments, req) => {
  const item = payments.items.find((el) => el.id === +req.params.id);
  const newPaymentsItems = payments.items.filter(
    (el) => el.id !== +req.params.id
  );
  const newTotalPages = newPaymentsItems.length;
  const newTotalAmount = payments.totalAmount - item.amount;
  const newPayments = {
    items: newPaymentsItems,
    totalCount: newTotalPages,
    totalAmount: newTotalAmount,
  };
  return JSON.stringify(newPayments, null, 4);
};

module.exports = {
  add,
  change,
  remove
};