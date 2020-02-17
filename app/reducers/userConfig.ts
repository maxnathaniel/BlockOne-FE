
interface IUserConfigState {
  prompt: any;
  selectedAccount: string;
  isLoading: boolean;
}

const defaultState = {
  prompt: { addAccount: false },
  selectedAccount: 'Block One Savings',
  isLoading: false
};

const userConfig = (state: IUserConfigState = defaultState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_ADD_ACCOUNT_MODAL':
      return {
        ...state,
        prompt: {
          ...state.prompt,
          addAccount: !state.prompt.addAccount,
        }
      };
    case 'UPDATE_SELECTED_ACCOUNT':
      return {
        ...state,
        selectedAccount: action.payload.accountName
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
      default:
        return state;
    }
};

export default userConfig;