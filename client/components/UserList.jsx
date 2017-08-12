import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.getUsers();
  }

  getUsers() {
    axios.get('/API/users')
      .then(users => {
        this.setState({users: users.data});
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <h1>This is the User List Page</h1>
        <ul>
          {this.state.users.map(user => <li><Link to={`user/${user.name}`}>{user.name}</Link></li>
          )}
        </ul>
      </div>
    );
  }
}

export default UserList;
