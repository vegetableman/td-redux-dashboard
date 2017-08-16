import React, { Component } from 'react';
import _ from 'lodash';
import './index.css'
import Dropdown from 'react-dropdown';
import {RadioGroup, Radio} from 'react-radio-group';
import Button from '../../Button.js';

class UserActiviySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: props.item.sort || 'highest',
      displayCount: props.item.displayCount || '5',
    };
  }

  handleCountChange = (selected) => {
    this.setState({displayCount: selected.value});
  }

  handleSortChange = (selected) => {
    this.setState({sort: selected});
  }

  handleSave = () => {
    this.props.onSave(this.state);
  }

  render() {
    const { displayCount, sort } = this.state;
    return (
      <div className='user-activity__settings'>
        <div className='user-activity__settings__body'>
          <div className='user-activity__settings__item'>
            <div className='settings__item__title'>Number of Users</div>
            <Dropdown
              options={[
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'},
                {label: '5', value: '5'},
              ]}
              value={displayCount}
              onChange={this.handleCountChange}
            />
          </div>
          <div className='user-activity__settings__item'>
            <div className='settings__item__title'>Activity</div>
            <RadioGroup
              className='settings__sort__radio-group'
              name="sort" 
              selectedValue={this.state.sort} onChange={this.handleSortChange}>
              <label>
                <Radio className='settings__sort__highest' value='highest' />
                <span>Highest</span>
              </label>
              <label>
                <Radio className='settings__sort__lowest' value='lowest' />
                <span>Lowest</span>
              </label>
            </RadioGroup>
          </div>
        </div>
        <div className='user-activity__settings__footer'>
          <Button 
            size='small'
            className='user-activity__settings__cancel-btn'
            onClick={this.props.onCancel}>
              <div className='icon cancel-icon'/>
            <div>Cancel</div>
          </Button>
          <Button 
            size='small'
            onClick={this.handleSave}>
              <div className='icon add-icon'/>
            <div>Save</div>
          </Button> 
        </div>
      </div>
    );
  }
}

export default UserActiviySettings;
