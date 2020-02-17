import React from 'react';
import { render, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Table from '../index';

const data = [
  { timestamp: new Date().toLocaleDateString(), action: 'Credit', description: 'N.A', amount: '10000', currency: 'SGD' }
];

describe('<Table />', () => {
  it('should render the various rows in Table', () => {
    const { container, getByText } = render(<Table data={data} />);

    expect(getByText('Credit')).toBeInTheDocument();
    expect(getByText('$10,000.00')).toBeInTheDocument();
    expect(getByText('N.A')).toBeInTheDocument();
    expect(getByText('SGD')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});