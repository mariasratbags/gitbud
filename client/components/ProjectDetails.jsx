import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.getUsers();
  }

  getUsers() {
    axios.get('/API/recommended-pairs')
      .then(users => {
        this.setState({users: users.data});
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <p>This is Project details component</p>
        <p>Below is a list of recommended users</p>
        {this.state.users.map(user => <li><Link to={`user/${user.userId}`}>Username: {user.username} Rating: {user.rating}</Link></li>
        )}
      </div>
    )
  }
}

export default ProjectDetails;
