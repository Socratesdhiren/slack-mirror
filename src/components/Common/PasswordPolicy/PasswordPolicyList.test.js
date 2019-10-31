import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PasswordPolicyList from './PasswordPolicyList';
import mockResponse from '../../../../__mocks__/passwordPolicy';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

const props = {
  passwordPolicies: mockResponse.passwordPolicy.data.data,
  password: 'Test@123',
};

describe('<PasswordPolicies />', () => {
  beforeEach(() => {
    wrapper = mount(<PasswordPolicyList {...props} />);
  });

  it('Should test the principle class function', () => {
    expect(wrapper.containsMatchingElement('ul'));
  });
});
