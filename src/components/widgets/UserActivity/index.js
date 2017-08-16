import React, { Component } from 'react';
import _ from 'lodash';
import './index.css'
import UserActivitySettings from './settings'

class UserActivity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, users, isEditing } = this.props;
    const filter = (item.currentFilter || 'monthly'),
          displayCount = (item.displayCount || 5),
          activityCollection = item[filter],
          sortedIds = _.keys(activityCollection).sort((a, b) => {
            return item.sort === 'lowest' ? activityCollection[a] - activityCollection[b] : activityCollection[b] - activityCollection[a];
          });

    return (
      <div className='user-activity'>
        {
          isEditing && (
            <UserActivitySettings 
              item={item}
              onCancel={this.props.onCancel}
              onSave={this.props.onSave}
            />
          )
        }
        {
          !isEditing && _.map(_.slice(sortedIds, 0, displayCount), (id) => {
            return (
              <div key={id} className='user-activity__item'>
                <div className='user-activity__item__left'>
                  <div>
                    <img className='user-activity__item__avatar' src={users[id].avatar}/>
                  </div>
                  <span className='user-activity__user-name'>
                    {users[id].name}
                  </span>
                  <span className='user-activity__user-lastname'>
                    {users[id].lastname}
                  </span>
                </div>
                <div className='user-activity__item__right'>
                  <div className='user-activity__item__perc-wrapper'>
                    <div className='user-activity__item__perc' 
                      style={{width: Math.round(activityCollection[id]) + '%'}}>
                    </div>
                  </div>
                  <div className='user-activity__item__perc-value'>
                    {Math.round(activityCollection[id]) + '%'}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default UserActivity;
