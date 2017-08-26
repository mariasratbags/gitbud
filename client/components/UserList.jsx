import React from 'react';
import { Link } from 'react-router-dom';

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

const UserList = (props) => {
  return (
    <List>
      <Subheader>Users working on this project</Subheader>
      { props.users.map((user, index) => {
        return (
          <ListItem
            containerElement={ <Link to={ `/user/${ user.id }${ props.projectId ? '/' + props.projectId : null }` }/> }
            leftAvatar={
              <Avatar src={ user.avatarUrl } />
            }
            key={ index }
            primaryText={ user.name }
            secondaryText={ "Rating: " + user.rating }
          />
        );
      },
      )}
    </List>
  );
};

export default UserList;
