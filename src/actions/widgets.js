import * as types from '../constants/ActionTypes';
import { fetchWidget } from '../api';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';

const userEntity = new schema.Entity('users'),
      widgetEntity = new schema.Entity('widgets', {
        users: [ userEntity ]
      });

export const addWidget = (widget) => (dispatch) => {
  fetchWidget(widget.id).then((response) => {
    dispatch({
      type: types.FETCH_WIDGET
    })
    response.json().then((result) => {
      result = _.assign(result, widget);
      dispatch({
        type: types.ADD_WIDGET_SUCCESS,
        response: normalize(result, widgetEntity)
      });
    }) 
  });
}

export const deleteWidget = (id) => ({
  type: types.DELETE_WIDGET, 
  id
});


export const moveWidget = (id, pos) => ({
  type: types.MOVE_WIDGET, 
  id,
  pos
})

export const updateWidget = (id, data) => ({
  type: types.UPDATE_WIDGET,
  id,
  response: data
});
