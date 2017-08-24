import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell.js'
import Widget from './Widget.js'
import _ from 'lodash'

export default class Grid extends Component {
  render() {
    const { widgets, cells, users, moveWidget, deleteWidget, updateWidget } = this.props;
    return (
      <div className="dashboard__grid">
        {
          _.map(cells, (id, index) => {
            return (
              <Cell 
                key={index}
                index={index}
                id={id}
                moveWidget={moveWidget}>
                {
                  id && (
                    <Widget
                      users={users} 
                      item={widgets[id]}
                      deleteWidget={deleteWidget}
                      updateWidget={updateWidget}
                  />)
                }
              </Cell>
            );
          })
        }                
      </div>
    );
  }
}
