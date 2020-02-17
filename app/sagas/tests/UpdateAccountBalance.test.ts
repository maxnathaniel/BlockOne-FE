import { call, put } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';

import UpdateAccountBalance from '../UpdateAccountBalance';
import { creditAccount } from '../../api/accounts';

// jest.mock('../../api/accounts', () => ({
//   saveAccount: () => jest.fn(),
// }));

describe('UpdateAccountBalance saga', () => {

  it('should run to completion', () => {
    const testPayload = { payload: { to: 'Block One Savings', from: 'Test Account', amount: 5000 }, type: 'string' };
    const callResult = {
      code: 0,
      data: {
        'Block One Savings': {
          amount: 0,
          type: 'Savings',
          id: uuidv4(),
          isSelected: false,
          transactions: [
            {
              timestamp: '12/03/2020 14:30',
              action: 'Credit',
              description: 'N.A',
              amount: testPayload.payload.amount,
              currency: 'SGD'
            }
          ]
        },
        'Test Account': {
          amount: 0,
          type: 'Savings',
          id: uuidv4(),
          isSelected: false,
          transactions: [
            {
              timestamp: '12/03/2020 14:30',
              action: 'Credit',
              description: 'N.A',
              amount: testPayload.payload.amount,
              currency: 'SGD'
            }
          ]
        }
      }
    };
    const expectedPutIsLoading = put({ type: 'IS_LOADING', payload: { isLoading: true } });
    const expectedPutIsNotLoading = put({ type: 'IS_LOADING', payload: { isLoading: false } });
    const expectedPutSaveToStore = put({ type: 'UPDATE_ACCOUNT', payload: callResult.data });
    const expectedCall = call(creditAccount, testPayload.payload.to, testPayload.payload.from, testPayload.payload.amount);

    const gen = UpdateAccountBalance(testPayload);

    expect(gen.next().value).toEqual(expectedPutIsLoading);
    expect(gen.next().value).toEqual(expectedCall);
    expect(gen.next(callResult).value).toEqual(expectedPutIsNotLoading);
    expect(gen.next().value).toEqual(expectedPutSaveToStore);
    expect(gen.next().done).toEqual(true);
  });

  it('should terminate early if REST call returns an error code', () => {
    const testPayload = { payload: { to: 'Block One Savings', from: 'Test Account', amount: 5000 }, type: 'string' };
    const callResult = {
      code: 1,
      data: {}
    };
    const expectedPutIsLoading = put({ type: 'IS_LOADING', payload: { isLoading: true } });
    const expectedPutIsNotLoading = put({ type: 'IS_LOADING', payload: { isLoading: false } });
    const expectedPutError = put({ type: 'ERROR', payload: 'ERROR CREDITING ACCOUNT' });
    const expectedCall = call(creditAccount, testPayload.payload.to, testPayload.payload.from, testPayload.payload.amount);

    const gen = UpdateAccountBalance(testPayload);

    expect(gen.next().value).toEqual(expectedPutIsLoading);
    expect(gen.next().value).toEqual(expectedCall);
    expect(gen.next(callResult).value).toEqual(expectedPutError);
    expect(gen.next().value).toEqual(expectedPutIsNotLoading);

    expect(gen.next().done).toEqual(true);
  });
});