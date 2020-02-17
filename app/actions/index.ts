
export const addAccount = (name: string, type: string) => ({ type: 'ADD_ACCOUNT', payload: { name, type } });
export const creditAccount = (
  from: string,
  to: string,
  amount: number
) => ({ type: 'CREDIT_ACCOUNT', payload: { from, to, amount } });
export const updateSelectedAccount = (accountName: string) => ({ type: 'UPDATE_SELECTED_ACCOUNT', payload: { accountName }});
