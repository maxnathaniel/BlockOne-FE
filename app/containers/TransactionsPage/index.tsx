import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

import Table from '../../components/Table';

import {
  AccountName,
  Balance,
  TransactionsContainer,
  TransactionsInfo,
  TransactionsWrapper
} from './style';

const Transactions: React.FC<{}> = memo(() => {
  const { accounts, userConfig: { selectedAccount } } = useSelector((state: any) => state);
  const selectedAccountBalance = accounts[selectedAccount].amount;
  const transactions = accounts[selectedAccount].transactions;

  return (
    <TransactionsContainer>
      <TransactionsInfo>
        <AccountName>{selectedAccount}</AccountName>
        <Balance>{numeral(selectedAccountBalance).format('$0,0.00')}</Balance>
      </TransactionsInfo>
      <TransactionsWrapper>
        <Table data={transactions} />
      </TransactionsWrapper>
    </TransactionsContainer>
  );
});

export default Transactions;