import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
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
        <Table>
          <TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Rating</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false } stripedRows={ true }>
            {this.props.users.map((user, id) =>
              <TableRow key={ id } >
                <TableRowColumn><Link to={`/user/${user.name}`}>{ user.name }</Link></TableRowColumn>
                <TableRowColumn>{ user.rating }</TableRowColumn>
              </TableRow>)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(state => ({ users: state.users }))(UserList);
