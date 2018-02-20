import Home from './Home';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Home', () => {
  it('should render correctly', () => {
    const props = {
      message: 'Hello world',
    };

    const wrapper = shallow(<Home {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
