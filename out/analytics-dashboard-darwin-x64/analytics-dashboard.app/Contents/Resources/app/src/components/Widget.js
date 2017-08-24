import '../styles/Widget.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Dropdown from 'react-dropdown';
import { GRID_CELL } from '../constants/DragTypes'
import UserActivity from './widgets/UserActivity';
import menuIconImg from '../images/menu_icon.svg'
import _ from 'lodash';

const mappings = {
  '6c84fb90-12c4-11e1-840d-7b25c5ee775a': (props) => <UserActivity {...props}/>
};

const gridCellSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.item.id;
  },

  beginDrag(props, monitor, component) {
    const item = { id: props.item.id };
    return item;
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});


class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  handleFilterChange = (selection) => {
    this.props.updateWidget(_.get(this.props, 'item.id'), {
      currentFilter: selection.value
    });
  }

  handleMenu = (selection) => {
    if (selection.value === 'delete') {
      this.props.deleteWidget(_.get(this.props, 'item.id'));
    }
    else {
      this.setState({isEditing: true});
    }
  }

  handleCancel = () => {
    this.setState({isEditing: false});
  }

  handleSave = (settings) => {
    this.props.updateWidget(_.get(this.props, 'item.id'), settings);
    this.setState({isEditing: false});
  }

  render() {
    const { item, connectDragSource } = this.props,
          { isEditing } = this.state,
          component = mappings[item.id]({...this.props, ...this.state, ...{
            onCancel: this.handleCancel,
            onSave: this.handleSave
          }});

    return connectDragSource(
      <section className='dashboard__widget'>
        <header className='dashboard__widget__header'>
          <div className='dashboard__widget__title'>
            {item.title}
          </div>
          <div className='dashboard__widget__menu'>
            <div>
              {!isEditing && <Dropdown
                options={[
                  {label: 'Monthly', value: 'monthly'},
                  {label: 'Weekly', value: 'weekly'},
                  {label: 'Daily', value: 'daily'}
                ]}
                value={item.currentFilter || 'monthly'}
                onChange={this.handleFilterChange}
              />}
            </div>
            <div>
             {!isEditing && <Dropdown
                baseClassName='icon-menu__btn'
                options={[
                  {label: 'Edit Widget', value: 'edit'},
                  {label: 'Delete Widget', value: 'delete'}
                ]}
                onChange={this.handleMenu}
              />}
            </div>
          </div>
        </header>
        <div className='dashboard__widget__body'>
          { component }
        </div>
      </section>
    );
  }
}

export default DragSource(GRID_CELL, gridCellSource, collect)(Widget);
