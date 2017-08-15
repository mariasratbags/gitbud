import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import UserList from './UserList';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>This is Project details component</p>
        <p>Below is a list of recommended users</p>
        < UserList />
      </div>
    )
  }
}

export default connect(state => ({ users: state.users }))(ProjectDetails);
