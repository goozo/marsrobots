import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { App, Grid, RobotCommand } from 'containers';

describe('App', () => {

  it('can be imported from containers', () => {
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