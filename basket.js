class Basket {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }
}

function addToBasket(basket, item) {
  basket.items.push(item);
  basket.totalPrice += item.price;
}

function removeFromBasket(basket, item) {
  const index = basket.items.findIndex((i) => i.name === item.name);
  if (index > -1) {
    basket.totalPrice -= basket.items[index].price;
    basket.items.splice(index, 1);
  }
}

function transactionAllowed(userAccount, priceToPay) {
  return userAccount.balance >= priceToPay;
}

function payBasket(userAccount, basket) {
  const priceToPay = basket.totalPrice;
  if (transactionAllowed(userAccount, priceToPay)) {
    userAccount.balance -= priceToPay;
    basket.items = [];
    basket.totalPrice = 0;
    return true;
  }
  return false;
}
console.log("CI test en cours");

module.exports = {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket,
};
