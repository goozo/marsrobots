import {
  COMMAND_VALUE_CHANGE,
  NEW_GRID_COMMAND,
  NEW_ROBOT_COMMAND,
  MOVE_ROBOT_TO_LOCATION,
  OUPUT_FINAL_POSITION
} from 'constants';

const lastCharIsNewLine = (input) => {
  return input.slice(-1) === '\n';
};

const getLastLine = (input) => {
  const lines = input.split('\n');
  return lines[lines.length - 2];
};

const isNewGridCommand = (command) => {
  const re = /^\d{1,2} \d{1,2}$/;
  return re.test(command);
};

const isNewRobotCommand = (command) => {
  const re = /^\d{1,2} \d{1,2} [NESW]$/i;
  return re.test(command);
};

const isMoveRobotCommand = (command) => {
  const re = /^[LRF]+$/i;
  return re.test(command);
};

export const rotate = (rotation, currentDirection) => {
  const directions = 'NESW';
  let i = directions.indexOf(currentDirection);
  i = i + rotation;
  if(i < 0){
    i = i + 4;
  }
  if(i > 3){
    i = i - 4;
  }
  return directions[i];
};

const robotIsLost = ({ x, xAdd, y, yAdd, arrays }) => {
  if((x + xAdd) > (arrays.length - 1) || (x + xAdd) < 0){
    return true
  }
  if((y + yAdd) > (arrays[0].length - 1) || (y + yAdd) < 0){
    return true
  }
  return false;
};

const updatePositionAndSetLost = ({ x, xAdd = 0, y, yAdd = 0, arrays }) => {
  if(robotIsLost({x, xAdd, y, yAdd, arrays})){
    return {
      x,
      y,
      lostAtLocation: true
    }
  }
  return {
    x: x + xAdd,
    y: y + yAdd
  }
}

const moveForward = ({ x, y, direction }, arrays) => {
  switch(direction){
    case 'N':
      return updatePositionAndSetLost({x, y, yAdd: 1, arrays});
    case 'E':
      return updatePositionAndSetLost({x, y, xAdd: 1, arrays});
    case 'S':
      return updatePositionAndSetLost({x, y, yAdd: -1, arrays});
    case 'W':
      return updatePositionAndSetLost({x, y, xAdd: -1, arrays});
    default:
      return { x, y };
  };
};

const getNewRobotPosition = ({ grid: { lastRobotUpdated, arrays } }, moveCommand) => {
  return moveCommand.split('').reduce((robot, command) => {
    if(robot.lostAtLocation){
      return robot;
    }
    switch(command){
      case 'L':
        return {
          ...robot,
          direction: rotate(-1, robot.direction)
        }
      case 'R':
        return {
          ...robot,
          direction: rotate(1, robot.direction)
        }
      case 'F':
        return {
          ...robot,
          ...moveForward(robot, arrays)
        }
      default:
        return robot
    }
  }, {...lastRobotUpdated});
};

const sendCommandValueChange = (value, timeStamp = new Date().getTime()) => {
  return (dispatch, getState) => {
    if(lastCharIsNewLine(value)){
      
      const command = getLastLine(value);
      
      if(isNewGridCommand(command)){
        const gridCoords = command.split(' ');
        dispatch({
          type: NEW_GRID_COMMAND,
          x: parseInt(gridCoords[0]),
          y: parseInt(gridCoords[1])
        });
      } else if(isNewRobotCommand(command)){
        const robotPositon = command.split(' ');
        dispatch({
          type: NEW_ROBOT_COMMAND,
          x: parseInt(robotPositon[0]),
          y: parseInt(robotPositon[1]),
          direction: robotPositon[2],
          robotName: 'robot' + timeStamp
        });
      } else if(isMoveRobotCommand(command)){
        const newPosition = getNewRobotPosition(getState(), command);
        dispatch({
          ...newPosition,
          type: MOVE_ROBOT_TO_LOCATION
        });
        value = value + newPosition.x + ' ' + newPosition.y + ' ' + newPosition.direction + (newPosition.lostAtLocation ? ' LOST' : '') + '\n';
      }
    }
    dispatch({
      type: COMMAND_VALUE_CHANGE,
      value
    });
  }
}

export default sendCommandValueChange;