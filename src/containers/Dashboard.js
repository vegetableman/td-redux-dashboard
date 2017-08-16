import '../styles/Dashboard.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Grid from '../components/Grid';
import WidgetDirectoryModal from '../components/WidgetDirectoryModal';
import Modal from 'react-modal';
import * as WidgetActions from '../actions/widgets';

const customStyles = {
  content : {
    'borderRadius': '10px',
    'boxShadow': 'rgba(0, 0, 0, 0.14) 0px 5px 30px, rgba(0, 0, 0, 0.02) 0px 5px 30px',
    'padding': 0,
    'maxHeight': '500px',
    'maxWidth': '800px',
    'margin': '0 auto',
    'top': '100px'
  },
  overlay : {
    backgroundColor: 'rgba(90, 88, 88, 0.33)'
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWidgetDirectoryOpen: false
    };
  }

  handleShowWidgetDirectoryModal = () => {
    this.setState({isWidgetDirectoryOpen: true});
  }

  handleCloseWidgetDirectoryModal = () =>  {
    this.setState({isWidgetDirectoryOpen: false});
  }

  render() {
    const { widgets, cells, users, isFetching, dispatch } = this.props;
    const actions = bindActionCreators(WidgetActions, dispatch);

    return (
      <section className="dashboard">
        <Header 
          isFetching={isFetching}
          onShowWidgetDirectoryModal={this.handleShowWidgetDirectoryModal}
        />
        <Grid 
          cells={cells}
          widgets={widgets}
          users={users}
          deleteWidget={actions.deleteWidget}
          moveWidget={actions.moveWidget}
          updateWidget={actions.updateWidget}
        />
        <Modal
          contentLabel='Add Widget Modal'
          style={customStyles}
          isOpen={this.state.isWidgetDirectoryOpen}
          onRequestClose={this.handleCloseWidgetDirectoryModal}
        >
          <WidgetDirectoryModal
            actions={actions}
            userWidgets={widgets}
            onCancel={this.handleCloseWidgetDirectoryModal}
          />
        </Modal>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    widgets: state.widgetsById,
    cells: state.cells,
    users: state.users,
    isFetching: state.isFetching
  };
}

export default connect(mapStateToProps)(Dashboard);
