import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';

import AddAccount from './AddAccount';
import UpdateAccounBalance from './UpdateAccountBalance';

export default function* AppInit() {
  yield all(
    [
      takeEvery('ADD_ACCOUNT', AddAccount),
      takeEvery('CREDIT_ACCOUNT', UpdateAccounBalance)
    ]
  );
}