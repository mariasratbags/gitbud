import React from 'react';
import { Link } from 'react-router-dom';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>This is the User List Page</p>
        <ul>
          {this.props.users.map(user => <li><Link to={`user/${user.name}`}>{user.name}</Link></li>)}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({ users: state.users }))(UserList);
