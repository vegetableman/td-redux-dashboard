import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { GRID_CELL } from '../constants/DragTypes'
import classnames from 'classnames';

const gridCellTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    if (item.id === props.id) {
      return false;
    }
    return true;
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    props.moveWidget(item.id, props.index);
  }
};

const collect = (connect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class Cell extends Component {
  render() {
    const { children, isOver, canDrop, connectDropTarget } = this.props,
          childrenCount = React.Children.count(children),
          cellClasses = classnames({
            'dashboard__cell': true,
            'dashboard__cell--hover': canDrop && isOver,
            'dashboard__cell--active': childrenCount
          });

    return connectDropTarget(
      <div className={cellClasses}>
        {
          !childrenCount && (
            <div className='dashboard__cell__placeholder-wrapper'>
              <span className='dashboard__cell__placeholder'>Drop Here</span>
            </div>
          )
        }
        {children}
      </div>
    );
  }
}

export default DropTarget(GRID_CELL, gridCellTarget, collect)(Cell);
