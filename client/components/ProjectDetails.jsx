import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import UserList from './UserList';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={ {width: "95%", margin: "auto"} }>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Project Name" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={ true }>
            <RaisedButton primary={ true } label="I like this project!"/>
          </ToolbarGroup>
        </Toolbar>
        < UserList />
      </Paper>
    )
  }
}

export default connect(state => ({ users: state.users }))(ProjectDetails);
