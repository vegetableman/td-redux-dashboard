import { 
  ADD_WIDGET_SUCCESS, 
  MOVE_WIDGET,
  DELETE_WIDGET
} from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = new Array(9);
const cells = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET_SUCCESS:
      const match = _.indexOf(state, undefined);
      if (match > -1) {
        return _.map(state, (cell, index) => {
          if (index === match) {
            cell = _.get(action, 'response.result');
          }
          return cell;
        });
      }
      else {
        //insert new cell and add widget to it
      }
    
    case MOVE_WIDGET:
      const currPos = state.indexOf(action.id);
      return _.map(state, (cell, index) => {
        if (index === currPos) {
          cell = state[action.pos];
        }
        else if (index === action.pos) {
          cell = action.id;
        }
        return cell;
      });
      break;

    case DELETE_WIDGET:
      return _.without(state, action.id);
      break;

    default:
      return state;
  }
  return state;
};

export default cells;
