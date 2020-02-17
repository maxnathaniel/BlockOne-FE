import styled from '../../styles/styled-components';

interface ISidebarContainerProps {
  position: string;
  height: string;
  width: string;
}

export const TableContainer = styled.div`
  min-height: 400px;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  border-bottom: 2px solid #E94F90;

  > p {
    flex: 1;
  }
`;

export const HeaderCell = styled.p`
  padding: 5px;
  color: #FFF;
  margin: 5px 0 !important;
`;

export const Row = styled.div`
  display: flex;

  > p {
    flex: 1;
  }
`;

export const Cell = styled.p`
  padding: 5px;
  color: #FFF;
  margin: 5px 0 !important;
  border-bottom: 1px solid #005f7b;
`;