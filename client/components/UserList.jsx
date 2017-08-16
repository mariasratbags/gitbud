import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <List>
          <Subheader>Users interested in this project</Subheader>
          { this.props.users.map((user, id) =>
            <ListItem containerElement={ <Link to={ `/user/${ user.id }` }/> } leftAvatar={ <Avatar src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAyLAAAAJDQ4YzMwZTNlLTAwODItNGYwMC1iMGQxLWYzOGZiZjM5YWE3NQ.jpg"/> }
              key={ id } primaryText={ user.name } secondaryText={ "Rating: " + user.rating } />
          )}
        </List>
    )
  }
}

export default connect(state => ({ users: state.users }))(UserList);
