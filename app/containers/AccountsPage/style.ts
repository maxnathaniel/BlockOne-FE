import styled from '../../styles/styled-components';

interface IMyAccountsContainerProps {
  position: string;
  height: string;
  width: string;
}

export const MyAccountsContainer: any = styled.div<IMyAccountsContainerProps>`
  position: absolute;
  right: 0;
  height: 100%;
  width: 85%;
  background-color: #192037;

  @media all and (max-width: 800px) {
    width: 100%;
  }
`;

export const AccountSegment = styled.div`
  margin: 10px 0;
  min-height: 200px;
`;

export const Error = styled.p`
  color: red;
`;

export const Space = styled.p`
`;

export const Currency = styled.p`
  color: #00b5ad;
  font-weight: 700;
`;