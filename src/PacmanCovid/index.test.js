import React from 'react';
import { render } from '@testing-library/react';
import { PacmanCovid } from './index';

test('renders learn react link', () => {
  const { getByText } = render(<PacmanCovid />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
