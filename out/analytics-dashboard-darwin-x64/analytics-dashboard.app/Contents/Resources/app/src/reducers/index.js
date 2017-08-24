import { combineReducers } from 'redux';
import { widgetsById } from './widgets';
import {
  FETCH_WIDGET,
  ADD_WIDGET_SUCCESS
} from '../constants/ActionTypes';
import cells from './cells';
import users from './users';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_WIDGET:
      return true;

    case ADD_WIDGET_SUCCESS:
      return false;

    default:
      return state;
  }
  return state;
};

const rootReducer = combineReducers({
  cells,
  users,
  widgetsById,
  isFetching  
});

export default rootReducer;
