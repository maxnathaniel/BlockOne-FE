
import uuidv4 from 'uuid/v4';

interface IAccountsState {
  [key: string]: IAccountState;
}

interface IAccountState {
  amount: number;
  id: string;
  type: string;
  isSelected: boolean;
  transactions: any[];
}

const defaultState: IAccountsState = {
  'Block One Savings': { amount: 100000, id: uuidv4(), type: 'Savings', isSelected: true, transactions: [] },
};

const accounts = (state: IAccountsState = defaultState, action: any) => {
  switch (action.type) {
    case 'SAVE_ACCOUNT':
      return action.payload;
    case 'REMOVE_ACCOUNT':
      return action.payload;
    case 'UPDATE_ACCOUNT':
      return action.payload;
    default:
      return state;
  }
};

export default accounts;