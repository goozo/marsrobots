import { combineReducers } from 'redux';
import commandValue from './commandValue/commandValue';
export commandValue from './commandValue/commandValue';
import grid from './grid/grid';
export grid from './grid/grid';

const rootReducer = combineReducers({
  commandValue,
  grid
});

export default rootReducer;