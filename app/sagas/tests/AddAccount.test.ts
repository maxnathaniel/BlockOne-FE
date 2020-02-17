import { call, put } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';

import AddAccount from '../AddAccount';
import { saveAccount } from '../../api/accounts';

// jest.mock('../../api/accounts', () => ({
//   saveAccount: () => jest.fn(),
// }));

describe('AddAccount saga', () => {

  it('should run to completion', () => {
    const accountID = uuidv4();
    const testPayload = { payload: { name: 'Test Account', type: 'Saving' }, type: 'string' };
    const callResult = {
      code: 0,
      data: {
        amount: 0,
        type: testPayload.payload.type,
        id: accountID,
        isSelected: false,
        transactions: []
      }
    };
    const expectedPutIsLoading = put({ type: 'IS_LOADING', payload: { isLoading: true } });
    const expectedPutIsNotLoading = put({ type: 'IS_LOADING', payload: { isLoading: false } });
    const expectedPutSaveToStore = put({ type: 'SAVE_ACCOUNT', payload: callResult.data });
    const expectedCall = call(saveAccount, testPayload.payload.name, testPayload.payload.type);

    const gen = AddAccount(testPayload);

    expect(gen.next().value).toEqual(expectedPutIsLoading);
    expect(gen.next().value).toEqual(expectedCall);
    expect(gen.next(callResult).value).toEqual(expectedPutIsNotLoading);
    expect(gen.next().value).toEqual(expectedPutSaveToStore);
    expect(gen.next().done).toEqual(true);
  });

  it('should terminate early if REST call returns an error code', () => {
    const testPayload = { payload: { name: 'Test Account', type: 'Saving' }, type: 'string' };
    const callResult = {
      code: 1,
      data: {}
    };
    const expectedPutIsLoading = put({ type: 'IS_LOADING', payload: { isLoading: true } });
    const expectedPutIsNotLoading = put({ type: 'IS_LOADING', payload: { isLoading: false } });
    const expectedPutError = put({ type: 'ERROR', payload: 'ERROR SAVING ACCOUNT' });
    const expectedCall = call(saveAccount, testPayload.payload.name, testPayload.payload.type);

    const gen = AddAccount(testPayload);

    expect(gen.next().value).toEqual(expectedPutIsLoading);
    expect(gen.next().value).toEqual(expectedCall);
    expect(gen.next(callResult).value).toEqual(expectedPutError);
    expect(gen.next().value).toEqual(expectedPutIsNotLoading);

    expect(gen.next().done).toEqual(true);
  });
});