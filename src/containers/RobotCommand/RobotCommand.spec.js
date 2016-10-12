import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { RobotCommand } from './RobotCommand';

describe('RobotCommand', () => {

  it('can be imported from containers', () => {
    expect(RobotCommand).to.exist;
  });

  it('should render a textarea', () => {
    const mockProps = { 
      sendCommandValueChange: () => {},
      commandValue: { value: ''}
    };
    const wrapper = shallow(<RobotCommand {...mockProps} />);
    expect(wrapper.find('textarea').length).to.equal(1);
  });

  it('should call an action creator on value change', () => {
    const mockProps = { 
      sendCommandValueChange: sinon.spy(),
      commandValue: { value: ''}
    };
    const wrapper = shallow(<RobotCommand {...mockProps} />);
    wrapper.find('textarea').simulate('change', {target: {value: 'FOO'}});
    expect(mockProps.sendCommandValueChange.calledWith('FOO')).to.equal(true);
  });

});