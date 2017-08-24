import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';


const {webFrame} = window.require('electron')
webFrame.registerURLSchemeAsPrivileged('file')

ReactDOM.render(
	<App />, document.getElementById('root')
);
