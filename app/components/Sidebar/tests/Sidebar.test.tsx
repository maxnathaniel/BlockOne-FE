import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  it('should render the menu items', () => {
    const { container, getByText }
      = render(<MemoryRouter><Sidebar /></MemoryRouter>);
    expect(getByText('Accounts')).toBeInTheDocument();
    expect(getByText('Transactions')).toBeInTheDocument();
    expect(getByText('Services')).toBeInTheDocument();
    expect(getByText('Investment')).toBeInTheDocument();
    expect(getByText('Loans')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});