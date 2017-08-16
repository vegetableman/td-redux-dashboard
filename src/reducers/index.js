import { combineReducers } from 'redux';
import { widgetsById } from './widgets';
import cells from './cells';
import users from './users';

const rootReducer = combineReducers({
  cells,
  users,
  widgetsById  
});

export default rootReducer;
