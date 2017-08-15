import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
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
      <Paper>
        <List>
          <Subheader>Users interested in this project</Subheader>
          { this.props.users.map((user, id) =>
            <ListItem containerElement={ <Link to={ `/user/${id}` }/> } leftAvatar={ <Avatar src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAyLAAAAJDQ4YzMwZTNlLTAwODItNGYwMC1iMGQxLWYzOGZiZjM5YWE3NQ.jpg"/> }
              key={ id } primaryText={ user.name } secondaryText={ "Rating: " + user.rating } />
          )}
        </List>
      </Paper>
    )
  }

  // render() {
  //   return (
  //     <Paper>
  //       <Subheader>Users interested in this project</Subheader>
  //       <Table>
  //         <TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
  //           <TableRow>
  //             <TableHeaderColumn>Name</TableHeaderColumn>
  //             <TableHeaderColumn>Rating</TableHeaderColumn>
  //           </TableRow>
  //         </TableHeader>
  //         <TableBody displayRowCheckbox={ false } stripedRows={ true }>
  //           {this.props.users.map((user, id) =>
  //             <TableRow key={ id } >
  //               <TableRowColumn><Link to={`/user/${user.name}`}>{ user.name }</Link></TableRowColumn>
  //               <TableRowColumn>{ user.rating }</TableRowColumn>
  //             </TableRow>)}
  //         </TableBody>
  //       </Table>
  //     </Paper>
  //   );
  // }
}

export default connect(state => ({ users: state.users }))(UserList);
