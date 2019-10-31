import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Description from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Component --- Description', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Description />);
  });

  it('should render correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
