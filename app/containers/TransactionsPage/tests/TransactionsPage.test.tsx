import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TransactionsPage from '../index';

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

const mock = require('react-redux');

describe('<TransactionsPage />', () => {
  it('should render the various inner Elements', () => {
    const { container, getByText } = render(<TransactionsPage />);
    expect(getByText('Block One Savings')).toBeInTheDocument();
    expect(getByText('$100,000.00')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});