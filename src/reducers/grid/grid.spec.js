import { grid } from 'reducers';
import { 
  NEW_GRID_COMMAND,
  NEW_ROBOT_COMMAND,
  MOVE_ROBOT_TO_LOCATION 
} from 'constants';

describe('grid reducer', () => {
  
  it('can be imported from reducers', () => {
    expect(grid).to.exist;
  });

  it('should return the initial state', () => {
    const initialState = {
      arrays: null,
      lastRobotUpdated: null
    };;
    const state = grid(undefined,{});
    expect(state).to.deep.equal(initialState);
  });

  it('should handle NEW_GRID_COMMAND action', () => {
    const expectedState = {
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
      lastRobotUpdated:null
    };
    const state = grid(undefined,{
      type: NEW_GRID_COMMAND,
      x: 8,
      y: 8
    });
    expect(state).to.deep.equal(expectedState);
  });

  it('should handle NEW_ROBOT_COMMAND action', () => {
    const expectedState = {
      arrays: [
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{robotsAtPosition:[{name:'robot1234567',direction:'E', lostAtLocation: undefined}]},{},{}],
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
    };
    
    const state = grid(undefined, {
      type: NEW_GRID_COMMAND,
      x: 8,
      y: 8
    });
    
    const newState = grid(state, {
      type: NEW_ROBOT_COMMAND,
      x: 1,
      y: 5,
      direction: 'E',
      robotName: 'robot1234567'
    });
    expect(newState).to.deep.equal(expectedState);
  });

  it('should handle MOVE_ROBOT_TO_LOCATION action correctly', () => {
    const expectedState = {
      arrays: [
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{robotsAtPosition:[]},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{},{}],
        [{robotsAtPosition:[{name:'robot1234567',direction:'N', lostAtLocation: undefined}]},{},{},{},{},{},{},{}]
      ],
      lastRobotUpdated: {
        type: null,
        name: 'robot1234567',
        x: 7,
        y: 0,
        direction: 'N',
        robotName: 'robot1234567'
      }
    };

    let state = grid(undefined, {
      type: NEW_GRID_COMMAND,
      x: 8,
      y: 8
    });
    
    state = grid(state, {
      type: NEW_ROBOT_COMMAND,
      x: 1,
      y: 5,
      direction: 'E',
      robotName: 'robot1234567'
    });

    state = grid(state, {
      type: MOVE_ROBOT_TO_LOCATION,
      name: 'robot1234567',
      x: 7,
      y: 0,
      direction: 'N',
      robotName: 'robot1234567'
    });
    expect(state).to.deep.equal(expectedState);

  });

});