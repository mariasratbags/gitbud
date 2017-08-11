import React from 'react';
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
      <div>{this.state.users.map(user => <h1>{user.name}</h1>)}</div>
    );
  }
}

// function User(arr) {
//   return (
//     <div>{console.log(arr)} List of user names</div>
//   );
// }

export default UserList;
