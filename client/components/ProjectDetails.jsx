import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import UserList from './UserList';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: false,
    };

    this.getUsers();
    this.toggleLabel = this.toggleLabel.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
  }

  getUsers() {
    var config = {
      headers: {'id': this.props.match.params.id}
    };

    axios.get('/API/users', config)
      .then((users) => {
        this.props.addUsers(users.data);
      })
      .catch(console.error);
  }

  handleInterest() {
    axios.post('/API/projects', {
      interest: this.props.project.id,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  toggleLabel(e) {
    e.preventDefault();
    this.setState({
      interest: !this.state.interest,
    });
    this.handleInterest();
  }

  render() {
    return (
      <Paper style={ {width: '95%', margin: 'auto', marginTop: 12, padding: 12 } }>
        <Card style={ { marginBottom: 12 } }>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={ this.props.project.project } />
            </ToolbarGroup>
            <ToolbarGroup lastChild={ true }>
              <RaisedButton secondary={ true } label="See on GitHub"/>
            </ToolbarGroup>
          </Toolbar>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
        </Card>
        <Paper>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={`Find a partner for ${ this.props.project.project }`} />
            </ToolbarGroup>
            <ToolbarGroup lastChild={ true }>
              <RaisedButton primary={ true } onClick={this.toggleLabel} label={this.state.interest ? 'Project selected' : 'I like this project!'}/>
            </ToolbarGroup>
          </Toolbar>
          <UserList {...this.props} />
        </Paper>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  const projectId = Number(props.match.params.id);
  return {
    users: state.users,
    project: state.projects.filter(project => project.id === projectId)[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUsers: users => dispatch({
      type: 'USERS_ADD',
      users: users
    }),
    dispatchInterest: projectId => dispatch({
      type: 'TOGGLE_PROJECT_INTEREST',
      projectId: this.props.project.id
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
