//? Напиши скрипт управления личным кабинетом интернет банка.
//? Есть объект account в котором необходимо реализовать методы
//? для работы с балансом и историей транзакций.
'use strict';
/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */

const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  lastId: 0,

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */

  createTransaction(amount, type) {
    let transaction = {};
    transaction.id = this.lastId + 1;
    this.lastId += 1;
    transaction.type = type;
    transaction.amount = amount;
    return this.transactions.push(transaction);
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */

  deposit(amount) {
    const type = Transaction.DEPOSIT;
    this.createTransaction(amount, type);
    this.balance += amount;
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */

  withdraw(amount) {
    const type = Transaction.WITHDRAW;
    if (this.balance >= amount) {
      this.createTransaction(amount, type);
      this.balance -= amount;
    } else {
      console.log('Cнятие такой суммы не возможно, недостаточно средств.');
    }
  },

  /*
   * Метод возвращает текущий баланс
   */

  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */

  getTransactionDetails(id) {
    for (this.transaction of this.transactions) {
      if (this.transaction.id === id) {
        return this.transaction;
      }
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */

  getTransactionTotal(type) {
    let total = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === type) {
        total += transaction.amount;
      }
    }

    return total;
  },
};


account.deposit(575);
console.log(account.getBalance());
account.deposit(45);
console.log(account.getBalance());
account.withdraw(76);
console.log(account.getBalance());
account.withdraw(34);
console.log(account.getBalance());
account.withdraw(800);
console.log(account.getTransactionDetails(3));

console.log(`Withdrawals: ${account.getTransactionTotal(Transaction.WITHDRAW)}`);
console.log(`Deposits: ${account.getTransactionTotal(Transaction.DEPOSIT)}`);
