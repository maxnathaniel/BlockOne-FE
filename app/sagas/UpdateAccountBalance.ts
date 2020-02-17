import { call, put } from 'redux-saga/effects';
import { Action } from 'redux';

import { creditAccount } from 'api/accounts';

interface ITransferAmountData {
  from: string;
  to: string;
  amount: number;
}

interface ITransferAmountPayload extends Action<string> {
  payload: ITransferAmountData;
}

export default function* UpdateAccounBalance(action: ITransferAmountPayload) {
  const { payload: { to, from, amount } } = action;

  yield put({ type: 'IS_LOADING', payload: { isLoading: true } });
  try {
    const { code, data } = yield call(creditAccount, to, from, amount);

    if (code !== 0) {
      yield put({ type: 'ERROR', payload: 'ERROR CREDITING ACCOUNT' });
      yield put({ type: 'IS_LOADING', payload: { isLoading: false } });
      return;
    }

    yield put({ type: 'IS_LOADING', payload: { isLoading: false } });
    yield put({ type: 'UPDATE_ACCOUNT', payload: data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e.msg });
  }
}