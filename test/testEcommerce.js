const assert = require("assert");
const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket,
} = require("../basket.js");

function testAdd() {
  const basket = new Basket();
  const item = { name: "product1", price: 10 };
  addToBasket(basket, item);
  assert.strictEqual(
    basket.totalPrice,
    10,
    "testAdd failed: totalPrice should be 10"
  );
}

function testRemove() {
  const basket = new Basket();
  const item = { name: "product1", price: 10 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  assert.strictEqual(
    basket.totalPrice,
    0,
    "testRemove failed: totalPrice should be 0"
  );
  assert.strictEqual(
    basket.items.length,
    0,
    "testRemove failed: items should be empty"
  );
}

function testAddRemove() {
  const basket = new Basket();
  const item1 = { name: "product1", price: 10 };
  const item2 = { name: "product2", price: 20 };
  addToBasket(basket, item1);
  addToBasket(basket, item2);
  removeFromBasket(basket, item1);
  assert.strictEqual(
    basket.totalPrice,
    20,
    "testAddRemove failed: totalPrice should be 20"
  );
  assert.strictEqual(
    basket.items.length,
    1,
    "testAddRemove failed: items should have 1 element"
  );
}

function testTransactionAllowed() {
  const userAccount = { balance: 50 };
  assert.strictEqual(
    transactionAllowed(userAccount, 40),
    true,
    "testTransactionAllowed failed: should be allowed"
  );
  assert.strictEqual(
    transactionAllowed(userAccount, 60),
    false,
    "testTransactionAllowed failed: should not be allowed"
  );
}

function testPayBasket() {
  const userAccount = { balance: 50 };
  const basket = new Basket();
  const item = { name: "product1", price: 30 };
  addToBasket(basket, item);

  // Successful payment
  const payment1 = payBasket(userAccount, basket);
  assert.strictEqual(
    payment1,
    true,
    "testPayBasket failed: payment1 should be successful"
  );
  assert.strictEqual(
    userAccount.balance,
    20,
    "testPayBasket failed: user balance should be 20"
  );
  assert.strictEqual(
    basket.totalPrice,
    0,
    "testPayBasket failed: basket total price should be 0"
  );

  // Refused payment
  const basket2 = new Basket();
  const item2 = { name: "product2", price: 30 };
  addToBasket(basket2, item2);
  const payment2 = payBasket(userAccount, basket2);
  assert.strictEqual(
    payment2,
    false,
    "testPayBasket failed: payment2 should be refused"
  );
  assert.strictEqual(
    userAccount.balance,
    20,
    "testPayBasket failed: user balance should remain 20"
  );
}

function testAppEcommerce() {
  try {
    console.log("Lancement des tests...");

    const tests = [
      testAdd,
      testRemove,
      testAddRemove,
      testTransactionAllowed,
      testPayBasket,
    ];

    for (const test of tests) {
      const result = test();
      if (result === false) {
        console.error(`❌ ${test.name} a échoué (retourne false)`);
        process.exit(1);
      }
    }

    console.log("✅ Tous les tests ont réussi !");
  } catch (error) {
    console.error("❌ Une erreur a été détectée !");
    console.error(error.message);
    process.exit(1);
  }
}

testAppEcommerce();
