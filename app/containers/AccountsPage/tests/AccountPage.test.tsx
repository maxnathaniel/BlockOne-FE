import React from 'react';
import { queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AccountPage from '../index';

const accountId = '13535hr-35afa2-25252fa-26396ahb';
const defaultState = {
  accounts: {
    'Block One Savings': { amount: 100000, id: accountId, type: 'Savings', isSelected: true, transactions: [] },
  },
  userConfig: { selectedAccount: 'Block One Savings' }
};

jest.mock('react-redux', () => ({
  useSelector: () => defaultState,
  useDispatch: () => jest.fn(),
}));

describe('<AccountPage />', () => {
  it('should render the various inner Elements', () => {
    const { container, getByText } = render(<AccountPage />);
    expect(getByText('Welcome back!')).toBeInTheDocument();
    expect(getByText('Create a new account by clicking on the button below')).toBeInTheDocument();

    const modalHeader = queryByText(container, 'Add Account');
    const accountNameLabel = queryByText(container, 'Account Name');
    const accountTypeLabel = queryByText(container, 'Account Type');
    const accountCurrency = queryByText(container, 'Account Currency');
    expect(modalHeader).not.toBeInTheDocument();
    expect(accountNameLabel).not.toBeInTheDocument();
    expect(accountTypeLabel).not.toBeInTheDocument();
    expect(accountCurrency).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should open Add Account Modal on click of Add Btn', () => {
    const { container, getByText, getAllByText, getByTestId } = render(<AccountPage />);

    const btn = getByText('Create New Account');
    btn.click();

    expect(getAllByText('Add Account')).toHaveLength(2);
    expect(getByText('Account Name')).toBeInTheDocument();
    expect(getByText('Account Type')).toBeInTheDocument();
    expect(getByText('Account Currency')).toBeInTheDocument();
    expect(getByTestId('account-name')).toBeInTheDocument();
    expect(getByTestId('account-dropdown')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});