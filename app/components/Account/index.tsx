import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Input, Icon, Modal } from 'semantic-ui-react';
import numeral from 'numeral';

import { creditAccount } from '../../actions';
import {
  AccountContainer,
  AccountName,
  AccountType,
  AccountAmount,
  AccountNumber,
  BalanceAmount,
  BalanceLabel,
  Top,
  Left,
  Right,
  Error,
  Label,
  TransferMessage
} from './style';

interface IAccountProps {
  amount: string;
  name: string;
  index: number;
  id: string;
  type: string;
  isSelected: boolean;
  onHandleSelectAccount: (accountName: string) => void;
}

const Account: React.FC<IAccountProps> = memo(props => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [nonNumericError, setNonNumericError] = useState<boolean>(false);
  const [zeroAmountError, setZeroAmountError] = useState<boolean>(false);
  const [exceededBalance, setExceededBalance] = useState<boolean>(false);
  const accountsList = Object.keys(useSelector((state: any) => state.accounts));
  const dispatch = useDispatch();

  const accountBalance = numeral(props.amount).format('$0,0.00');
  const nonNumericRegex = /[^0-9.]/;
  const zeroRegex = /^0+/;

  const onSelectAccount = useCallback((e: any, data: any) => {
    setSelectedAccount(data.value);
  }, []);

  const onTransferAmount = useCallback(() => {
    if (amount === 0 || !amount) {
      setZeroAmountError(true);
    } else {
      dispatch(creditAccount(props.name, selectedAccount, amount));
      setShowTransferModal(false);
    }
  }, [amount]);

  const onCloseTransactionsModal = useCallback(() => {
    setShowTransferModal(false);
    setNonNumericError(false);
    setZeroAmountError(false);
    setExceededBalance(false);
    setAmount(0);
  }, []);

  const onChange = useCallback((e: any) => {
    const amount = e.target.value;

    if (nonNumericRegex.test(amount)) {
      setNonNumericError(false);
    }

    if (zeroAmountError && amount !== 0) {
      setZeroAmountError(false);
    }

    if (exceededBalance && amount <= props.amount) {
      setExceededBalance(false);
    }

    if (nonNumericRegex.test(amount)) {
      setNonNumericError(true);
    } else if (zeroRegex.test(amount)) {
      setZeroAmountError(true);
    }

    if (amount > props.amount) {
      setExceededBalance(true);
    }

    setAmount(amount);
  }, [amount]);

  const onClick = useCallback((e: any) => {
    setShowTransferModal(true);
  }, []);

  const onClickAccount = useCallback((e: any) => {
    dispatch(props.onHandleSelectAccount(props.name));
  }, []);

  const accountOptions = accountsList.map(account => ({
    key: account, value: account, text: account })
  ).filter(account => account.value !== props.name);

  return (
    <AccountContainer index={props.index} isSelected={props.isSelected} onClick={onClickAccount}>
      <Modal size="mini" open={showTransferModal} onClose={onCloseTransactionsModal}>
        <Modal.Header>Transfer Money</Modal.Header>
        <Modal.Content>
          <BalanceAmount>{accountBalance}</BalanceAmount>
          <BalanceLabel>Balance</BalanceLabel>
          <Label>Recipent</Label>
          <Dropdown
            data-testid="select-account-dropdown"
            placeholder="Select Account"
            search
            selection
            fluid
            options={accountOptions}
            onChange={onSelectAccount}
          />
          <Label>Amount</Label>
          <Input
            data-testid="amount"
            transparent
            fluid
            type="text"
            onChange={onChange}
            placeholder="Amount..."
          />
          <Error data-testid="zero-amount-error">{zeroAmountError && 'Amount cannot be 0'}</Error>
          <Error data-testid="non-numeric-error">{nonNumericError && 'Amount must be a number'}</Error>
          <Error data-testid="exceeded-balance-error">{exceededBalance && 'Amount cannot be more than balance'}</Error>
          <TransferMessage>Transfering {numeral(amount).format('$0,0.00')} to {selectedAccount}</TransferMessage>
        </Modal.Content>
        <Modal.Actions>
          <Button
            data-testid="cancel-transfer-btn"
            color="red"
            size="medium"
            inverted
            onClick={onCloseTransactionsModal}
          >
            Cancel
          </Button>
          <Button
            data-testid="confirm-transfer-btn"
            color="teal"
            content="Confirm"
            size="medium"
            disabled={nonNumericError || zeroAmountError}
            onClick={onTransferAmount}
          />
        </Modal.Actions>
      </Modal>
      <Top>
        <AccountNumber>{props.id}</AccountNumber>
      </Top>
      <Left>
          <AccountName>
            {props.name}
        </AccountName>
        <AccountType>
          {props.type} account
        </AccountType>
      </Left>
      <Right>
        <AccountAmount>{accountBalance}</AccountAmount>
        <Icon data-testid="send-icon" name="send" onClick={onClick} />
      </Right>
    </AccountContainer>
  );
});

export default Account;