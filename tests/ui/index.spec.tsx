import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';
import * as enzyme from 'enzyme';

configure({adapter: new Adapter()});

describe('Home', () => {
  let wrapper;

  it('has expected content with deep render', () => {
    wrapper = enzyme.shallow(
      <div/>,
      {},
    );

    expect(wrapper).toMatchSnapshot();
  });
});
