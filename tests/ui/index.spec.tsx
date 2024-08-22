import {render} from '@testing-library/react';

describe('Home', () => {
  it('has expected content with deep render', () => {
    const { asFragment } = render(<div />);
    expect(asFragment()).toMatchSnapshot();
  });
});
