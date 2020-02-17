import React from 'react';
import numeral from 'numeral';
import { Cell, TableContainer, Header, HeaderCell, Row } from './style';

interface ITableProps  {
  data: any[];
}

const Table: React.FC<ITableProps> = (props) => {

  return (
    <TableContainer>
      <Header>
        <HeaderCell>Timestamp</HeaderCell>
        <HeaderCell>Action</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell>Amount</HeaderCell>
        <HeaderCell>Currency</HeaderCell>
      </Header>
      {
        props.data.length > 0 && props.data.map((row: any, index: number) =>
          (
            <Row key={index}>
              <Cell>{row.timestamp}</Cell>
              <Cell>{row.action}</Cell>
              <Cell>{row.description}</Cell>
              <Cell>{numeral(row.amount).format('$0,0.00')}</Cell>
              <Cell>{row.currency}</Cell>
            </Row>
          )
        )
      }


    </TableContainer>
  );
};

export default Table;