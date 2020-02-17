import React from 'react';
import { render, fireEvent, queryByTestId, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import numeral from 'numeral';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import Account from '../index';

const accountId = '13535hr-35afa2-25252fa-26396ahb';
const defaultState = {
  accounts: {
    'Block One Savings': { amount: 100000, id: accountId, type: 'Savings', isSelected: true, transactions: [] },
  }
};

const ZERO_ERROR_MSG = 'Amount cannot be 0';
const NON_NUMER_ERROR_MSG = 'Amount must be a number';
const EXCEEDED_BALANCE_ERROR_MSG = 'Amount cannot be more than balance';
// it's much easier to mock the react-redux APIs than to actually use the <Provider /> component
jest.mock('react-redux', () => ({
  useSelector: () => defaultState,
  useDispatch: () => jest.fn(),
}));

const mockStore = configureMockStore([createSagaMiddleware()]);
const store = mockStore(defaultState);

const amount = '10000';
const accountName = 'Test Account';
const accountBalance = numeral(amount).format('$0,0.00');
const onSelectAccountFn = jest.fn();

describe('<Account />', () => {

  it('should render the various inner Elements', () => {
    const { container, getByText }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    expect(getByText(accountName)).toBeInTheDocument();
    expect(getByText(accountId)).toBeInTheDocument();
    expect(getByText(accountBalance)).toBeInTheDocument();
    expect(getByText('Savings account')).toBeInTheDocument();

    const dropdown = queryByTestId(container, 'select-account-dropdown');
    const amountInput = queryByTestId(container, 'amount');
    const cancelTransferBtn = queryByTestId(container, 'cancel-transfer-btn');
    const confirmTransferBtn = queryByTestId(container, 'confirm-transfer-btn');

    expect(dropdown).not.toBeInTheDocument();
    expect(amountInput).not.toBeInTheDocument();
    expect(cancelTransferBtn).not.toBeInTheDocument();
    expect(confirmTransferBtn).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should open Modal on click', () => {
    const { container, getByTestId }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    const transferMoneyBtn = getByTestId('send-icon');
    fireEvent(transferMoneyBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(getByTestId('select-account-dropdown')).toBeInTheDocument();
    expect(getByTestId('amount')).toBeInTheDocument();
    expect(getByTestId('cancel-transfer-btn')).toBeInTheDocument();
    expect(getByTestId('confirm-transfer-btn')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should close Modal on click of cancel btn', () => {
    const { container, getByTestId }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    const transferMoneyBtn = getByTestId('send-icon');
    fireEvent(transferMoneyBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(getByTestId('select-account-dropdown')).toBeInTheDocument();
    expect(getByTestId('amount')).toBeInTheDocument();
    expect(getByTestId('cancel-transfer-btn')).toBeInTheDocument();
    expect(getByTestId('confirm-transfer-btn')).toBeInTheDocument();

    const cancelBtn = getByTestId('cancel-transfer-btn');
    fireEvent(cancelBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const dropdown = queryByTestId(container, 'select-account-dropdown');
    const amountInput = queryByTestId(container, 'amount');
    const cancelTransferBtn = queryByTestId(container, 'cancel-transfer-btn');
    const confirmTransferBtn = queryByTestId(container, 'confirm-transfer-btn');

    expect(dropdown).not.toBeInTheDocument();
    expect(amountInput).not.toBeInTheDocument();
    expect(cancelTransferBtn).not.toBeInTheDocument();
    expect(confirmTransferBtn).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display zero error if user inputs zero value in amount input field', () => {
    const { container, getByTestId, getByText }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    const transferMoneyBtn = getByTestId('send-icon');
    fireEvent(transferMoneyBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(getByTestId('select-account-dropdown')).toBeInTheDocument();
    expect(getByTestId('amount')).toBeInTheDocument();
    expect(getByTestId('cancel-transfer-btn')).toBeInTheDocument();
    expect(getByTestId('confirm-transfer-btn')).toBeInTheDocument();

    // get a reference to the first child of element
    const inputField = getByTestId('amount').children[0];
    fireEvent.change(inputField, { target: { value: '0' } });

    expect(getByText(ZERO_ERROR_MSG)).toBeInTheDocument();

    const nonNumberErrorMsg = queryByText(container, NON_NUMER_ERROR_MSG);
    const exceededBalanceErrorMsg = queryByText(container, EXCEEDED_BALANCE_ERROR_MSG);

    expect(nonNumberErrorMsg).not.toBeInTheDocument();
    expect(exceededBalanceErrorMsg).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display non numeric error if user inputs non numeric value in amount input field', () => {
    const { container, getByTestId, getByText }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    const transferMoneyBtn = getByTestId('send-icon');
    fireEvent(transferMoneyBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(getByTestId('select-account-dropdown')).toBeInTheDocument();
    expect(getByTestId('amount')).toBeInTheDocument();
    expect(getByTestId('cancel-transfer-btn')).toBeInTheDocument();
    expect(getByTestId('confirm-transfer-btn')).toBeInTheDocument();

    // get a reference to the first child of element
    const inputField = getByTestId('amount').children[0];
    fireEvent.change(inputField, { target: { value: '#%@1' } });

    expect(getByText(NON_NUMER_ERROR_MSG)).toBeInTheDocument();

    const zeroErrorMsg = queryByText(container, ZERO_ERROR_MSG);
    const exceededBalanceErrorMsg = queryByText(container, EXCEEDED_BALANCE_ERROR_MSG);

    expect(zeroErrorMsg).not.toBeInTheDocument();
    expect(exceededBalanceErrorMsg).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display exceed balance error if user inputs a value > balance in amount input field', () => {
    const { container, getByTestId, getByText }
      = render(
        <Account
          amount={amount}
          name={accountName}
          index={0}
          id={accountId}
          type={'Savings'}
          isSelected={true}
          onHandleSelectAccount={onSelectAccountFn}
        />
      );
    const transferMoneyBtn = getByTestId('send-icon');
    fireEvent(transferMoneyBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(getByTestId('select-account-dropdown')).toBeInTheDocument();
    expect(getByTestId('amount')).toBeInTheDocument();
    expect(getByTestId('cancel-transfer-btn')).toBeInTheDocument();
    expect(getByTestId('confirm-transfer-btn')).toBeInTheDocument();

    // get a reference to the first child of element
    const inputField = getByTestId('amount').children[0];
    fireEvent.change(inputField, { target: { value: '110000' } });

    expect(getByText(EXCEEDED_BALANCE_ERROR_MSG)).toBeInTheDocument();

    const nonNumberErrorMsg = queryByText(container, NON_NUMER_ERROR_MSG);
    const zeroErrorMsg = queryByText(container, ZERO_ERROR_MSG);
    const exceededBalanceErrorMsg = queryByText(container, EXCEEDED_BALANCE_ERROR_MSG);

    expect(nonNumberErrorMsg).not.toBeInTheDocument();
    expect(zeroErrorMsg).not.toBeInTheDocument();
    expect(exceededBalanceErrorMsg).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});