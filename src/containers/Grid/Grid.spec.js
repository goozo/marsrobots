import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Grid } from './Grid';

describe('Grid', () => {

  it('can be imported from containers', () => {
    expect(Grid).to.exist;
  });

  it('renders correct number of grid columns and squares', () => {
    const mockProps = { 
      grid : {
        arrays: [
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}]
        ]
      }
    };
    const wrapper = shallow(<Grid {...mockProps} />);
    expect(wrapper.find('div.grid-column').length).to.equal(8);
    expect(wrapper.find('div.grid-square').length).to.equal(64);
  });

  it('renders a robot at the correct location on the grid', () => {
    const mockProps = { 
      grid : {
        arrays: [
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{robotsAtPosition:[{name:'robot1', direction:'N'}]},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}]
        ]
      }
    };
    const wrapper = shallow(<Grid {...mockProps} />);
    expect(wrapper.find('.grid').childAt(3).childAt(2).children().hasClass('robot')).to.be.true;
  });

});