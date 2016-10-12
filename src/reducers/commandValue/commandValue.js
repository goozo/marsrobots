import { COMMAND_VALUE_CHANGE } from 'constants';

const initialState = {
  value:''
};

const commandValue = (state = initialState, action) => {
  switch (action.type) {
    case COMMAND_VALUE_CHANGE:
      return {
        ...state,
        value: action.value
      }
    default:
      return state
  }
}

export default commandValue;