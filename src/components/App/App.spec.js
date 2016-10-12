import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Grid, RobotCommand } from 'containers';
import { App } from 'components';

describe('App', () => {

  it('can be imported from components', () => {
    expect(App).to.exist;
  });

  it('should render a RobotCommand', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<RobotCommand />)).to.equal(true);
  });

  it('should render a Grid', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Grid />)).to.equal(true);
  });

});