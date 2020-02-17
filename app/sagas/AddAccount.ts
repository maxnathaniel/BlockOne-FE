import { call, put } from 'redux-saga/effects';
import { Action } from 'redux';

import { saveAccount } from 'api/accounts';

interface IAddAccountData {
  name: string;
  type: string;
}

interface IAddAccountPayload extends Action<string> {
  payload: IAddAccountData;
}

export default function* AddAccount(action: IAddAccountPayload) {
  const { payload: { name, type } } = action;

  try {
    yield put({ type: 'IS_LOADING', payload: { isLoading: true } });
    const { code, data } = yield call(saveAccount, name, type);

    if (code !== 0) {
      yield put({ type: 'ERROR', payload: 'ERROR SAVING ACCOUNT' });
      yield put({ type: 'IS_LOADING', payload: { isLoading: false } });
      return;
    }

    yield put({ type: 'IS_LOADING', payload: { isLoading: false } });
    yield put({ type: 'SAVE_ACCOUNT', payload: data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e.msg });
  }
}