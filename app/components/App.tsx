import React from 'react';
import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from '../styles/styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

import GlobalStyle from '../global-styles';
import MyAccounts from '../containers/AccountsPage';
import Transactions from '../containers/TransactionsPage';
import Sidebar from './Sidebar';

const AppContainer = styled.div<any>`
  background-color: grey;
`;

// we can either a global theme here
const theme = {
  backgroundColor: '#FFF',
  buttonsColor: 'blue'
};

function App() {
  const isLoading = useSelector((state: any) => state.userConfig.isLoading);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle darkTheme />
        <Dimmer active={isLoading} >
          <Loader size="huge" active={isLoading} />
        </Dimmer>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={MyAccounts} />
          <Route path="/transactions" component={Transactions} />
        </Switch>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;