import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button.js'
import '../styles/WidgetDirectoryModal.css';
import userActivityImg from '../images/users_activity.png';
import _ from 'lodash';
import diffArrays from 'diff-arrays';

const widgets = [{
  id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
  title: 'Users Activity',
  author: 'TimeDoctor',
  description: 'Users who worked more or less than their minimum hours required in daily, weekly and monthly',
  variables: ['USERS', 'WEBSITES', 'APPS', 'TIME', 'DATE']
}];

export default class WidgetDirectoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: _.keys(props.userWidgets)
    };
  }

  getSelectionDiff () {
    const userWidgetIds = _.keys(this.props.userWidgets),
          diff = diffArrays(this.state.selectedIds, userWidgetIds);
    return diff;
  }

  handleSave = () => {
    const { actions } = this.props,
          diff = this.getSelectionDiff();

    _.each(diff.lhs, (id) => {
      actions.addWidget(_.find(widgets, {'id': id}));
    });
  
    _.each(diff.rhs, (id) => {
      actions.deleteWidget(id);
    });

    this.props.onCancel();
  }

  handleAddWidget = (widget) => {
    this.setState((prevState) => {
      return {selectedIds: [...prevState.selectedIds, widget.id]};
    });
  }

  handleRemoveWidget = (widget) => {
    this.setState((prevState) => { 
      return {selectedIds: _.without(prevState.selectedIds, widget.id)};
    });
  }

  render() {
    const { selectedIds } = this.state,
          diff = this.getSelectionDiff();

    return (
      <div className='widget-directory__modal'>
        <header className='widget-directory__header'>
          <span>Add a Widget</span>
          <span className='modal__close-btn'></span>
        </header>
        <section className='widget-directory__left'>
          <div>
          </div>
        </section>
        <section className='widget-directory__right'>
          <ul className='widget-directory__list'>
            {
              widgets.map((widget) => {
                return (
                  <li className='widget-directory__list__item' key={widget.id}>
                    <div className='list__item__left'>
                      <img src={userActivityImg}/>
                    </div>
                    <div className='list__item__middle'>
                      <div className='widget__title'>
                        {widget.title}
                      </div>
                      <div className='widget__author'>
                        By <span>{widget.author}</span>
                      </div>
                      <div className='widget__desc'>
                        {widget.description}
                      </div>
                    </div>
                    <div className='list__item__right'>
                      {
                         _.indexOf(selectedIds, widget.id) < 0 ? (
                          <Button onClick={this.handleAddWidget.bind(this, widget)}>
                            <span></span>
                            <span>Add Widget</span>
                          </Button>
                        ) : (
                          <Button
                          className='widget__remove-btn'
                          onClick={this.handleRemoveWidget.bind(this, widget)}>
                            <span></span>
                            <span>Remove Widget</span>
                          </Button>
                        )
                      }
                    </div>
                  </li>
                );
              })
            }
          </ul>
          <div className='widget-directory__footer'>
            <Button 
              size='small'
              className='widget-directory__cancel-btn'
              onClick={this.props.onCancel}>
                <div className='icon cancel-icon'/>
              <div>Cancel</div>
            </Button>
            <Button 
              disabled={!_.size(diff.lhs) && !_.size(diff.rhs)}
              size='small'
              onClick={this.handleSave}>
                <div className='icon add-icon'/>
              <div>Save</div>
            </Button> 
          </div>
        </section>
      </div>
    );
  }
}

WidgetDirectoryModal.defaultProps = {
  userWidgets: []
};
