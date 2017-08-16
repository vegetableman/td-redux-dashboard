import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button.js'

export default class Header extends Component {
  render() {
    return (
      <header className="dashboard__header">
        <div className="dashboard__header__left">
          <span className="dashboard__header__title">Team Dashboard</span>
        </div>
        <div className="dashboard__header__right">
          <Button className='dashboard__edit-layout__btn'>
            <div>Edit Layout</div>
          </Button>
          <Button onClick={this.props.onShowWidgetDirectoryModal}>
            <div className='icon add-icon'/>
            <div>Add Widget</div>
          </Button>
        </div>
      </header>
    );
  }
}
