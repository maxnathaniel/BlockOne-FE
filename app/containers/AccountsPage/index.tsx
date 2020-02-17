import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Input, Modal } from 'semantic-ui-react';

import Prompt from '../../components/Prompt';
import { addAccount, updateSelectedAccount } from '../../actions';
import {
  AccountSegment,
  Currency,
  Error,
  MyAccountsContainer,
  Space
} from './style';

import Account from '../../components/Account';

const accountOptions = [
  { key: 'Savings', text: 'Savings', value: 'Savings' },
  { key: 'Current', text: 'Current', value: 'Current' },
];

const MyAccounts: React.FC<{}> = memo(() => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [accountType, setAccountType] = useState<string>(accountOptions[0].value);
  const [blankNameError, setBlankNameError] = useState<string>('');

  const dispatch = useDispatch();

  const { accounts, userConfig: { selectedAccount }} = useSelector((state: any) => state);

  const onAddAccountHandler = useCallback((e: any) => {
    setShowModal(true);
  }, []);

  const onAddAccount = useCallback(() => {
    if (accountName.trim().length === 0) {
      setBlankNameError('Please enter an Account Name');
    } else {
      if (blankNameError.length !== 0) {
        setBlankNameError('');
      }
      dispatch(addAccount(accountName, accountType));
      setShowModal(false);
    }
  }, [accountName, accountType]);

  const onClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const onChange = useCallback((e: any) => {
    if (blankNameError.length !== 0) {
      setBlankNameError('');
    }
    setAccountName(e.target.value);
  }, [accountName]);

  const handleAccountTypeChange = useCallback((e: any, data: any) => {
    setAccountType(data.value);
  }, []);

  return (
    <MyAccountsContainer>
      <Prompt
        header="Welcome back!"
        message="Create a new account by clicking on the button below"
        onClickHandler={onAddAccountHandler}
      />
      <Modal size="mini" open={showModal} onClose={onClose}>
        <Modal.Header>Add Account</Modal.Header>
        <Modal.Content>
          <p>Account Name</p>
          <Input
            data-testid="account-name"
            transparent
            fluid
            type="text"
            onChange={onChange}
            placeholder="New Account Name"
          />
          <Error>{blankNameError}</Error>
          <p>Account Type</p>
          <Dropdown
            data-testid="account-dropdown"
            onChange={handleAccountTypeChange}
            options={accountOptions}
            fluid
            placeholder="Choose an Account Type"
            selection
            value={accountType}
          />
          <Space />
          <p>Account Currency</p>
          <Currency>SGD</Currency>
        </Modal.Content>
        <Modal.Actions>
          <Button
            data-testid="cancel-btn"
            color="red"
            content="Cancel"
            inverted
            size="medium"
            onClick={onClose}
          />
          <Button
            data-testid="add-account-btn"
            color="teal"
            content="Add Account"
            size="medium"
            onClick={onAddAccount}
          />
        </Modal.Actions>
      </Modal>
      <AccountSegment>
      {
        Object.keys(accounts).map((key: string, index: number) => (
          <Account
            key={key}
            index={index}
            name={key}
            amount={accounts[key].amount}
            id={accounts[key].id}
            type={accounts[key].type}
            isSelected={selectedAccount === key}
            onHandleSelectAccount={updateSelectedAccount}
          />
        ))
      }
      </AccountSegment>
    </MyAccountsContainer>
  );
});

export default MyAccounts;
