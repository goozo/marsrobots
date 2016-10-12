import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { sendCommandValueChange } from 'actions';
import { rotate } from './sendCommandValueChange';
import { 
  COMMAND_VALUE_CHANGE,
  NEW_GRID_COMMAND,
  NEW_ROBOT_COMMAND,
  MOVE_ROBOT_TO_LOCATION
} from 'constants';

describe('Action creator sendCommandValueChange', () => {
  
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should emit a COMMAND_VALUE_CHANGE', () => {
    const expectedAction = [{ 
      type: COMMAND_VALUE_CHANGE, 
      value: 'foo'
    }];
    store.dispatch(sendCommandValueChange('foo'));
    expect(store.getActions()).to.deep.equal(expectedAction);
  });

  it('should emit a NEW_GRID_COMMAND if a new grid command is detected', () => {
    store.dispatch(sendCommandValueChange('8 8\n'));
    const expectedActions = [
      { 
        type: NEW_GRID_COMMAND, 
        x: 8,
        y: 8
      },
      { 
        type: COMMAND_VALUE_CHANGE, 
        value: '8 8\n'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should emit a NEW_ROBOT_COMMAND if a new robot command is detected', () => {
    const timeStamp = new Date().getTime();
    store.dispatch(sendCommandValueChange('3 4 N\n', timeStamp));
    const expectedActions = [
      { 
        type: NEW_ROBOT_COMMAND, 
        x: 3,
        y: 4,
        direction: 'N',
        robotName : 'robot' + timeStamp
      },
      { 
        type: COMMAND_VALUE_CHANGE, 
        value: '3 4 N\n'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('has a rotate method', () => {
    expect(rotate).to.exist;
  });

  it('the rotate method returns the correct direction', () => {
    expect(rotate(-1,'E')).to.equal('N');
    expect(rotate(1,'E')).to.equal('S');
    expect(rotate(1,'W')).to.equal('N');
    expect(rotate(-1,'N')).to.equal('W');
  });

  it('should emit a correct MOVE_ROBOT_TO_LOCATION after a rotation move command', () => {
    const store = mockStore({
      grid: {
        arrays: null,
        lastRobotUpdated: {
          type: null,
          x: 1,
          y: 5,
          direction: 'E',
          robotName: 'robot1234567'
        }
      }
    });
    store.dispatch(sendCommandValueChange('RRR\n'));
    const expectedActions = [
      { 
        type: MOVE_ROBOT_TO_LOCATION,
        robotName: 'robot1234567',
        x: 1,
        y: 5,
        direction: 'N'
      },
      { 
        type: COMMAND_VALUE_CHANGE, 
        value: 'RRR\n1 5 N\n'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should emit a correct MOVE_ROBOT_TO_LOCATION after a move command', () => {
    const store = mockStore({
      grid: {
        arrays: [
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}]
        ],
        lastRobotUpdated: {
          type: null,
          x: 1,
          y: 5,
          direction: 'E',
          robotName: 'robot1234567'
        }
      }
    });
    store.dispatch(sendCommandValueChange('FFFLFRR\n'));
    const expectedActions = [
      { 
        type: MOVE_ROBOT_TO_LOCATION,
        robotName: 'robot1234567',
        x: 4,
        y: 6,
        direction: 'S'
      },
      { 
        type: COMMAND_VALUE_CHANGE, 
        value: 'FFFLFRR\n4 6 S\n'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should mark the robot as lostAtLocation with the last known location if it gets lost', () => {
    const store = mockStore({
      grid: {
        arrays: [
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{},{}]
        ],
        lastRobotUpdated: {
          type: null,
          x: 1,
          y: 5,
          direction: 'E',
          robotName: 'robot1234567'
        }
      }
    });
    store.dispatch(sendCommandValueChange('FFFFFFFFFFFFF\n'));
    const expectedActions = [
      { 
        type: MOVE_ROBOT_TO_LOCATION,
        robotName: 'robot1234567',
        x: 7,
        y: 5,
        direction: 'E',
        lostAtLocation: true
      },
      { 
        type: COMMAND_VALUE_CHANGE, 
        value: 'FFFFFFFFFFFFF\n7 5 E LOST\n'
      }
    ];
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

});