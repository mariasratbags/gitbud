import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      <div>
        <Table>
          <TableHeader displaySelectAll={ false } >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Rating</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            {this.props.users.map(user => <TableRow>
                <TableRowColumn><Link to={`/user/${user.name}`}>{ user.name }</Link></TableRowColumn>
                <TableRowColumn>{ user.rating }</TableRowColumn>
              </TableRow>)}
          </TableBody>
        </Table>
        <ul>
          {this.props.users.map(user => <li><Link to={`user/${user.name}`}>{JSON.stringify(user)}</Link></li>)}
        </ul>
      </div >
    );
  }
}

export default connect(state => ({ users: state.users }))(UserList);
