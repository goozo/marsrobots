import { 
  NEW_GRID_COMMAND,
  NEW_ROBOT_COMMAND,
  MOVE_ROBOT_TO_LOCATION
} from 'constants';

const initialState = {
  arrays: null,
  lastRobotUpdated: null
};

const initialGridPointState = {};

const createGridArrays = (x,y) => {
  return Array.apply(null, Array(x)).map(() => Array.apply(null, Array(y)).map(() => initialGridPointState));
};

const pushToNewArray = (oldArr = [], newItem) => {
  return [
    ...oldArr,
    newItem
  ];
};

const addRobotToGrid = (arrays, action) => {
  return arrays.map((x, xCoord) => {
    return x.map((y, yCoord) => {
      if(xCoord === action.x && yCoord === action.y){
        return {
          ...y,
          robotsAtPosition: pushToNewArray(y.robotsAtPosition, {
            name: action.robotName, 
            direction: action.direction,
            lostAtLocation: action.lostAtLocation
          })
        }
      }
      return y;
    })
  });
};

const removeRobotFromGrid = (arrays, robotName) => {
  return arrays.map( x => {
    return x.map(y => {
      if(y.robotsAtPosition){
        return {
          ...y,
          robotsAtPosition: y.robotsAtPosition.reduce((prev, curr) => {
            if(curr.name !== robotName){
              prev.push(curr);
            }
            return prev;
          },[])
        }
      }
      return y;
    });
  });
};

const moveRobotOnGrid = (arrays, action) => {
  const newArrays = removeRobotFromGrid(arrays, action.robotName);
  return addRobotToGrid(newArrays, action);
};

const grid = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GRID_COMMAND:
      return {
        ...state,
        arrays: createGridArrays(action.x, action.y)
      }
    case NEW_ROBOT_COMMAND:
      return {
        ...state,
        arrays: addRobotToGrid(state.arrays, action),
        lastRobotUpdated: {
          ...action,
          type: null
        }
      }
    case MOVE_ROBOT_TO_LOCATION:
      return {
        ...state,
        arrays: moveRobotOnGrid(state.arrays, action),
        lastRobotUpdated: {
          ...action,
          type: null
        }
      }
    default:
      return state
  }
};

export default grid;