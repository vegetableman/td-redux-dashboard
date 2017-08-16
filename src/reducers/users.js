import { 
  ADD_WIDGET_SUCCESS
} from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {};
const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET_SUCCESS:
    return {
      ...state,
      ..._.get(action.response, 'entities.users')
    };

    default:
      return state;
  }
  return state;
};

export default users;

