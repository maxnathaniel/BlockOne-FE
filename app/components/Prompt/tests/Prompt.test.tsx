import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Prompt from '../index';

const onClickHandlerFn = jest.fn();

describe('<Prompt />', () => {
  it('should render the various inner Elements', () => {
    const { container, getByText }
      = render(<Prompt header="Test Header" message="Welcome" onClickHandler={onClickHandlerFn} />);
    expect(getByText('Test Header')).toBeInTheDocument();
    expect(getByText('Welcome')).toBeInTheDocument();
    expect(getByText('Create New Account')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should invoke onClickHandlerFun on click', () => {
    const { container, getByText }
      = render(<Prompt header="Test Header" message="Welcome" onClickHandler={onClickHandlerFn} />);
    const btn = getByText('Create New Account');
    btn.click();
    expect(onClickHandlerFn).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});