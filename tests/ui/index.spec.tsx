import * as React from 'react';
import { render } from '@testing-library/react';

describe('Home', () => {
  it('has expected content with deep render', () => {
    expect(render(<div/>)).toMatchSnapshot();
  });
});
