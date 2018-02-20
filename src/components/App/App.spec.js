import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('App', () => {
  it('should render correctly', () => {
    const props = {
      children: <div />,
    };

    const wrapper = shallow(<App {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
