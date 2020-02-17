import styled from '../../styles/styled-components';

interface ITransactionsContainerProps {
  position: string;
  height: string;
  width: string;
}

export const TransactionsContainer: any = styled.div<ITransactionsContainerProps>`
  position: absolute;
  right: 0;
  height: 100%;
  width: 85%;
  background-color: #192037;
  overflow: hidden;

  @media all and (max-width: 800px) {
    width: 100%;
  }
`;

export const TransactionsInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
  background-color: #272F4D;
  width: 95%;
  min-height: 140px;
  max-height: 200px;
  align-items: center;

  > * {
    flex: 1 100%;
  }
`;

export const AccountName = styled.h2`
  flex: 1;
  color: #FFF;
  margin: 0 !important;

  @media all and (max-width: 600px) {
    flex: 1 100%;
  }
`;

export const Balance = styled.h3`
  flex: 1;
  color: #FFF;
  margin: 0 !important;

  @media all and (max-width: 600px) {
    flex: 1 100%;
  }
`;

export const TransactionsWrapper = styled.div`
  min-height: 1200px;
  width: 95%;
  background-color: #272F4D;
  border-top: 2px solid #E94F90;
  margin: 10px auto;
`;