import { delay, select } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

// MOCK API
function* saveAccount (name: string, type: string) {
  const accounts = yield select(state => state.accounts);

  yield delay(1000);

  return yield Promise.resolve(
    {
      code: 0,
      data: {
        ...accounts,
        [name]: {
          amount: 0,
          type,
          id: uuidv4(),
          isSelected: false,
          transactions: []
        }
      }
    }
  );
}

// MOCK API
function* creditAccount (to: string, from: string, amount: number) {
  const accounts = yield select(state => state.accounts);
  const accountToCredit = yield select(state => state.accounts[to]);
  const accountToDebit = yield select(state => state.accounts[from]);

  accountToCredit.amount = accountToCredit.amount + Number(amount);
  accountToDebit.amount = accountToDebit.amount - Number(amount);

  accountToCredit.transactions.unshift(
    {
      timestamp: moment().format('MMMM Do YYYY, h:mm'),
      action: 'Credit',
      description: 'N.A',
      amount,
      currency: 'SGD'
    }
  );

  accountToDebit.transactions.unshift(
    {
      timestamp: moment().format('MMMM Do YYYY, h:mm'),
      action: 'Debit',
      description: 'N.A',
      amount,
      currency: 'SGD'
    }
  );

  yield delay(1000);

  return yield Promise.resolve(
    {
      code: 0,
      data: {
        ...accounts,
        [to]: accountToCredit,
        [from]: accountToDebit,
        }
    }
  );
}

export {
  saveAccount,
  creditAccount
};
