import { commandValue } from 'reducers';
import { COMMAND_VALUE_CHANGE } from 'constants';

describe('commandValue reducer', () => {
  
  it('can be imported from reducers', () => {
    expect(commandValue).to.exist;
  });

  it('should return the initial state', () => {
    const initialState = {
      value: ''
    };
    const state = commandValue(undefined,{});
    expect(state).to.deep.equal(initialState);
  });

  it('should handle COMMAND_VALUE_CHANGE action', () => {
    const expectedState = {
      value: '8 8 N\n'
    };
    const state = commandValue(undefined,{
      type: COMMAND_VALUE_CHANGE,
      value: '8 8 N\n'
    });
    expect(state).to.deep.equal(expectedState);
  });

});