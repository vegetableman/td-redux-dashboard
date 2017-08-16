import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import Dashboard from './Dashboard.js'
import configureStore from '../store/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
