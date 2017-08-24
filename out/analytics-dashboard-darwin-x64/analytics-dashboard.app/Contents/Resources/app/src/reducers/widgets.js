import { 
    ADD_WIDGET_SUCCESS, 
    DELETE_WIDGET, 
    EDIT_WIDGET,
    UPDATE_WIDGET
} from '../constants/ActionTypes';
import _ from 'lodash';

export const widgetsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_WIDGET_SUCCESS:
    console.log(action.response);
     return {
       ...state,
       ..._.get(action.response, 'entities.widgets')
    };

    case DELETE_WIDGET:
      return _.reject(state, ['id', action.id]);

    case UPDATE_WIDGET:
      return {
        ...state,
        [action.id]: _.merge(state[action.id], action.response)
      };

    default:
      return state;
  }
  return state;
};
