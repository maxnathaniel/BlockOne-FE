import styled from '../../styles/styled-components';

interface IAccountContainerProps {
  'min-width': string;
  'max-width': string;
  index: number;
  isSelected: boolean;
}

export const AccountContainer: any = styled.div<IAccountContainerProps>`
  display: block;
  color: #E0E3ED;
  cursor: pointer;
  border: ${props => props.isSelected ? '1px solid #E94F90' : ''};
  min-height: 90px;
  background-color: #272F4D;
  width: 95%;
  margin: 10px auto 0 auto;
  padding: 5px 20px;

  @media all and (max-width: 800px) {
    width: 90%;
  }
`;

export const AccountBody = styled.div`

`;

export const Top = styled.div`
  margin: 10px 0;
  text-align: left;
  width: 100%;
`;

export const Left = styled.div`
  display: inline-block;
  width: 50%;
`;

export const Right = styled.div`
  display: inline-block;
  text-align: right;
  width: 50%;
`;

export const AccountName = styled.h4`
  display: block;
  color: #66FCF1;
  margin: 10px 0 0 0;
`;

export const AccountType = styled.p`
  display: block;
  color: #E0E3ED;
  margin: 0;
`;

export const AccountAmount = styled.p`
  display: inline;
  margin: 5px 10px 0 0;
  text-align: right;
`;

export const AccountNumber = styled.p`
  margin: 5px 0 0 0;
`;

export const BalanceAmount = styled.h2`
  color: #66FCF1;
  margin: 0 0 0 0;
  text-align: center;
`;

export const BalanceLabel = styled.p`
  color: #FFF;
  font-size: 1em;
  text-align: center;
`;

export const MainAccountLabel = styled.span`
  padding: 2px 4px;
  max-width: 100px;
  margin-left: 20px;
  font-size: 0.8em;
  font-weight: 500;
  color: #40E0D0;
`;

export const AccountFooter = styled.div`
  border-top: 1px solid #dedede;
  color: #ababab;
  height: 10px;
`;

export const DropdownContainer = styled.div`
  display: inline-block;
`;

export const Error = styled.p`
  color: red;
  margin: 0;
`;

export const Label = styled.p`
  margin: 10px 0 5px 0;
`;

export const TransferMessage = styled.p`
  margin: 10px 0 0 0;
  color: #66FCF1;
`;