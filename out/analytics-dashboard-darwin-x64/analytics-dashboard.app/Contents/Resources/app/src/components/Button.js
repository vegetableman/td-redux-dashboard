import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import '../styles/Button.css';

export default class Button extends Component {
  render() {
    const size = _.get(this.props, 'size'),
          btnClasses = classnames({
            'btn': true,
            'btn--size-sm': size === 'small'
          }, _.get(this.props, 'className'));

    return (
      <button 
        className={btnClasses} 
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  size: 'large'
};
